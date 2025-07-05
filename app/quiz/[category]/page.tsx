import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionCount: number;
  estimatedTime: string;
  thumbnail: string;
}

interface PageProps {
  params: { category: string };
}

// Generate dynamic metadata based on category
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const category = params.category;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  return {
    title: `${categoryName} Quizzes - Micro Quiz`,
    description: `Explore our collection of ${categoryName.toLowerCase()} quizzes. Test your knowledge and challenge yourself with various difficulty levels.`,
    keywords: `${categoryName.toLowerCase()}, quiz, trivia, test, knowledge, ${categoryName.toLowerCase()} questions`,
    openGraph: {
      title: `${categoryName} Quizzes - Micro Quiz`,
      description: `Explore our collection of ${categoryName.toLowerCase()} quizzes and test your knowledge.`,
      type: 'website',
    },
  };
}

async function getQuizzes(category: string): Promise<Quiz[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/quizzes/${category}`, {
      // This ensures the data is fetched on each request for SSR
      cache: 'no-store'
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        notFound();
      }
      throw new Error('Failed to fetch quizzes');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    throw error;
  }
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'Hard':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
}

export default async function QuizCategoryPage({ params }: PageProps) {
  const category = params.category;
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  
  const quizzes = await getQuizzes(category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <Link 
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Categories
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {categoryName} Quizzes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose a quiz below to test your {categoryName.toLowerCase()} knowledge. Each quiz has different difficulty levels and topics.
          </p>
        </header>

        {/* Quiz Stats */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
            <div className="flex flex-wrap justify-center gap-6 text-center">
              <div>
                <span className="block text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {quizzes.length}
                </span>
                <span className="text-gray-600 dark:text-gray-300">Available Quizzes</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-green-600 dark:text-green-400">
                  {quizzes.reduce((total, quiz) => total + quiz.questionCount, 0)}
                </span>
                <span className="text-gray-600 dark:text-gray-300">Total Questions</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-purple-600 dark:text-purple-400">
                  {quizzes.filter(quiz => quiz.difficulty === 'Easy').length}/{quizzes.filter(quiz => quiz.difficulty === 'Medium').length}/{quizzes.filter(quiz => quiz.difficulty === 'Hard').length}
                </span>
                <span className="text-gray-600 dark:text-gray-300">Easy/Medium/Hard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quizzes Grid */}
        <main className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <Link
                key={quiz.id}
                href={`/quiz/${category}/${quiz.id}`}
                className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
              >
                <div className="p-6">
                  {/* Quiz Thumbnail */}
                  <div className="text-center mb-4">
                    <span className="text-5xl">{quiz.thumbnail}</span>
                  </div>
                  
                  {/* Quiz Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
                    {quiz.title}
                  </h3>
                  
                  {/* Quiz Description */}
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {quiz.description}
                  </p>
                  
                  {/* Quiz Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Difficulty:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                        {quiz.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Questions:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {quiz.questionCount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Est. Time:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {quiz.estimatedTime}
                      </span>
                    </div>
                  </div>
                  
                  {/* Start Button */}
                  <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium pt-2 border-t border-gray-200 dark:border-gray-700">
                    Start Quiz
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>

        {/* Empty State */}
        {quizzes.length === 0 && (
          <div className="text-center py-12">
            <span className="text-6xl mb-4 block">📚</span>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No quizzes available
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're working on adding more {categoryName.toLowerCase()} quizzes. Check back soon!
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Other Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}