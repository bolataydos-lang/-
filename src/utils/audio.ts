export type SoundEffectType =
  | 'correct'
  | 'wrong'
  | 'retry'
  | 'tap'
  | 'listen'
  | 'next'
  | 'celebrate';

type SfxName = 'tap' | 'listen' | 'correct' | 'retry' | 'next' | 'celebrate';

const SFX_PATHS: Record<SfxName, string> = {
  tap: '/audio/tap.wav',
  listen: '/audio/listen.wav',
  correct: '/audio/correct.wav',
  retry: '/audio/retry.wav',
  next: '/audio/next.wav',
  celebrate: '/audio/celebrate.wav',
};

const sfxElements = new Map<SfxName, HTMLAudioElement>();
const sfxBuffers = new Map<SfxName, AudioBuffer>();
let sfxPreloadStarted = false;
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) {
    try {
      audioCtx = new Ctx();
    } catch {
      return null;
    }
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playFallbackTone(
  freq: number,
  durationSec: number,
  delaySec = 0,
  volume = 0.08,
  type: OscillatorType = 'sine'
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const startTime = ctx.currentTime + delaySec;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + durationSec + 0.02);
  } catch {
    // Graceful no-op when audio playback is blocked
  }
}

function playFallbackSfx(name: SfxName) {
  switch (name) {
    case 'tap':
      playFallbackTone(783.99, 0.1, 0, 0.06, 'sine');
      break;
    case 'listen':
      playFallbackTone(659.25, 0.14, 0, 0.05, 'sine');
      playFallbackTone(987.77, 0.16, 0.06, 0.05, 'sine');
      break;
    case 'correct':
      playFallbackTone(523.25, 0.16, 0, 0.08, 'triangle');
      playFallbackTone(659.25, 0.18, 0.08, 0.08, 'triangle');
      playFallbackTone(783.99, 0.22, 0.16, 0.09, 'triangle');
      break;
    case 'retry':
      playFallbackTone(329.63, 0.16, 0, 0.05, 'sine');
      playFallbackTone(293.66, 0.2, 0.11, 0.05, 'sine');
      break;
    case 'next':
      playFallbackTone(783.99, 0.12, 0, 0.06, 'triangle');
      playFallbackTone(1046.5, 0.18, 0.07, 0.07, 'triangle');
      break;
    case 'celebrate':
      playFallbackTone(523.25, 0.16, 0, 0.07, 'triangle');
      playFallbackTone(659.25, 0.16, 0.1, 0.07, 'triangle');
      playFallbackTone(783.99, 0.18, 0.2, 0.08, 'triangle');
      playFallbackTone(1046.5, 0.35, 0.3, 0.09, 'triangle');
      break;
  }
}

export function preloadAudioAssets() {
  if (typeof window === 'undefined' || sfxPreloadStarted) return;
  sfxPreloadStarted = true;

  (Object.keys(SFX_PATHS) as SfxName[]).forEach((name) => {
    if (typeof Audio !== 'undefined' && !sfxElements.has(name)) {
      const el = new Audio(SFX_PATHS[name]);
      el.preload = 'auto';
      el.volume = name === 'tap' ? 0.45 : 0.6;
      sfxElements.set(name, el);
    }

    const ctx = getAudioContext();
    if (ctx && typeof fetch === 'function') {
      fetch(SFX_PATHS[name])
        .then((res) => (res.ok ? res.arrayBuffer() : null))
        .then((buf) => (buf ? ctx.decodeAudioData(buf) : null))
        .then((decoded) => {
          if (decoded) sfxBuffers.set(name, decoded);
        })
        .catch(() => {
          // HTMLAudioElement / oscillator fallback remains available
        });
    }
  });

  if (isSpeechAvailable()) {
    try {
      window.speechSynthesis.getVoices();
    } catch {
      // Ignore voice prewarm errors
    }
  }
}

function playSfxAsset(name: SfxName) {
  if (typeof window === 'undefined') return;

  const ctx = getAudioContext();
  const decoded = sfxBuffers.get(name);
  if (ctx && decoded) {
    try {
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      source.buffer = decoded;
      gain.gain.value = name === 'tap' ? 0.45 : 0.65;
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(0);
      return;
    } catch {
      // Fall through to HTMLAudioElement
    }
  }

  try {
    let base = sfxElements.get(name);
    if (!base) {
      base = new Audio(SFX_PATHS[name]);
      base.volume = name === 'tap' ? 0.45 : 0.6;
      sfxElements.set(name, base);
    }
    base.currentTime = 0;
    base.play().catch(() => {
      playFallbackSfx(name);
    });
  } catch {
    playFallbackSfx(name);
  }
}

export function playSoundEffect(type: SoundEffectType) {
  const assetName: SfxName = type === 'wrong' ? 'retry' : type;
  playSfxAsset(assetName);
}

export function playTapChime() {
  playSoundEffect('tap');
}

export function playListenChime() {
  playSoundEffect('listen');
}

export function playSuccessChime() {
  playSoundEffect('correct');
}

export function playTryAgainChime() {
  playSoundEffect('wrong');
}

export function playNextChime() {
  playSoundEffect('next');
}

export function playCelebrationChime() {
  playSoundEffect('celebrate');
}

/* ---------- Accent-Free Kazakh Speech (Server Gemini TTS + Fallback) ---------- */

const clientTtsUrlCache = new Map<string, string>();
const inFlightTtsRequests = new Map<string, Promise<string | null>>();
let activeTtsAudio: HTMLAudioElement | null = null;
let activeRequestToken = 0;
let serverTtsUnavailable = false;

export function isSpeechAvailable(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function stopSpeaking() {
  activeRequestToken += 1;

  if (activeTtsAudio) {
    try {
      activeTtsAudio.pause();
      activeTtsAudio.currentTime = 0;
    } catch {
      // Ignore cleanup errors
    }
    activeTtsAudio = null;
  }

  if (isSpeechAvailable()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore errors
    }
  }
}

function speakNativeKazakhBrowserVoice(
  text: string,
  options?: { rate?: number; onStart?: () => void; onEnd?: () => void }
): boolean {
  if (!isSpeechAvailable() || !text.trim()) {
    return false;
  }

  try {
    const voices = window.speechSynthesis.getVoices();
    const kkVoice = voices.find((v) => v.lang.toLowerCase().startsWith('kk'));
    if (!kkVoice) {
      // Never fall back to a Russian or English voice for Kazakh text
      return false;
    }

    window.speechSynthesis.cancel();
    const spokenText = text.replace(/[«»"']/g, '').trim();
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.voice = kkVoice;
    utterance.lang = kkVoice.lang;
    utterance.rate = options?.rate ?? 0.85;
    utterance.pitch = 1.05;
    utterance.onstart = () => options?.onStart?.();
    utterance.onend = () => options?.onEnd?.();
    utterance.onerror = () => options?.onEnd?.();
    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}

async function fetchKazakhTtsUrl(
  text: string,
  mode: 'phoneme' | 'sentence',
  cachedOnly = false
): Promise<string | null> {
  if (serverTtsUnavailable) return null;

  const key = `${mode}::${text.trim()}`;
  const cached = clientTtsUrlCache.get(key);
  if (cached) return cached;

  const existing = inFlightTtsRequests.get(key);
  if (existing) return existing;

  const promise = (async () => {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), mode, cachedOnly }),
      });
      if (res.status === 503) {
        serverTtsUnavailable = true;
        return null;
      }
      if (!res.ok) return null;
      const data = (await res.json()) as {
        audioBase64?: string;
        mimeType?: string;
      };
      if (!data.audioBase64) return null;

      const binary = atob(data.audioBase64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: data.mimeType || 'audio/wav' });
      const objectUrl = URL.createObjectURL(blob);
      clientTtsUrlCache.set(key, objectUrl);
      return objectUrl;
    } catch {
      return null;
    } finally {
      inFlightTtsRequests.delete(key);
    }
  })();

  inFlightTtsRequests.set(key, promise);
  return promise;
}

export function prefetchKazakhSpeech(
  _items: Array<{ text: string; mode?: 'phoneme' | 'sentence' }>
) {
  // Handled gently on the server cache warmer to avoid client burst rate limits
}

export function speakKazakh(
  text: string,
  options?: {
    mode?: 'phoneme' | 'sentence';
    rate?: number;
    delayMs?: number;
    fallbackText?: string;
    onStart?: () => void;
    onEnd?: () => void;
  }
): boolean {
  const cleanText = text.trim();
  if (!cleanText) {
    options?.onEnd?.();
    return false;
  }

  stopSpeaking();
  const token = activeRequestToken;
  const mode = options?.mode ?? 'sentence';
  const delayMs = options?.delayMs ?? 0;

  void (async () => {
    const startFetch = Date.now();
    let url = await fetchKazakhTtsUrl(cleanText, mode, false);
    if (token !== activeRequestToken) {
      return;
    }

    if (!url && options?.fallbackText) {
      url = await fetchKazakhTtsUrl(
        options.fallbackText.trim(),
        'sentence',
        true
      );
      if (token !== activeRequestToken) {
        return;
      }
    }

    const elapsed = Date.now() - startFetch;
    if (delayMs > elapsed) {
      await new Promise((resolve) =>
        window.setTimeout(resolve, delayMs - elapsed)
      );
      if (token !== activeRequestToken) {
        return;
      }
    }

    if (url) {
      try {
        const audio = new Audio(url);
        audio.volume = 0.95;
        activeTtsAudio = audio;
        audio.onplay = () => options?.onStart?.();
        audio.onended = () => {
          if (activeTtsAudio === audio) activeTtsAudio = null;
          options?.onEnd?.();
        };
        audio.onerror = () => {
          if (activeTtsAudio === audio) activeTtsAudio = null;
          if (!speakNativeKazakhBrowserVoice(cleanText, options)) {
            options?.onEnd?.();
          }
        };
        await audio.play();
        return;
      } catch {
        activeTtsAudio = null;
      }
    }

    if (token === activeRequestToken) {
      if (!speakNativeKazakhBrowserVoice(cleanText, options)) {
        options?.onEnd?.();
      }
    }
  })();

  return true;
}
