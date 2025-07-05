import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import QuizInterface from './QuizInterface';

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

interface PageProps {
  params: { category: string; id: string };
}

// Generate dynamic metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const quiz = await getQuiz(params.category, params.id);
  
  if (!quiz) {
    return {
      title: 'Quiz Not Found - Micro Quiz',
      description: 'The requested quiz could not be found.'
    };
  }

  return {
    title: `${quiz.title} - Micro Quiz`,
    description: `${quiz.description} - ${quiz.difficulty} level quiz with ${quiz.questions.length} questions.`,
    keywords: `${quiz.category}, quiz, ${quiz.difficulty}, ${quiz.title}`,
    openGraph: {
      title: `${quiz.title} - Micro Quiz`,
      description: quiz.description,
      type: 'website',
    },
  };
}

async function getQuiz(category: string, id: string): Promise<Quiz | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/quiz/${category}/${id}`, {
      // Server-side fetch for initial data
      cache: 'no-store'
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return null;
  }
}

export default async function QuizPage({ params }: PageProps) {
  const quiz = await getQuiz(params.category, params.id);

  if (!quiz) {
    notFound();
  }

  return <QuizInterface quiz={quiz} />;
}