import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Mock quiz data for testing
export const mockQuiz = {
  id: '1',
  title: 'Test Quiz',
  description: 'A test quiz for unit testing',
  category: 'history',
  difficulty: 'Medium',
  estimatedTime: '5 minutes',
  questions: [
    {
      id: 1,
      question: 'What year did World War II end?',
      options: ['1944', '1945', '1946', '1947'],
      correctAnswer: 1,
      explanation: 'World War II ended in 1945 with the surrender of Japan.'
    },
    {
      id: 2,
      question: 'Who was the first President of the United States?',
      options: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'],
      correctAnswer: 1,
      explanation: 'George Washington was the first President of the United States.'
    }
  ]
}

// Mock categories data
export const mockCategories = [
  {
    id: 'history',
    name: 'History',
    description: 'Test your knowledge of historical events',
    icon: '🏛️',
    imageUrl: '/images/categories/history.jpg'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Explore questions about physics, chemistry, and biology',
    icon: '🔬',
    imageUrl: '/images/categories/science.jpg'
  }
]

// Custom render function
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { ...options })

export * from '@testing-library/react'
export { customRender as render }