import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  const category = params.category;

  // Mock quiz data for each category
  const quizzesData: Record<string, any[]> = {
    history: [
      {
        id: 'world-war-2',
        title: 'World War II Facts',
        description: 'Test your knowledge about the Second World War',
        difficulty: 'Medium',
        questionCount: 15,
        estimatedTime: '10 minutes',
        thumbnail: '🌍'
      },
      {
        id: 'ancient-civilizations',
        title: 'Ancient Civilizations',
        description: 'Explore the great civilizations of the past',
        difficulty: 'Hard',
        questionCount: 20,
        estimatedTime: '15 minutes',
        thumbnail: '🏛️'
      },
      {
        id: 'american-revolution',
        title: 'American Revolution',
        description: 'Learn about the birth of the United States',
        difficulty: 'Easy',
        questionCount: 12,
        estimatedTime: '8 minutes',
        thumbnail: '🇺🇸'
      }
    ],
    science: [
      {
        id: 'physics-basics',
        title: 'Physics Fundamentals',
        description: 'Basic concepts of physics and mechanics',
        difficulty: 'Medium',
        questionCount: 18,
        estimatedTime: '12 minutes',
        thumbnail: '⚛️'
      },
      {
        id: 'chemistry-elements',
        title: 'Chemical Elements',
        description: 'Periodic table and chemical properties',
        difficulty: 'Hard',
        questionCount: 25,
        estimatedTime: '18 minutes',
        thumbnail: '🧪'
      },
      {
        id: 'biology-cells',
        title: 'Cell Biology',
        description: 'Understanding cellular structures and functions',
        difficulty: 'Medium',
        questionCount: 16,
        estimatedTime: '11 minutes',
        thumbnail: '🔬'
      }
    ],
    math: [
      {
        id: 'algebra-basics',
        title: 'Algebra Fundamentals',
        description: 'Basic algebraic equations and solving',
        difficulty: 'Easy',
        questionCount: 14,
        estimatedTime: '10 minutes',
        thumbnail: '📐'
      },
      {
        id: 'calculus-derivatives',
        title: 'Calculus: Derivatives',
        description: 'Understanding derivatives and their applications',
        difficulty: 'Hard',
        questionCount: 22,
        estimatedTime: '16 minutes',
        thumbnail: '📊'
      },
      {
        id: 'geometry-shapes',
        title: 'Geometry and Shapes',
        description: 'Properties of geometric shapes and calculations',
        difficulty: 'Medium',
        questionCount: 13,
        estimatedTime: '9 minutes',
        thumbnail: '📏'
      }
    ],
    programming: [
      {
        id: 'javascript-basics',
        title: 'JavaScript Fundamentals',
        description: 'Core concepts of JavaScript programming',
        difficulty: 'Easy',
        questionCount: 20,
        estimatedTime: '13 minutes',
        thumbnail: '💛'
      },
      {
        id: 'react-components',
        title: 'React Components',
        description: 'Understanding React components and hooks',
        difficulty: 'Medium',
        questionCount: 17,
        estimatedTime: '12 minutes',
        thumbnail: '⚛️'
      },
      {
        id: 'data-structures',
        title: 'Data Structures',
        description: 'Arrays, objects, and advanced data structures',
        difficulty: 'Hard',
        questionCount: 24,
        estimatedTime: '17 minutes',
        thumbnail: '🏗️'
      }
    ]
  };

  const quizzes = quizzesData[category] || [];
  
  if (quizzes.length === 0) {
    return Response.json({ error: 'Category not found' }, { status: 404 });
  }

  return Response.json(quizzes);
}