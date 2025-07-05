import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import QuizInterface from '@/app/quiz/[category]/[id]/QuizInterface'
import { mockQuiz } from '../utils/testUtils'

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('QuizInterface Component', () => {
  beforeEach(() => {
    render(<QuizInterface quiz={mockQuiz} />)
  })

  it('renders quiz title and description', () => {
    expect(screen.getByText('Test Quiz')).toBeInTheDocument()
    expect(screen.getByText('A test quiz for unit testing')).toBeInTheDocument()
  })

  it('displays the first question', () => {
    expect(screen.getByText('What year did World War II end?')).toBeInTheDocument()
  })

  it('shows all answer options with correct labels', () => {
    expect(screen.getByText('A. 1944')).toBeInTheDocument()
    expect(screen.getByText('B. 1945')).toBeInTheDocument()
    expect(screen.getByText('C. 1946')).toBeInTheDocument()
    expect(screen.getByText('D. 1947')).toBeInTheDocument()
  })

  it('displays progress information', () => {
    expect(screen.getByText('Question 1 of 2')).toBeInTheDocument()
    expect(screen.getByText('50% Complete')).toBeInTheDocument()
  })

  it('allows selecting an answer', async () => {
    const user = userEvent.setup()
    const answerButton = screen.getByText('B. 1945')
    
    await user.click(answerButton)
    
    expect(answerButton).toHaveClass('border-blue-500')
  })

  it('enables submit button when answer is selected', async () => {
    const user = userEvent.setup()
    const answerButton = screen.getByText('B. 1945')
    
    await user.click(answerButton)
    
    const submitButton = screen.getByText('Submit Answer')
    expect(submitButton).toBeEnabled()
  })

  it('shows correct feedback for right answer', async () => {
    const user = userEvent.setup()
    
    // Select correct answer
    await user.click(screen.getByText('B. 1945'))
    await user.click(screen.getByText('Submit Answer'))
    
    // Check for correct feedback
    await waitFor(() => {
      expect(screen.getByText('✅ Correct!')).toBeInTheDocument()
      expect(screen.getByText(/World War II ended in 1945/)).toBeInTheDocument()
    })
  })

  it('shows incorrect feedback for wrong answer', async () => {
    const user = userEvent.setup()
    
    // Select wrong answer
    await user.click(screen.getByText('A. 1944'))
    await user.click(screen.getByText('Submit Answer'))
    
    // Check for incorrect feedback
    await waitFor(() => {
      expect(screen.getByText('❌ Incorrect')).toBeInTheDocument()
    })
  })
})