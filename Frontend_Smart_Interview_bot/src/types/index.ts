export interface Question {
  question: string;
}

export interface EvaluationResult {
  feedback: string;
  score: number;
}

export interface QuestionHistory {
  id: string;
  question: string;
  answer: string;
  evaluation: EvaluationResult | null;
  difficulty: string;
  topic: string;
  timestamp: Date;
  status: 'completed' | 'skipped' | 'retry';
}

export interface UserStats {
  totalQuestions: number;
  completedQuestions: number;
  skippedQuestions: number;
  averageScore: number;
  totalScore: number;
}

export interface QuizState {
  difficulty: string;
  topic: string;
  currentQuestion: string;
  userAnswer: string;
  evaluation: EvaluationResult | null;
  isLoading: boolean;
  step: 'setup' | 'question' | 'feedback' | 'history';
  currentQuestionId: string;
}

export interface AppState {
  isDarkMode: boolean;
  history: QuestionHistory[];
  stats: UserStats;
}