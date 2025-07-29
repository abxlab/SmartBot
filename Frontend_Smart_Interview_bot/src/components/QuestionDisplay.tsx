import React from 'react';
import { Send, ArrowLeft, SkipForward } from 'lucide-react';

interface QuestionDisplayProps {
  question: string;
  difficulty: string;
  topic: string;
  answer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  onSkip: () => void;
  isLoading: boolean;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  difficulty,
  topic,
  answer,
  onAnswerChange,
  onSubmit,
  onBack,
  onSkip,
  isLoading
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Setup
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
            <span className="text-gray-600 dark:text-gray-400 hidden sm:inline">•</span>
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">{topic}</span>
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Question</h2>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6 border-l-4 border-blue-500">
            <p className="text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed">{question}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Your Answer
          </label>
          <textarea
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Type your answer here..."
            rows={6}
            className="w-full p-3 sm:p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm sm:text-base"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={onSubmit}
            disabled={!answer.trim() || isLoading}
            className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center group active:scale-95 text-sm sm:text-base"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Evaluating Answer...
              </>
            ) : (
              <>
                Submit Answer
                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <button
            onClick={onSkip}
            disabled={isLoading}
            className="sm:flex-shrink-0 bg-gray-500 dark:bg-gray-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg hover:bg-gray-600 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center group active:scale-95 text-sm sm:text-base"
          >
            <SkipForward className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;