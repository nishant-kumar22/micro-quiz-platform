import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { category: string; id: string } }
) {
  const { category, id } = params;

  // Mock quiz data
  const quizData: Record<string, Record<string, any>> = {
    history: {
      'world-war-2': {
        id: 'world-war-2',
        title: 'World War II Facts',
        description: 'Test your knowledge about the Second World War',
        category: 'history',
        difficulty: 'Medium',
        estimatedTime: '10 minutes',
        questions: [
          {
            id: 1,
            question: "In which year did World War II begin?",
            options: ["1938", "1939", "1940", "1941"],
            correctAnswer: 1,
            explanation: "World War II began on September 1, 1939, when Germany invaded Poland."
          },
          {
            id: 2,
            question: "Which event led to the United States entering World War II?",
            options: ["Pearl Harbor attack", "D-Day invasion", "Battle of Britain", "Fall of France"],
            correctAnswer: 0,
            explanation: "The attack on Pearl Harbor on December 7, 1941, led to the US entering the war."
          },
          {
            id: 3,
            question: "Who was the leader of Nazi Germany during World War II?",
            options: ["Heinrich Himmler", "Hermann Göring", "Adolf Hitler", "Rudolf Hess"],
            correctAnswer: 2,
            explanation: "Adolf Hitler was the Führer (leader) of Nazi Germany from 1934 to 1945."
          },
          {
            id: 4,
            question: "Which battle is considered the turning point of WWII in Europe?",
            options: ["Battle of Britain", "Battle of Stalingrad", "D-Day", "Battle of Berlin"],
            correctAnswer: 1,
            explanation: "The Battle of Stalingrad (1942-1943) marked the beginning of Germany's retreat."
          },
          {
            id: 5,
            question: "When did World War II end in Europe?",
            options: ["May 8, 1945", "August 15, 1945", "September 2, 1945", "April 30, 1945"],
            correctAnswer: 0,
            explanation: "Victory in Europe Day (VE Day) was May 8, 1945, when Germany surrendered."
          }
        ]
      },
      'ancient-civilizations': {
        id: 'ancient-civilizations',
        title: 'Ancient Civilizations',
        description: 'Explore the great civilizations of the past',
        category: 'history',
        difficulty: 'Hard',
        estimatedTime: '15 minutes',
        questions: [
          {
            id: 1,
            question: "Which ancient civilization built Machu Picchu?",
            options: ["Aztec", "Maya", "Inca", "Olmec"],
            correctAnswer: 2,
            explanation: "Machu Picchu was built by the Inca civilization around 1450 CE."
          },
          {
            id: 2,
            question: "The Code of Hammurabi originated from which civilization?",
            options: ["Egyptian", "Babylonian", "Persian", "Assyrian"],
            correctAnswer: 1,
            explanation: "The Code of Hammurabi was created by the Babylonian king Hammurabi around 1754 BCE."
          }
        ]
      }
    },
    science: {
      'physics-basics': {
        id: 'physics-basics',
        title: 'Physics Fundamentals',
        description: 'Basic concepts of physics and mechanics',
        category: 'science',
        difficulty: 'Medium',
        estimatedTime: '12 minutes',
        questions: [
          {
            id: 1,
            question: "What is the speed of light in a vacuum?",
            options: ["299,792,458 m/s", "300,000,000 m/s", "186,000 miles/s", "All of the above"],
            correctAnswer: 0,
            explanation: "The exact speed of light in a vacuum is 299,792,458 meters per second."
          },
          {
            id: 2,
            question: "Which law states that force equals mass times acceleration?",
            options: ["Newton's First Law", "Newton's Second Law", "Newton's Third Law", "Law of Gravity"],
            correctAnswer: 1,
            explanation: "Newton's Second Law is expressed as F = ma (Force = mass × acceleration)."
          }
        ]
      }
    },
    math: {
      'algebra-basics': {
        id: 'algebra-basics',
        title: 'Algebra Fundamentals',
        description: 'Basic algebraic equations and solving',
        category: 'math',
        difficulty: 'Easy',
        estimatedTime: '10 minutes',
        questions: [
          {
            id: 1,
            question: "What is the value of x in the equation: 2x + 5 = 13?",
            options: ["3", "4", "5", "6"],
            correctAnswer: 1,
            explanation: "2x + 5 = 13, so 2x = 8, therefore x = 4."
          },
          {
            id: 2,
            question: "Simplify: 3x + 2x - x",
            options: ["4x", "5x", "6x", "2x"],
            correctAnswer: 0,
            explanation: "3x + 2x - x = (3 + 2 - 1)x = 4x."
          }
        ]
      }
    },
    programming: {
      'javascript-basics': {
        id: 'javascript-basics',
        title: 'JavaScript Fundamentals',
        description: 'Core concepts of JavaScript programming',
        category: 'programming',
        difficulty: 'Easy',
        estimatedTime: '13 minutes',
        questions: [
          {
            id: 1,
            question: "Which of the following is used to declare a variable in JavaScript?",
            options: ["var", "let", "const", "All of the above"],
            correctAnswer: 3,
            explanation: "JavaScript has three ways to declare variables: var, let, and const."
          },
          {
            id: 2,
            question: "What does '===' operator do in JavaScript?",
            options: ["Assignment", "Loose equality", "Strict equality", "Not equal"],
            correctAnswer: 2,
            explanation: "The '===' operator checks for strict equality (value and type)."
          }
        ]
      }
    }
  };

  const quiz = quizData[category]?.[id];
  
  if (!quiz) {
    return Response.json({ error: 'Quiz not found' }, { status: 404 });
  }

  return Response.json(quiz);
}