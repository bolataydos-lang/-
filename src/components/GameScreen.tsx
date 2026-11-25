import React, { useEffect, useState } from 'react';
import {
  Home,
  Volume2,
  ArrowRight,
  Star,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
} from 'lucide-react';
import { AnswerOption, CategoryInfo, TaskItem } from '../types/game';
import { SceneIllustration } from './SceneIllustration';
import { OptionVisual } from './OptionVisual';
import {
  playSoundEffect,
  speakKazakh,
  stopSpeaking,
} from '../utils/audio';

interface GameScreenProps {
  category: CategoryInfo;
  tasks: TaskItem[];
  onGoHome: () => void;
  onCompleteCategory: (starsEarned: number) => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  category,
  tasks,
  onGoHome,
  onCompleteCategory,
}) => {
  const [taskIndex, setTaskIndex] = useState(0);
  const [starsEarned, setStarsEarned] = useState(0);

  // Per-task interaction states
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [isAwaitingSpeakDone, setIsAwaitingSpeakDone] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [wrongOptionId, setWrongOptionId] = useState<string | null>(null);
  const [sequenceProgress, setSequenceProgress] = useState<string[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<'success' | 'retry' | null>(
    null
  );

  const currentTask = tasks[taskIndex];
  const isPhonemeTask =
    currentTask.id === 'sauat-1' || currentTask.id === 'sauat-2';

  useEffect(() => {
    setSelectedOptionId(null);
    setIsSolved(false);
    setIsAwaitingSpeakDone(false);
    setShowHint(false);
    setWrongOptionId(null);
    setSequenceProgress([]);
    setFeedbackMessage(null);
    setFeedbackType(null);
    stopSpeaking();
  }, [taskIndex, category.id]);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleListenQuestion = () => {
    playSoundEffect('listen');
    if (isAwaitingSpeakDone && currentTask.speakPromptSentence) {
      speakKazakh(currentTask.speakPromptSentence);
    } else {
      speakKazakh(currentTask.spokenQuestion);
    }
  };

  const handleOptionSpeak = (e: React.MouseEvent, option: AnswerOption) => {
    e.stopPropagation();
    playSoundEffect('listen');
    speakKazakh(option.spokenText, {
      mode: isPhonemeTask ? 'phoneme' : 'sentence',
    });
  };

  const handleSelectOption = (option: AnswerOption) => {
    if (isSolved || isAwaitingSpeakDone) return;

    // Sequencing mechanic ("Оқиғаны ретте")
    if (currentTask.taskType === 'sequence') {
      if (sequenceProgress.includes(option.id)) return;
      const expectedStep = sequenceProgress.length + 1;
      if (option.sequenceOrder === expectedStep) {
        const nextProgress = [...sequenceProgress, option.id];
        setSequenceProgress(nextProgress);
        setWrongOptionId(null);

        if (nextProgress.length === currentTask.options.length) {
          playSoundEffect('correct');
          setIsSolved(true);
          setShowHint(false);
          setStarsEarned((prev) => prev + 1);
          setFeedbackType('success');
          setFeedbackMessage(currentTask.correctFeedback);
          speakKazakh(currentTask.correctFeedback, {
            delayMs: 360,
            fallbackText: 'Дұрыс! Жарайсың!',
          });
        } else {
          playSoundEffect('tap');
          setFeedbackType(null);
          setFeedbackMessage(null);
          speakKazakh(option.spokenText, { delayMs: 120 });
        }
      } else {
        playSoundEffect('wrong');
        setWrongOptionId(option.id);
        setShowHint(true);
        setFeedbackType('retry');
        setFeedbackMessage(currentTask.hintText);
        speakKazakh(currentTask.hintText, {
          delayMs: 280,
          fallbackText: 'Тағы бір рет байқап көр!',
        });
      }
      return;
    }

    // Standard choice or speak-after mechanic
    setSelectedOptionId(option.id);

    if (option.isCorrect) {
      playSoundEffect('correct');
      setWrongOptionId(null);
      setShowHint(false);
      setFeedbackType('success');
      setFeedbackMessage(currentTask.correctFeedback);

      if (currentTask.taskType === 'speak-after' && currentTask.speakPromptSentence) {
        setIsAwaitingSpeakDone(true);
        speakKazakh(
          `${currentTask.correctFeedback} ${currentTask.speakPromptSentence}`,
          { delayMs: 360 }
        );
      } else {
        setIsSolved(true);
        setStarsEarned((prev) => prev + 1);
        speakKazakh(currentTask.correctFeedback, {
          delayMs: 360,
          fallbackText: 'Дұрыс! Жарайсың!',
        });
      }
    } else {
      playSoundEffect('wrong');
      setWrongOptionId(option.id);
      setShowHint(true);
      setFeedbackType('retry');
      setFeedbackMessage(currentTask.hintText);
      speakKazakh(currentTask.hintText, {
        delayMs: 280,
        fallbackText: 'Тағы бір рет байқап көр!',
      });
    }
  };

  const handleSpeakDone = () => {
    if (!isAwaitingSpeakDone || isSolved) return;
    playSoundEffect('correct');
    setIsAwaitingSpeakDone(false);
    setIsSolved(true);
    setStarsEarned((prev) => prev + 1);
    setFeedbackType('success');
    setFeedbackMessage('Жарайсың! Сөйлемді өте жақсы айттың!');
    speakKazakh('Жарайсың!', { delayMs: 360 });
  };

  const handleNext = () => {
    if (!isSolved) return;
    playSoundEffect('next');
    stopSpeaking();
    if (taskIndex + 1 < tasks.length) {
      setTaskIndex((prev) => prev + 1);
    } else {
      onCompleteCategory(starsEarned);
    }
  };

  const nextExpectedSeqOrder = sequenceProgress.length + 1;

  return (
    <div className="min-h-dvh flex flex-col bg-[#FBF9F5] text-slate-900">
      {/* Consistent Top Bar: Home (Left), Stars (Center), Listen (Right) */}
      <header className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 pt-4 pb-3 flex items-center justify-between gap-3 sm:gap-6">
        {/* Consistent Top-Left: Үйге қайту */}
        <button
          type="button"
          onClick={() => {
            playSoundEffect('tap');
            stopSpeaking();
            onGoHome();
          }}
          className="inline-flex items-center justify-center gap-2.5 px-4 py-3 sm:px-6 sm:py-4 rounded-2xl bg-white border-2 border-stone-200 border-b-4 hover:bg-stone-50 active:translate-y-0.5 transition-all font-display font-bold text-base sm:text-lg text-slate-800 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300"
        >
          <Home className="w-6 h-6 text-slate-700 shrink-0" aria-hidden="true" />
          <span>Үйге қайту</span>
        </button>

        {/* Center: Category & 5 Stars Progress */}
        <div className="flex flex-col items-center justify-center min-w-0">
          <div className="hidden md:flex items-center gap-2 text-sm lg:text-base font-bold text-slate-600 mb-1">
            <span>{category.emoji}</span>
            <span className="truncate">{category.title}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {taskIndex + 1} / {tasks.length}
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 sm:gap-2"
            aria-label={`Жинаған жұлдыздар: ${starsEarned} / ${tasks.length}`}
          >
            {tasks.map((t, idx) => {
              const filled = idx < starsEarned;
              const active = idx === taskIndex && !isSolved;
              return (
                <div
                  key={t.id}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-transform duration-200 ${
                    filled
                      ? 'bg-amber-100 border-2 border-amber-400 scale-105'
                      : active
                        ? 'bg-white border-2 border-sky-400'
                        : 'bg-stone-100 border border-stone-200'
                  }`}
                >
                  <Star
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${
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
        </div>

        {/* Consistent Top-Right: Тыңдау */}
        <button
          type="button"
          onClick={handleListenQuestion}
          className="inline-flex items-center justify-center gap-2.5 px-4 py-3 sm:px-6 sm:py-4 rounded-2xl bg-amber-400 border-2 border-amber-500 border-b-4 hover:bg-amber-300 active:translate-y-0.5 transition-all font-display font-bold text-base sm:text-lg text-slate-900 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
        >
          <Volume2 className="w-6 h-6 text-slate-900 shrink-0" aria-hidden="true" />
          <span>Тыңдау</span>
        </button>
      </header>

      {/* Main Single-Screen Interactive Stage */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 sm:px-8 pb-6 pt-2 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch">
          {/* Left Zone: Big Humorous Scene + Meme Caption Below */}
          <section className="lg:col-span-7 flex flex-col bg-white rounded-3xl p-3 sm:p-5 border-2 border-stone-200 shadow-sm">
            <div className="flex-1 w-full aspect-[16/10.5] rounded-2xl overflow-hidden bg-sky-50 border border-stone-200 flex items-center justify-center">
              <SceneIllustration
                sceneId={currentTask.sceneId}
                showHint={showHint}
                isSolved={isSolved}
              />
            </div>

            {/* Meme Caption strictly BELOW the illustration */}
            <div className="mt-3 sm:mt-4 px-4 py-3 rounded-2xl bg-[#FBF9F5] border border-stone-200 text-center">
              <p className="font-display text-lg sm:text-2xl 2xl:text-3xl font-bold text-slate-800">
                «{currentTask.memeCaption}»
              </p>
            </div>
          </section>

          {/* Right Zone: Question, Large Touch Choices, Feedback, Consistent Bottom-Right Келесі */}
          <section className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl p-5 sm:p-7 border-2 border-stone-200 shadow-sm gap-5">
            <div className="flex flex-col gap-5">
              {/* Short Question Headline */}
              <div>
                <p className="text-sm sm:text-base font-bold text-slate-500 mb-1">
                  {currentTask.title}
                </p>
                <h2 className="font-display text-2xl sm:text-3xl 2xl:text-4xl font-extrabold text-slate-900 leading-snug text-balance">
                  {currentTask.question}
                </h2>
              </div>

              {/* Speak-after panel when right option was chosen */}
              {isAwaitingSpeakDone && currentTask.speakPromptSentence ? (
                <div className="animate-gentle-pop rounded-3xl bg-emerald-50 border-2 border-emerald-300 p-5 sm:p-6 flex flex-col gap-4">
                  <p className="text-base sm:text-lg font-bold text-emerald-900">
                    Дауыстап қайтала:
                  </p>
                  <p className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                    «{currentTask.speakPromptSentence}»
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        playSoundEffect('listen');
                        speakKazakh(currentTask.speakPromptSentence!);
                      }}
                      className="flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-4 rounded-2xl bg-white border-2 border-emerald-300 border-b-4 hover:bg-emerald-100 active:translate-y-0.5 transition-all font-display font-bold text-lg text-emerald-950 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                    >
                      <RotateCcw className="w-5 h-5 shrink-0" aria-hidden="true" />
                      <span>Үлгіні тыңдау</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSpeakDone}
                      className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-600 border-2 border-emerald-700 border-b-4 hover:bg-emerald-500 active:translate-y-0.5 transition-all font-display font-bold text-lg sm:text-xl text-white whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                    >
                      <CheckCircle2 className="w-6 h-6 shrink-0" aria-hidden="true" />
                      <span>Айтып болдым</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Answer Option Cards */
                <div
                  className={`grid gap-3.5 sm:gap-4 ${
                    currentTask.options.length === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : 'grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3'
                  }`}
                >
                  {currentTask.options.map((option) => {
                    const isSelected = selectedOptionId === option.id;
                    const isWrong = wrongOptionId === option.id;
                    const seqIndex = sequenceProgress.indexOf(option.id);
                    const isSeqPicked = seqIndex !== -1;
                    const isSeqHinted =
                      showHint &&
                      currentTask.taskType === 'sequence' &&
                      option.sequenceOrder === nextExpectedSeqOrder;
                    const isSolvedCorrect = isSolved && option.isCorrect;

                    return (
                      <div key={option.id} className="relative">
                        <button
                          type="button"
                          onClick={() => handleSelectOption(option)}
                          disabled={isSolved || isSeqPicked}
                          className={`w-full h-full min-h-[118px] sm:min-h-[146px] rounded-2xl p-3 sm:p-4 border-2 border-b-[5px] flex flex-row sm:flex-col lg:flex-row xl:flex-col items-center justify-center gap-3 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300 ${
                            isSolvedCorrect || isSeqPicked
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm'
                              : isWrong
                                ? 'bg-rose-50 border-rose-400 text-rose-950 animate-gentle-nudge'
                                : isSeqHinted
                                  ? 'bg-amber-50 border-amber-400 text-slate-900 ring-4 ring-amber-200'
                                  : isSelected
                                    ? 'bg-sky-50 border-sky-500 text-slate-900'
                                    : 'bg-[#FBF9F5] border-stone-300 hover:bg-sky-50 hover:border-sky-400 active:translate-y-0.5 text-slate-900'
                          }`}
                        >
                          {/* Sequence Order Badge */}
                          {isSeqPicked && (
                            <span className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full bg-emerald-600 text-white font-display font-extrabold text-lg flex items-center justify-center shadow-sm">
                              {seqIndex + 1}
                            </span>
                          )}

                          <OptionVisual
                            visual={option.visual}
                            className="w-16 h-16 sm:w-20 sm:h-20 shrink-0"
                          />

                          <span className="font-display font-bold text-lg sm:text-xl text-center leading-tight">
                            {option.label}
                          </span>
                        </button>

                        {/* Individual Option Audio Button so non-readers can preview any answer */}
                        <button
                          type="button"
                          onClick={(e) => handleOptionSpeak(e, option)}
                          aria-label={`${option.label} — тыңдау`}
                          title="Тыңдау"
                          className="absolute top-2 right-2 w-9 h-9 rounded-xl bg-white/95 border border-stone-300 hover:bg-amber-100 hover:border-amber-400 flex items-center justify-center text-slate-700 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        >
                          <Volume2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Feedback Banner (Dual-coded: Icon + Text, never hue-only) */}
              {feedbackMessage && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`animate-gentle-pop rounded-2xl px-4 py-3.5 border-2 flex items-start gap-3 ${
                    feedbackType === 'success'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  {feedbackType === 'success' ? (
                    <CheckCircle2
                      className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  ) : (
                    <Lightbulb
                      className="w-7 h-7 text-amber-600 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                  )}
                  <p className="font-body text-base sm:text-lg font-bold leading-snug">
                    {feedbackMessage}
                  </p>
                </div>
              )}
            </div>

            {/* Consistent Bottom-Right Action Slot: Келесі */}
            <div className="pt-2 flex items-center justify-end min-h-[64px]">
              {isSolved ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="animate-gentle-pop inline-flex items-center justify-center gap-3 px-7 py-4 sm:px-9 sm:py-5 rounded-2xl bg-emerald-600 border-2 border-emerald-700 border-b-4 hover:bg-emerald-500 active:translate-y-0.5 transition-all font-display font-extrabold text-xl sm:text-2xl text-white whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                >
                  <span>Келесі</span>
                  <ArrowRight className="w-7 h-7 shrink-0" aria-hidden="true" />
                </button>
              ) : (
                <div className="text-sm sm:text-base font-bold text-slate-400">
                  Дұрыс суретті түрт
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
