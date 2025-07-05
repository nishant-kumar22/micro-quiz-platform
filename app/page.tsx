import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Micro Quiz - Test Your Knowledge',
  description: 'Choose from various quiz categories including History, Science, Math, and Programming. Challenge yourself with our interactive quizzes.',
  keywords: 'quiz, trivia, knowledge test, history, science, math, programming',
  openGraph: {
    title: 'Micro Quiz - Test Your Knowledge',
    description: 'Choose from various quiz categories and challenge yourself with interactive quizzes.',
    type: 'website',
  },
};

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

async function getCategories(): Promise<Category[]> {
  // In production, this would be your actual API URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/categories`, {
      // This ensures the data is fetched at build time for SSG
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Fallback data in case of error
    return [
      {
        id: 'history',
        name: 'History',
        description: 'Test your knowledge of historical events and figures',
        icon: '🏛️'
      },
      {
        id: 'science',
        name: 'Science',
        description: 'Explore questions about physics, chemistry, and biology',
        icon: '🔬'
      },
      {
        id: 'math',
        name: 'Math',
        description: 'Challenge yourself with mathematical problems',
        icon: '📊'
      },
      {
        id: 'programming',
        name: 'Programming',
        description: 'Test your coding knowledge and software development skills',
        icon: '💻'
      }
    ];
  }
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Micro Quiz
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Test your knowledge across different categories. Choose a quiz category below to get started!
          </p>
        </header>

        {/* Categories Grid */}
        <main className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
            Available Quiz Categories
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/quiz/${category.id}`}
                className="group block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-4">{category.icon}</span>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium">
                  Start Quiz
                  <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; 2025 Micro Quiz. Challenge your mind, expand your knowledge.</p>
        </footer>
      </div>
    </div>
  );
}