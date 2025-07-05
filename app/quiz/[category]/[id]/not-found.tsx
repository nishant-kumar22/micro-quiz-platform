import Link from 'next/link';

export default function QuizNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <span className="text-8xl mb-6 block">🧩</span>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Quiz Not Found
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md">
          The quiz you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Categories
        </Link>
      </div>
    </div>
  );
}