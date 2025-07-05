'use client';

import { useState, useReducer } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  estimatedTime: string;
  questions: Question[];
}

interface QuizState {
  currentQuestionIndex: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
  answers: (number | null)[];
  isCompleted: boolean;
  score: number;
}

type QuizAction =
  | { type: 'SELECT_ANSWER'; answer: number }
  | { type: 'SHOW_FEEDBACK' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESTART_QUIZ' };

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SELECT_ANSWER':
      return {
        ...state,
        selectedAnswer: action.answer
      };
    
    case 'SHOW_FEEDBACK':
      const newAnswers = [...state.answers];
      newAnswers[state.currentQuestionIndex] = state.selectedAnswer;
      
      return {
        ...state,
        showFeedback: true,
        answers: newAnswers
      };
    
    case 'NEXT_QUESTION':
      const isLastQuestion = state.currentQuestionIndex === state.answers.length - 1;
      
      if (isLastQuestion) {
        const score = state.answers.reduce((total, answer, index) => {
          // Note: We need access to questions to calculate score, will handle this differently
          return total;
        }, 0);
        
        return {
          ...state,
          isCompleted: true
        };
      }
      
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        selectedAnswer: null,
        showFeedback: false
      };
    
    case 'COMPLETE_QUIZ':
      return {
        ...state,
        isCompleted: true
      };
    
    case 'RESTART_QUIZ':
      return {
        currentQuestionIndex: 0,
        selectedAnswer: null,
        showFeedback: false,
        answers: new Array(state.answers.length).fill(null),
        isCompleted: false,
        score: 0
      };
    
    default:
      return state;
  }
}

interface QuizInterfaceProps {
  quiz: Quiz;
}

export default function QuizInterface({ quiz }: QuizInterfaceProps) {
  const [state, dispatch] = useReducer(quizReducer, {
    currentQuestionIndex: 0,
    selectedAnswer: null,
    showFeedback: false,
    answers: new Array(quiz.questions.length).fill(null),
    isCompleted: false,
    score: 0
  });

  const currentQuestion = quiz.questions[state.currentQuestionIndex];
  const isLastQuestion = state.currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (!state.showFeedback) {
      dispatch({ type: 'SELECT_ANSWER', answer: answerIndex });
    }
  };

  const handleSubmitAnswer = () => {
    if (state.selectedAnswer !== null) {
      dispatch({ type: 'SHOW_FEEDBACK' });
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Calculate final score
      const finalAnswers = [...state.answers];
      finalAnswers[state.currentQuestionIndex] = state.selectedAnswer;
      
      const score = finalAnswers.reduce((total, answer, index) => {
        return answer === quiz.questions[index].correctAnswer ? total + 1 : total;
      }, 0);
      
      dispatch({ type: 'COMPLETE_QUIZ' });
      // Update score manually since we can't pass it through reducer easily
      setTimeout(() => {
        setFinalScore(score);
      }, 0);
    } else {
      dispatch({ type: 'NEXT_QUESTION' });
    }
  };

  const [finalScore, setFinalScore] = useState(0);

  const handleRestart = () => {
    dispatch({ type: 'RESTART_QUIZ' });
    setFinalScore(0);
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'Excellent! 🎉';
    if (percentage >= 80) return 'Great job! 👏';
    if (percentage >= 70) return 'Good work! 👍';
    if (percentage >= 60) return 'Not bad! 😊';
    return 'Keep practicing! 💪';
  };

  if (state.isCompleted) {
    const percentage = Math.round((finalScore / quiz.questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="text-6xl mb-6">🎯</div>
              
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Quiz Completed!
              </h1>
              
              <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {quiz.title}
              </h2>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
                <div className={`text-4xl font-bold mb-2 ${getScoreColor(finalScore, quiz.questions.length)}`}>
                  {finalScore} / {quiz.questions.length}
                </div>
                <div className={`text-2xl font-semibold mb-2 ${getScoreColor(finalScore, quiz.questions.length)}`}>
                  {percentage}%
                </div>
                <div className="text-lg text-gray-600 dark:text-gray-300">
                  {getScoreMessage(finalScore, quiz.questions.length)}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Retake Quiz
                </button>
                <Link
                  href={`/quiz/${quiz.category}`}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  More {quiz.category} Quizzes
                </Link>
                <Link
                  href="/"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link 
            href={`/quiz/${quiz.category}`}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {quiz.category} Quizzes
          </Link>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {quiz.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {quiz.description}
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>Question {state.currentQuestionIndex + 1} of {quiz.questions.length}</span>
                <span>{Math.round(((state.currentQuestionIndex + 1) / quiz.questions.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((state.currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {currentQuestion.question}
            </h2>
            
            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => {
                let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
                
                if (state.showFeedback) {
                  if (index === currentQuestion.correctAnswer) {
                    buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                  } else if (index === state.selectedAnswer && index !== currentQuestion.correctAnswer) {
                    buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                  } else {
                    buttonClass += "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400";
                  }
                } else {
                  if (state.selectedAnswer === index) {
                    buttonClass += "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300";
                  } else {
                    buttonClass += "border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/10";
                  }
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={state.showFeedback}
                  >
                    <span className="font-medium mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
            
            {/* Feedback */}
            {state.showFeedback && (
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {state.selectedAnswer === currentQuestion.correctAnswer ? '✅ Correct!' : '❌ Incorrect'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="flex justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Difficulty: <span className="font-medium">{quiz.difficulty}</span>
              </div>
              
              <div className="space-x-3">
                {!state.showFeedback ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={state.selectedAnswer === null}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                    {!isLastQuestion && (
                      <svg className="inline w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}