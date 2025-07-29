import React from 'react';
import { BookOpen, Target, ChevronRight, ChevronDown } from 'lucide-react';

interface QuestionSetupProps {
  difficulty: string;
  topic: string;
  onDifficultyChange: (difficulty: string) => void;
  onTopicChange: (topic: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const difficulties = ['Easy', 'Medium', 'Hard'];
const topics = [
  'Machine Learning',
  'Data Science',
  'Artificial Intelligence',
  'Deep Learning',
  'Natural Language Processing',
  'Computer Vision',
  'Statistics',
  'Programming',
  'Web Development',
  'Database Systems'
];

const QuestionSetup: React.FC<QuestionSetupProps> = ({
  difficulty,
  topic,
  onDifficultyChange,
  onTopicChange,
  onGenerate,
  isLoading
}) => {
  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600';
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
          <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Ready to Learn?
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4">
          Test your knowledge with AI-generated questions tailored to your level
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 space-y-6">
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <Target className="w-4 h-4 mr-2" />
            Difficulty Level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {difficulties.map((diff) => (
              <button
                key={diff}
                onClick={() => onDifficultyChange(diff)}
                className={`p-3 sm:p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base ${
                  difficulty === diff
                    ? getDifficultyColor(diff) + ' border-current shadow-md'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-sm'
                }`}
              >
                <div className="font-semibold">{diff}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            <BookOpen className="w-4 h-4 mr-2" />
            Topic
          </label>
          <div className="relative">
            <select
              value={topic}
              onChange={(e) => onTopicChange(e.target.value)}
              className="w-full p-3 sm:p-4 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none cursor-pointer text-sm sm:text-base"
            >
              <option value="">Select a topic...</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown className="w-5 h-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>

        <button
          onClick={onGenerate}
          disabled={!difficulty || !topic || isLoading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center group active:scale-95 text-sm sm:text-base"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generating Question...
            </>
          ) : (
            <>
              Generate Question
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuestionSetup;