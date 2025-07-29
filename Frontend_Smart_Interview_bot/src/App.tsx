import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import QuestionSetup from './components/QuestionSetup';
import QuestionDisplay from './components/QuestionDisplay';
import FeedbackDisplay from './components/FeedbackDisplay';
import HistoryDisplay from './components/HistoryDisplay';
import ErrorDisplay from './components/ErrorDisplay';
import { generateQuestion, evaluateAnswer } from './services/api';
import { QuizState, AppState, QuestionHistory, UserStats } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [state, setState] = useState<QuizState>({
    difficulty: '',
    topic: '',
    currentQuestion: '',
    userAnswer: '',
    evaluation: null,
    isLoading: false,
    step: 'setup',
    currentQuestionId: ''
  });

  const [appState, setAppState] = useLocalStorage<AppState>('quizmaster-app-state', {
    isDarkMode: false,
    history: [],
    stats: {
      totalQuestions: 0,
      completedQuestions: 0,
      skippedQuestions: 0,
      averageScore: 0,
      totalScore: 0
    }
  });

  const [error, setError] = useState<string | null>(null);

  // Apply dark mode class to document
  useEffect(() => {
    if (appState.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appState.isDarkMode]);

  const updateStats = (newHistory: QuestionHistory[]) => {
    const completed = newHistory.filter(h => h.status === 'completed');
    const skipped = newHistory.filter(h => h.status === 'skipped');
    const totalScore = completed.reduce((sum, h) => sum + (h.evaluation?.score || 0), 0);
    
    const newStats: UserStats = {
      totalQuestions: newHistory.length,
      completedQuestions: completed.length,
      skippedQuestions: skipped.length,
      averageScore: completed.length > 0 ? totalScore / completed.length : 0,
      totalScore
    };

    setAppState(prev => ({ ...prev, stats: newStats }));
  };

  const addToHistory = (questionData: Partial<QuestionHistory>) => {
    const historyItem: QuestionHistory = {
      id: state.currentQuestionId || Date.now().toString(),
      question: state.currentQuestion,
      answer: state.userAnswer,
      evaluation: state.evaluation,
      difficulty: state.difficulty,
      topic: state.topic,
      timestamp: new Date(),
      status: 'completed',
      ...questionData
    };

    const newHistory = [historyItem, ...appState.history];
    setAppState(prev => ({ ...prev, history: newHistory }));
    updateStats(newHistory);
  };

  const handleDifficultyChange = (difficulty: string) => {
    setState(prev => ({ ...prev, difficulty }));
  };

  const handleTopicChange = (topic: string) => {
    setState(prev => ({ ...prev, topic }));
  };

  const handleGenerateQuestion = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    setError(null);

    try {
      const response = await generateQuestion(state.difficulty, state.topic);
      const questionId = Date.now().toString();
      setState(prev => ({
        ...prev,
        currentQuestion: response.question,
        userAnswer: '',
        evaluation: null,
        isLoading: false,
        step: 'question',
        currentQuestionId: questionId
      }));
    } catch (err) {
      setError('Failed to generate question. Please check your backend connection and try again.');
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleAnswerChange = (answer: string) => {
    setState(prev => ({ ...prev, userAnswer: answer }));
  };

  const handleSubmitAnswer = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    setError(null);

    try {
      const response = await evaluateAnswer(state.userAnswer);
      setState(prev => ({
        ...prev,
        evaluation: response,
        isLoading: false,
        step: 'feedback'
      }));
    } catch (err) {
      setError('Failed to evaluate answer. Please check your backend connection and try again.');
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleSkipQuestion = () => {
    addToHistory({ status: 'skipped', answer: '', evaluation: null });
    setState(prev => ({
      ...prev,
      currentQuestion: '',
      userAnswer: '',
      evaluation: null,
      step: 'setup'
    }));
  };

  const handleNewQuestion = () => {
    if (state.evaluation) {
      addToHistory({ status: 'completed' });
    }
    setState(prev => ({
      ...prev,
      currentQuestion: '',
      userAnswer: '',
      evaluation: null,
      step: 'setup'
    }));
  };

  const handleStartOver = () => {
    if (state.evaluation) {
      addToHistory({ status: 'completed' });
    }
    setState({
      difficulty: '',
      topic: '',
      currentQuestion: '',
      userAnswer: '',
      evaluation: null,
      isLoading: false,
      step: 'setup',
      currentQuestionId: ''
    });
  };

  const handleBackToSetup = () => {
    setState(prev => ({ ...prev, step: 'setup' }));
  };

  const handleShowHistory = () => {
    setState(prev => ({ ...prev, step: 'history' }));
  };

  const handleRetryQuestion = (questionId: string) => {
    const question = appState.history.find(h => h.id === questionId);
    if (question) {
      setState({
        difficulty: question.difficulty,
        topic: question.topic,
        currentQuestion: question.question,
        userAnswer: '',
        evaluation: null,
        isLoading: false,
        step: 'question',
        currentQuestionId: questionId
      });
    }
  };

  const handleToggleDarkMode = () => {
    setAppState(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  const handleRetry = () => {
    setError(null);
    setState(prev => ({ ...prev, isLoading: false }));
  };

  if (error) {
    return (
      <div className={appState.isDarkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
          <ErrorDisplay message={error} onRetry={handleRetry} />
        </div>
      </div>
    );
  }

  return (
    <div className={appState.isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar
          isDarkMode={appState.isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          onShowHistory={handleShowHistory}
          totalQuestions={appState.stats.totalQuestions}
        />
        
        <div className="py-6 sm:py-8 px-4">
          <div className="container mx-auto">
            {state.step === 'setup' && (
              <QuestionSetup
                difficulty={state.difficulty}
                topic={state.topic}
                onDifficultyChange={handleDifficultyChange}
                onTopicChange={handleTopicChange}
                onGenerate={handleGenerateQuestion}
                isLoading={state.isLoading}
              />
            )}

            {state.step === 'question' && (
              <QuestionDisplay
                question={state.currentQuestion}
                difficulty={state.difficulty}
                topic={state.topic}
                answer={state.userAnswer}
                onAnswerChange={handleAnswerChange}
                onSubmit={handleSubmitAnswer}
                onBack={handleBackToSetup}
                onSkip={handleSkipQuestion}
                isLoading={state.isLoading}
              />
            )}

            {state.step === 'feedback' && state.evaluation && (
              <FeedbackDisplay
                question={state.currentQuestion}
                answer={state.userAnswer}
                feedback={state.evaluation.feedback}
                score={state.evaluation.score}
                difficulty={state.difficulty}
                topic={state.topic}
                onNewQuestion={handleNewQuestion}
                onStartOver={handleStartOver}
              />
            )}

            {state.step === 'history' && (
              <HistoryDisplay
                history={appState.history}
                stats={appState.stats}
                onBack={handleBackToSetup}
                onRetryQuestion={handleRetryQuestion}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;