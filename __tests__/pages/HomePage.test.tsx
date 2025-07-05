import { render, screen, waitFor } from '@testing-library/react'
import Home from '@/app/page'
import { mockCategories } from '../utils/testUtils'

// Mock the fetch function
global.fetch = jest.fn()

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe('Home Page', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockCategories,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the main heading', async () => {
    render(await Home())
    
    expect(screen.getByText('Micro Quiz')).toBeInTheDocument()
    expect(screen.getByText('Available Quiz Categories')).toBeInTheDocument()
  })

  it('displays quiz categories', async () => {
    render(await Home())
    
    await waitFor(() => {
      expect(screen.getByText('History')).toBeInTheDocument()
      expect(screen.getByText('Science')).toBeInTheDocument()
    })
  })

  it('shows category descriptions', async () => {
    render(await Home())
    
    await waitFor(() => {
      expect(screen.getByText('Test your knowledge of historical events')).toBeInTheDocument()
      expect(screen.getByText('Explore questions about physics, chemistry, and biology')).toBeInTheDocument()
    })
  })

  it('has working navigation links', async () => {
    render(await Home())
    
    await waitFor(() => {
      const historyLink = screen.getByRole('link', { name: /History/i })
      expect(historyLink).toHaveAttribute('href', '/quiz/history')
    })
  })
})