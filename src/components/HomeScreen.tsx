import React, { useState } from 'react';
import { Volume2, Star, Play } from 'lucide-react';
import { CategoryId, CategoryInfo } from '../types/game';
import { CATEGORIES } from '../data/curriculum';
import { playListenChime, playTapChime, speakKazakh } from '../utils/audio';

interface HomeScreenProps {
  starsByCategory: Record<CategoryId, number>;
  onSelectCategory: (categoryId: CategoryId) => void;
}

const CategoryCardImage: React.FC<{ category: CategoryInfo }> = ({ category }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`w-full aspect-[4/3] rounded-2xl ${category.accentBg} flex flex-col items-center justify-center p-4 border border-stone-200`}
      >
        <span className="text-6xl mb-2" aria-hidden="true">
          {category.emoji}
        </span>
        <span className={`font-display font-bold text-lg ${category.accentText}`}>
          {category.title}
        </span>
      </div>
    );
  }

  return (
    <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
      <img
        src={category.imagePath}
        alt={category.title}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
      />
    </div>
  );
};

export const HomeScreen: React.FC<HomeScreenProps> = ({
  starsByCategory,
  onSelectCategory,
}) => {
  const totalStars = Object.values(starsByCategory).reduce((sum, n) => sum + n, 0);

  const handleListenIntro = () => {
    playListenChime();
    speakKazakh('Күл де, үйрен! Қай ойынды ойнаймыз?');
  };

  return (
    <div className="min-h-dvh flex flex-col bg-[#FBF9F5] text-slate-900">
      {/* Consistent Top Bar */}
      <header className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 pt-5 pb-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 border-b-4 border-amber-600 flex items-center justify-center shrink-0 shadow-sm">
            <Star className="w-7 h-7 sm:w-8 sm:h-8 text-white fill-white" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="font-display text-2xl sm:text-4xl 2xl:text-5xl font-extrabold tracking-tight text-slate-900 truncate">
              Күл де, үйрен!
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {totalStars > 0 && (
            <div
              className="hidden sm:flex items-center gap-2 text-lg font-bold text-amber-800 tabular-nums"
              aria-label={`Жинаған жұлдыздар: ${totalStars} / 25`}
            >
              <Star className="w-6 h-6 text-amber-500 fill-amber-400" aria-hidden="true" />
              <span>{totalStars} / 25</span>
            </div>
          )}

          <button
            type="button"
            onClick={handleListenIntro}
            className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 sm:px-6 sm:py-4 rounded-2xl bg-white border-2 border-stone-200 border-b-4 hover:bg-amber-50 hover:border-amber-300 active:translate-y-0.5 transition-all font-display font-bold text-base sm:text-lg text-slate-800 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
          >
            <Volume2 className="w-6 h-6 text-amber-600 shrink-0" aria-hidden="true" />
            <span>Тыңдау</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-8 py-4 sm:py-6 flex flex-col justify-center">
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <h2 className="font-display text-2xl sm:text-3xl 2xl:text-4xl font-bold text-slate-800 text-balance">
            Қай ойынды ойнаймыз?
          </h2>
          <p className="mt-1.5 text-base sm:text-xl text-slate-600 font-semibold">
            Күлкілі суретті таңдап, қызықты сұрақтарға жауап бер!
          </p>
        </div>

        {/* 5 Big Illustrated Category Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const earned = starsByCategory[cat.id] || 0;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  playTapChime();
                  onSelectCategory(cat.id);
                }}
                className={`group text-left bg-white rounded-3xl p-4 sm:p-5 border-2 ${cat.accentBorder} border-b-[6px] shadow-sm hover:-translate-y-1 hover:shadow-md active:translate-y-0.5 transition-all duration-200 flex flex-col justify-between cursor-pointer focus-visible:outline-none focus-visible:ring-4 ${cat.accentRing}`}
              >
                <div>
                  <CategoryCardImage category={cat} />

                  <div className="mt-4">
                    <h3
                      className={`font-display text-xl sm:text-2xl font-extrabold leading-tight ${cat.accentText}`}
                    >
                      {cat.emoji} {cat.title}
                    </h3>
                    <p className="mt-1.5 text-sm sm:text-base font-semibold text-slate-600">
                      {cat.subtitle}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-sm sm:text-base font-bold text-slate-600 tabular-nums">
                    <Star
                      className={`w-5 h-5 ${
                        earned > 0
                          ? 'text-amber-500 fill-amber-400'
                          : 'text-stone-300 fill-stone-200'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{earned} / 5</span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-display font-bold text-sm sm:text-base whitespace-nowrap shrink-0 ${cat.buttonBg}`}
                  >
                    <Play className="w-4 h-4 fill-white" aria-hidden="true" />
                    <span>Ойнау</span>
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};
