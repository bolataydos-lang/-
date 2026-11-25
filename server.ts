import crypto from 'crypto';
import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const rawApiKey = process.env.GEMINI_API_KEY?.trim();
const apiKey =
  rawApiKey && rawApiKey !== 'MY_GEMINI_API_KEY' ? rawApiKey : undefined;

const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      apiVersion: 'v1beta',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const ttsCache = new Map<string, string>();
const inFlightTts = new Map<string, Promise<string>>();
const MAX_CACHE_SIZE = 250;
const DISK_CACHE_DIR = path.resolve(__dirname, '.tts-cache');
const RATE_WINDOW_MS = 62_000;
const MAX_RPM_FREE_TIER = 3;

const TTS_MODELS = [
  'gemini-3.8-flash-tts',
  'gemini-3.8-flash-lite-tts',
] as const;
type TtsModel = (typeof TTS_MODELS)[number];

const recentTtsCalls: number[] = [];
let globalCooldownUntil = 0;
let lastUserTtsAt = 0;

const PRIORITY_WARMUP_PHRASES: Array<{ text: string; mode: 'phoneme' | 'sentence' }> = [
  { text: 'Дұрыс! Жарайсың!', mode: 'sentence' },
  { text: 'Тағы бір рет байқап көр!', mode: 'sentence' },
  { text: 'Күл де, үйрен! Қай ойынды ойнаймыз?', mode: 'sentence' },
  // Жаратылыстану (nat-1 .. nat-5)
  {
    text: 'Гүлдің топырағы құрғап қалды. Гүлге не құямыз? Ойыншық машина, су құятын құман, әлде доп?',
    mode: 'sentence',
  },
  { text: 'Дұрыс! Гүл өсуі үшін су құямыз.', mode: 'sentence' },
  { text: 'Тағы бір рет байқап көр! Шөлдеген гүлге су керек.', mode: 'sentence' },
  { text: 'Су құятын құман', mode: 'sentence' },
  { text: 'Ойыншық машина', mode: 'sentence' },
  { text: 'Доп', mode: 'sentence' },
  {
    text: 'Балық қайда тіршілік етеді? Суда, ағашта, әлде шалғында?',
    mode: 'sentence',
  },
  { text: 'Дұрыс! Балық суда жүзіп тіршілік етеді.', mode: 'sentence' },
  { text: 'Тағы бір рет байқап көр! Балық қайда еркін жүзе алады?', mode: 'sentence' },
  { text: 'Суда', mode: 'sentence' },
  { text: 'Ағашта', mode: 'sentence' },
  { text: 'Шалғында', mode: 'sentence' },
  {
    text: 'Бұзау қай жануардың төлі? Қой, жылқы, әлде сиыр?',
    mode: 'sentence',
  },
  { text: 'Дұрыс! Бұзау — сиырдың төлі.', mode: 'sentence' },
  { text: 'Тағы бір рет байқап көр! Мө деп мөңірейтін жануарды тап.', mode: 'sentence' },
  { text: 'Қой', mode: 'sentence' },
  { text: 'Жылқы', mode: 'sentence' },
  { text: 'Сиыр', mode: 'sentence' },
  {
    text: 'Түнде аспанда не көрінеді? Күн, ай мен жұлдыздар, әлде кемпірқосақ?',
    mode: 'sentence',
  },
  { text: 'Дұрыс! Түнде аспанда ай мен жұлдыздар жарқырайды.', mode: 'sentence' },
  { text: 'Тағы бір рет байқап көр! Суретте аю нені ұстамақ болып тұр?', mode: 'sentence' },
  { text: 'Күн', mode: 'sentence' },
  { text: 'Ай мен жұлдыздар', mode: 'sentence' },
  { text: 'Кемпірқосақ', mode: 'sentence' },
  {
    text: 'Жапырақтар қай мезгілде сарғайып түседі? Күз, қыс, әлде жаз?',
    mode: 'sentence',
  },
  { text: 'Дұрыс! Күзде ағаш жапырақтары сарғайып түседі.', mode: 'sentence' },
  { text: 'Тағы бір рет байқап көр! Сарғайған жапырақтар қай мезгілде болады?', mode: 'sentence' },
  { text: 'Күз', mode: 'sentence' },
  { text: 'Қыс', mode: 'sentence' },
  { text: 'Жаз', mode: 'sentence' },
];

function cleanTextForTts(text: string): string {
  return text
    .replace(/[«»"']/g, '')
    .replace(/\s*[—–]\s*/g, ', ')
    .replace(/\.{2,}/g, ', ')
    .replace(/([А-Яа-яӘәҒғҚқҢңӨөҰұҮүІіҺһ])-([А-Яа-яӘәҒғҚқҢңӨөҰұҮүІіҺһ])/g, '$1, $2')
    .replace(/\s+/g, ' ')
    .trim();
}

function getCacheKey(text: string, mode: 'phoneme' | 'sentence'): string {
  return `${mode}::${text.trim()}`;
}

function getDiskCachePath(key: string): string {
  const hash = crypto.createHash('sha256').update(key).digest('hex').slice(0, 24);
  return path.join(DISK_CACHE_DIR, `${hash}.txt`);
}

function readCachedAudio(key: string): string | null {
  const mem = ttsCache.get(key);
  if (mem) return mem;

  try {
    const filePath = getDiskCachePath(key);
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8').trim();
      if (data) {
        ttsCache.set(key, data);
        return data;
      }
    }
  } catch {
    // Ignore disk cache read errors
  }
  return null;
}

function writeCachedAudio(key: string, base64Audio: string) {
  if (ttsCache.size >= MAX_CACHE_SIZE) {
    const oldestKey = ttsCache.keys().next().value;
    if (oldestKey) ttsCache.delete(oldestKey);
  }
  ttsCache.set(key, base64Audio);

  try {
    fs.mkdirSync(DISK_CACHE_DIR, { recursive: true });
    fs.writeFileSync(getDiskCachePath(key), base64Audio, 'utf8');
  } catch {
    // Ignore disk cache write errors
  }
}

function getSharedWaitMs(): number {
  const now = Date.now();
  if (now < globalCooldownUntil) {
    return globalCooldownUntil - now;
  }
  while (recentTtsCalls.length > 0 && now - recentTtsCalls[0] >= RATE_WINDOW_MS) {
    recentTtsCalls.shift();
  }
  if (recentTtsCalls.length >= MAX_RPM_FREE_TIER) {
    return RATE_WINDOW_MS - (now - recentTtsCalls[0]);
  }
  return 0;
}

function extractRetryDelayMs(err: unknown): number {
  const msg = err instanceof Error ? err.message : String(err);
  const match = msg.match(/retry in\s+(\d+(?:\.\d+)?)s/i);
  if (match) {
    const secs = Number(match[1]);
    if (Number.isFinite(secs) && secs > 0) {
      return Math.min(60_000, Math.ceil(secs * 1000) + 1000);
    }
  }
  return 22_000;
}

class TtsRateLimitError extends Error {
  retryAfterMs: number;
  constructor(retryAfterMs: number) {
    super('TTS rate limit reached');
    this.retryAfterMs = retryAfterMs;
  }
}

async function callSingleTtsModel(
  model: TtsModel,
  cleanedText: string,
  style: string
): Promise<string> {
  if (!ai) throw new Error('GEMINI_API_KEY is not configured');

  recentTtsCalls.push(Date.now());

  const ttsConfig = {
    responseModalities: ['AUDIO'] as string[],
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: { voiceName: 'Kore' },
      },
    },
  };

  let response;
  try {
    response = await ai.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: cleanedText,
              speechMetadata: { style },
            },
          ],
        },
      ],
      config: ttsConfig,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    if (message.includes('429') || message.includes('RESOURCE_EXHAUSTED')) {
      const retryMs = extractRetryDelayMs(err);
      globalCooldownUntil = Date.now() + retryMs;
      throw new TtsRateLimitError(retryMs);
    }
    if (message.includes('speechMetadata')) {
      try {
        response = await ai.models.generateContent({
          model,
          contents: [
            {
              role: 'user',
              parts: [{ text: cleanedText }],
            },
          ],
          config: ttsConfig,
        });
      } catch (retryErr) {
        const retryMessage =
          retryErr instanceof Error ? retryErr.message : String(retryErr);
        if (
          retryMessage.includes('429') ||
          retryMessage.includes('RESOURCE_EXHAUSTED')
        ) {
          const retryMs = extractRetryDelayMs(retryErr);
          globalCooldownUntil = Date.now() + retryMs;
          throw new TtsRateLimitError(retryMs);
        }
        throw retryErr;
      }
    } else {
      throw err;
    }
  }

  const audioPart = response.candidates?.[0]?.content?.parts?.find(
    (p) => p.inlineData?.data
  );
  const base64Audio = audioPart?.inlineData?.data;
  if (!base64Audio) {
    throw new Error('Empty audio response from TTS model');
  }
  return base64Audio;
}

async function synthesizeKazakhSpeech(
  rawText: string,
  mode: 'phoneme' | 'sentence',
  cachedOnly = false
): Promise<string> {
  const cleanedText = cleanTextForTts(rawText);
  const key = getCacheKey(cleanedText, mode);
  const cached = readCachedAudio(key);
  if (cached) {
    return cached;
  }

  if (cachedOnly) {
    throw new TtsRateLimitError(Math.max(1000, getSharedWaitMs()));
  }

  if (!ai) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const existingPromise = inFlightTts.get(key);
  if (existingPromise) {
    return existingPromise;
  }

  const waitMs = getSharedWaitMs();
  if (waitMs > 0) {
    throw new TtsRateLimitError(waitMs);
  }

  const style =
    mode === 'phoneme'
      ? 'Native Kazakh preschool teacher speaking standard literary Kazakh without any Russian or English accent. Pronounce the Kazakh sound or syllable clearly, softly, and unhurriedly for a 5-year-old child.'
      : 'Native Kazakh preschool teacher speaking standard literary Kazakh without any Russian or English accent. Warm, cheerful, clear, unhurried pace for a 5-year-old child.';

  const promise = (async () => {
    let lastError: unknown = null;

    for (const model of TTS_MODELS) {
      if (getSharedWaitMs() > 0) {
        break;
      }
      try {
        const base64Audio = await callSingleTtsModel(model, cleanedText, style);
        writeCachedAudio(key, base64Audio);
        return base64Audio;
      } catch (err) {
        lastError = err;
        if (err instanceof TtsRateLimitError) {
          throw err;
        }
        continue;
      }
    }

    const activeWait = getSharedWaitMs();
    if (activeWait > 0) {
      throw new TtsRateLimitError(activeWait);
    }
    throw lastError ?? new Error('All TTS models unavailable');
  })();

  inFlightTts.set(key, promise);
  try {
    return await promise;
  } finally {
    inFlightTts.delete(key);
  }
}

function startIdleCacheWarmer() {
  if (!ai) return;

  const tick = async () => {
    try {
      const now = Date.now();
      // Only warm when no user TTS request happened in the last 22s and rate window is completely fresh
      if (now - lastUserTtsAt < 22_000 || getSharedWaitMs() > 0 || recentTtsCalls.length > 0) {
        return;
      }

      for (const item of PRIORITY_WARMUP_PHRASES) {
        const cleaned = cleanTextForTts(item.text);
        const key = getCacheKey(cleaned, item.mode);
        if (!readCachedAudio(key)) {
          await synthesizeKazakhSpeech(item.text, item.mode);
          break;
        }
      }
    } catch {
      // Quietly skip warmup cycle on transient errors or rate limits
    }
  };

  const timer = setInterval(() => {
    void tick();
  }, 10_000);
  timer.unref?.();
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '16kb' }));
  startIdleCacheWarmer();

  app.post('/api/tts', async (req, res) => {
    const rawText = typeof req.body?.text === 'string' ? req.body.text.trim() : '';
    const mode: 'phoneme' | 'sentence' =
      req.body?.mode === 'phoneme' ? 'phoneme' : 'sentence';
    const cachedOnly = req.body?.cachedOnly === true;

    if (!rawText || rawText.length > 400) {
      res.status(400).json({ error: 'Invalid text parameter' });
      return;
    }

    if (!cachedOnly) {
      lastUserTtsAt = Date.now();
    }

    if (!ai) {
      res.status(503).json({
        error: 'TTS service not configured',
        code: 'NO_API_KEY',
      });
      return;
    }

    try {
      const audioBase64 = await synthesizeKazakhSpeech(rawText, mode, cachedOnly);
      res.json({
        audioBase64,
        mimeType: 'audio/wav',
      });
    } catch (err) {
      if (err instanceof TtsRateLimitError) {
        res.status(429).json({
          error: 'TTS rate limit active',
          code: 'RATE_LIMITED',
          retryAfterMs: err.retryAfterMs,
        });
        return;
      }
      console.error('TTS generation failed:', err);
      res.status(502).json({
        error: 'Failed to synthesize Kazakh speech',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexHtml = path.join(distDir, 'index.html');
      if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        res.status(404).send('Not found');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
