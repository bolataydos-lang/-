import { useEffect, useMemo, useState } from 'react';
import { CATEGORIES, TASKS } from './data/curriculum';
import { CategoryId } from './types/game';
import { HomeScreen } from './components/HomeScreen';
import { GameScreen } from './components/GameScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { preloadAudioAssets } from './utils/audio';

type ViewMode = 'home' | 'playing' | 'completed';

const INITIAL_STARS: Record<CategoryId, number> = {
  sauat: 0,
  til: 0,
  korshagan: 0,
  matematika: 0,
  zharatylastanu: 0,
};

function loadSavedStars(): Record<CategoryId, number> {
  try {
    const raw = window.localStorage.getItem('kul_de_uyren_stars_v1');
    if (!raw) return INITIAL_STARS;
    const parsed = JSON.parse(raw) as Partial<Record<CategoryId, number>>;
    return { ...INITIAL_STARS, ...parsed };
  } catch {
    return INITIAL_STARS;
  }
}

export default function App() {
  const [view, setView] = useState<ViewMode>('home');
  const [activeCategoryId, setActiveCategoryId] = useState<CategoryId>('sauat');
  const [lastStarsEarned, setLastStarsEarned] = useState(0);
  const [runSeed, setRunSeed] = useState(0);
  const [starsByCategory, setStarsByCategory] =
    useState<Record<CategoryId, number>>(loadSavedStars);

  useEffect(() => {
    preloadAudioAssets();
  }, []);

  const activeCategory = useMemo(
    () =>
      CATEGORIES.find((c) => c.id === activeCategoryId) ?? CATEGORIES[0],
    [activeCategoryId]
  );

  const activeTasks = useMemo(
    () => TASKS.filter((t) => t.categoryId === activeCategoryId),
    [activeCategoryId]
  );

  const handleSelectCategory = (categoryId: CategoryId) => {
    setActiveCategoryId(categoryId);
    setRunSeed((prev) => prev + 1);
    setView('playing');
  };

  const handleCompleteCategory = (starsEarned: number) => {
    setLastStarsEarned(starsEarned);
    setStarsByCategory((prev) => {
      const next = {
        ...prev,
        [activeCategoryId]: Math.max(prev[activeCategoryId] || 0, starsEarned),
      };
      try {
        window.localStorage.setItem(
          'kul_de_uyren_stars_v1',
          JSON.stringify(next)
        );
      } catch {
        // Ignore storage errors in restricted environments
      }
      return next;
    });
    setView('completed');
  };

  const handleReplay = () => {
    setRunSeed((prev) => prev + 1);
    setView('playing');
  };

  if (view === 'playing') {
    return (
      <GameScreen
        key={`${activeCategoryId}-${runSeed}`}
        category={activeCategory}
        tasks={activeTasks}
        onGoHome={() => setView('home')}
        onCompleteCategory={handleCompleteCategory}
      />
    );
  }

  if (view === 'completed') {
    return (
      <CompletionScreen
        category={activeCategory}
        starsEarned={lastStarsEarned}
        totalTasks={activeTasks.length}
        onGoHome={() => setView('home')}
        onReplay={handleReplay}
      />
    );
  }

  return (
    <HomeScreen
      starsByCategory={starsByCategory}
      onSelectCategory={handleSelectCategory}
    />
  );
}
