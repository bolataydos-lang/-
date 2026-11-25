export type CategoryId =
  | 'sauat'
  | 'til'
  | 'korshagan'
  | 'matematika'
  | 'zharatylastanu';

export type TaskType = 'choice' | 'speak-after' | 'sequence';

export type HintMode =
  | 'pulse-visual'
  | 'count-highlight'
  | 'compare-highlight'
  | 'sequence-next';

export type SceneId =
  | 'bear-bag'
  | 'bunny-spoon'
  | 'hedgehog-apples-clap'
  | 'chick-headphones'
  | 'chick-dance'
  | 'cat-roll-ball'
  | 'bunny-apple-story'
  | 'duck-puddle'
  | 'hedgehog-umbrella'
  | 'calf-reflection'
  | 'bunny-crosswalk'
  | 'doll-snow'
  | 'chick-toys'
  | 'hedgehog-mud'
  | 'bear-toothbrush'
  | 'count-3-apples'
  | 'bear-square-wheel'
  | 'compare-carrots'
  | 'big-vs-small'
  | 'cat-5-balloons'
  | 'thirsty-flower'
  | 'fish-ladder'
  | 'lost-calf'
  | 'night-moon-net'
  | 'autumn-hedgehog';

export type VisualIconId =
  | 'apple'
  | 'ball'
  | 'spoon'
  | 'sound-s'
  | 'sound-m'
  | 'sound-a'
  | 'clap-1'
  | 'clap-2'
  | 'clap-3'
  | 'action-roll'
  | 'action-sleep'
  | 'action-drink'
  | 'seq-pick'
  | 'seq-wash'
  | 'seq-eat'
  | 'action-jump'
  | 'action-fly'
  | 'action-sit'
  | 'size-big'
  | 'size-small'
  | 'item-rock'
  | 'puddle'
  | 'sky'
  | 'tree'
  | 'light-red'
  | 'light-yellow'
  | 'light-green'
  | 'boots'
  | 'slippers'
  | 'sandals'
  | 'basket'
  | 'fridge'
  | 'underbed'
  | 'wash-hands'
  | 'jump-mud'
  | 'sleep-bed'
  | 'pan'
  | 'toothbrush'
  | 'comb'
  | 'num-2'
  | 'num-3'
  | 'num-4'
  | 'num-5'
  | 'shape-circle'
  | 'shape-square'
  | 'shape-triangle'
  | 'bunny-2'
  | 'hedgehog-4'
  | 'bear-big'
  | 'chick-small'
  | 'toy-car'
  | 'watering-can'
  | 'water-pond'
  | 'meadow'
  | 'sheep'
  | 'horse'
  | 'cow'
  | 'moon-stars'
  | 'sun'
  | 'rainbow'
  | 'autumn'
  | 'winter'
  | 'summer';

export interface AnswerOption {
  id: string;
  label: string;
  spokenText: string;
  visual: VisualIconId;
  isCorrect: boolean;
  sequenceOrder?: number;
}

export interface TaskItem {
  id: string;
  categoryId: CategoryId;
  title: string;
  sceneId: SceneId;
  memeCaption: string;
  question: string;
  spokenQuestion: string;
  taskType: TaskType;
  options: AnswerOption[];
  correctFeedback: string;
  hintText: string;
  hintMode: HintMode;
  speakPromptSentence?: string;
  countableTarget?: number;
}

export interface CategoryInfo {
  id: CategoryId;
  title: string;
  subtitle: string;
  emoji: string;
  imagePath: string;
  accentBg: string;
  accentBorder: string;
  accentText: string;
  accentRing: string;
  buttonBg: string;
}
