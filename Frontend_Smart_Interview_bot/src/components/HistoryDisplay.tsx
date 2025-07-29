import React from 'react';
import { ArrowLeft, Trophy, Target, Clock, RotateCcw, CheckCircle, XCircle, Minus } from 'lucide-react';
import { QuestionHistory, UserStats } from '../types';

interface HistoryDisplayProps {
  history: QuestionHistory[];
  stats: UserStats;
  onBack: () => void;
  onRetryQuestion: (questionId: string) => void;
}

const HistoryDisplay: React.FC<HistoryDisplayProps> = ({
  history,
  stats,
  onBack,
  onRetryQuestion
}) => {
  const getStatusIcon = (status: string, score?: number) => {
    switch (status) {
      case 'completed':
        return score && score >= 7 ? 
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> : 
          <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      case 'skipped':
        return <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />;
      case 'retry':
        return <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string, score?: number) => {
    switch (status) {
      case 'completed':
        return score && score >= 7 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
      case 'skipped':
        return 'text-gray-500 dark:text-gray-400';
      case 'retry':
        return 'text-yellow-600 dark:text-yellow-400';
      default:
        return 'text-blue-600 dark:text-blue-400';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-4 sm:mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Quiz
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
          Your Learning Journey
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-2 sm:mb-3 mx-auto">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.totalQuestions}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Total Questions</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900 rounded-lg mb-2 sm:mb-3 mx-auto">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.completedQuestions}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg mb-2 sm:mb-3 mx-auto">
              <Minus className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.skippedQuestions}</div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Skipped</div>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 dark:bg-purple-900 rounded-lg mb-2 sm:mb-3 mx-auto">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {stats.averageScore.toFixed(1)}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Avg Score</div>
          </div>
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {history.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 text-center">
            <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Questions Yet
            </h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Start your learning journey by generating your first question!
            </p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {getStatusIcon(item.status, item.evaluation?.score)}
                  <div>
                    <span className={`text-xs sm:text-sm font-medium ${getStatusColor(item.status, item.evaluation?.score)}`}>
                      {item.status === 'completed' ? 'Completed' : 
                       item.status === 'skipped' ? 'Skipped' : 'Retry Available'}
                    </span>
                    {item.evaluation && (
                      <span className="ml-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        Score: {item.evaluation.score}/10
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                    {item.difficulty}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1 text-sm sm:text-base">Question</h4>
                <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">{item.question}</p>
              </div>

              <div className="mb-3">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {item.topic}
                </span>
              </div>

              {item.answer && (
                <div className="mb-3">
                  <h5 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white mb-1">Your Answer</h5>
                  <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded">
                    {item.answer.length > 100 ? `${item.answer.substring(0, 100)}...` : item.answer}
                  </p>
                </div>
              )}

              {(item.status === 'skipped' || (item.evaluation && item.evaluation.score < 5)) && (
                <button
                  onClick={() => onRetryQuestion(item.id)}
                  className="flex items-center space-x-2 text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Retry Question</span>
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryDisplay;