import React, { useEffect } from 'react';
import { Home, RotateCcw, Star, Volume2 } from 'lucide-react';
import { CategoryInfo } from '../types/game';
import {
  playCelebrationChime,
  playListenChime,
  playTapChime,
  speakKazakh,
  stopSpeaking,
} from '../utils/audio';

interface CompletionScreenProps {
  category: CategoryInfo;
  starsEarned: number;
  totalTasks: number;
  onGoHome: () => void;
  onReplay: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  category,
  starsEarned,
  totalTasks,
  onGoHome,
  onReplay,
}) => {
  useEffect(() => {
    playCelebrationChime();
    speakKazakh(
      `Жарайсың! Бөлімді аяқтадың! Сен ${starsEarned} жұлдыз жинадың.`,
      { delayMs: 450 }
    );
    return () => {
      stopSpeaking();
    };
  }, [starsEarned]);

  return (
    <div className="min-h-dvh flex flex-col bg-[#FBF9F5] text-slate-900">
      {/* Consistent Top Bar */}
      <header className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 pt-4 pb-3 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            playTapChime();
            stopSpeaking();
            onGoHome();
          }}
          className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-white border-2 border-stone-200 border-b-4 hover:bg-stone-50 active:translate-y-0.5 transition-all font-display font-bold text-base sm:text-lg text-slate-800 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
        >
          <Home className="w-6 h-6 text-slate-700 shrink-0" aria-hidden="true" />
          <span>Үйге қайту</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playListenChime();
            speakKazakh(
              `Жарайсың! Бөлімді аяқтадың! Сен ${starsEarned} жұлдыз жинадың.`
            );
          }}
          className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-amber-400 border-2 border-amber-500 border-b-4 hover:bg-amber-300 active:translate-y-0.5 transition-all font-display font-bold text-base sm:text-lg text-slate-900 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
        >
          <Volume2 className="w-6 h-6 text-slate-900 shrink-0" aria-hidden="true" />
          <span>Тыңдау</span>
        </button>
      </header>

      {/* Main Celebration Card */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-center">
        <div className="animate-gentle-pop w-full bg-white rounded-3xl p-7 sm:p-12 border-2 border-amber-300 border-b-[6px] shadow-sm text-center flex flex-col items-center gap-6">
          <div className="text-base sm:text-xl font-bold text-slate-600">
            {category.emoji} {category.title}
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-slate-900 text-balance">
            Жарайсың! Бөлімді аяқтадың!
          </h1>

          {/* Earned Golden Stars */}
          <div
            className="flex items-center justify-center gap-3 sm:gap-4 py-3"
            aria-label={`Жинаған жұлдыздар: ${starsEarned} / ${totalTasks}`}
          >
            {Array.from({ length: totalTasks }).map((_, idx) => {
              const filled = idx < starsEarned;
              return (
                <div
                  key={idx}
                  className={`w-14 h-14 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center border-2 ${
                    filled
                      ? 'bg-amber-100 border-amber-400'
                      : 'bg-stone-100 border-stone-200'
                  }`}
                >
                  <Star
                    className={`w-9 h-9 sm:w-12 sm:h-12 ${
                      filled
                        ? 'text-amber-500 fill-amber-400'
                        : 'text-stone-300 fill-stone-200'
                    }`}
                    aria-hidden="true"
                  />
                </div>
              );
            })}
          </div>

          <p className="font-display text-xl sm:text-2xl font-bold text-amber-800 tabular-nums">
            Жинаған жұлдыздар: {starsEarned} / {totalTasks}
          </p>

          {/* Action Buttons */}
          <div className="w-full pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                playTapChime();
                stopSpeaking();
                onGoHome();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-2xl bg-sky-600 border-2 border-sky-700 border-b-4 hover:bg-sky-500 active:translate-y-0.5 transition-all font-display font-bold text-xl text-white whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
            >
              <Home className="w-6 h-6 shrink-0" aria-hidden="true" />
              <span>Басты бет</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playTapChime();
                stopSpeaking();
                onReplay();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-2xl bg-emerald-600 border-2 border-emerald-700 border-b-4 hover:bg-emerald-500 active:translate-y-0.5 transition-all font-display font-bold text-xl text-white whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
            >
              <RotateCcw className="w-6 h-6 shrink-0" aria-hidden="true" />
              <span>Қайта ойнау</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
