import React from 'react';
import { CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';

interface FeedbackDisplayProps {
  question: string;
  answer: string;
  feedback: string;
  score: number;
  difficulty: string;
  topic: string;
  onNewQuestion: () => void;
  onStartOver: () => void;
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({
  question,
  answer,
  feedback,
  score,
  difficulty,
  topic,
  onNewQuestion,
  onStartOver
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 dark:text-green-400';
    if (score >= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 7) return <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />;
    return <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />;
  };

  const getScoreMessage = (score: number) => {
    if (score >= 9) return 'Excellent work! 🎉';
    if (score >= 7) return 'Great job! 👏';
    if (score >= 5) return 'Good effort! 👍';
    return 'Keep practicing! 💪';
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-4">
            {getScoreIcon(score)}
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Score: <span className={getScoreColor(score)}>{score}/10</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">{getScoreMessage(score)}</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">Question</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 border-l-4 border-blue-500">
              <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base">{question}</p>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">Your Answer</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 border-l-4 border-gray-300 dark:border-gray-600">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap text-sm sm:text-base">{answer}</p>
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">AI Feedback</h3>
            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 sm:p-4 border-l-4 border-blue-500">
              <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap text-sm sm:text-base">{feedback}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <button
          onClick={onNewQuestion}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center group active:scale-95 text-sm sm:text-base"
        >
          <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
          New Question
        </button>
        <button
          onClick={onStartOver}
          className="bg-gray-600 dark:bg-gray-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center group active:scale-95 text-sm sm:text-base"
        >
          <Home className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
          Start Over
        </button>
      </div>
    </div>
  );
};

export default FeedbackDisplay;