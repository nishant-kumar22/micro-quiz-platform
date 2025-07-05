import { GET } from '@/app/api/quiz/[category]/[id]/route'

describe('/api/quiz/[category]/[id] API Route', () => {
  it('returns quiz data for valid parameters', async () => {
    const mockRequest = new Request('http://localhost/api/quiz/history/1')
    const mockParams = { category: 'history', id: '1' }
    
    const response = await GET(mockRequest, { params: mockParams })
    
    if (response.status === 200) {
      const quiz = await response.json()
      
      expect(quiz).toHaveProperty('id')
      expect(quiz).toHaveProperty('title')
      expect(quiz).toHaveProperty('description')
      expect(quiz).toHaveProperty('category')
      expect(quiz).toHaveProperty('questions')
      expect(Array.isArray(quiz.questions)).toBe(true)
    }
  })

  it('returns 404 for invalid category', async () => {
    const mockRequest = new Request('http://localhost/api/quiz/invalid/1')
    const mockParams = { category: 'invalid', id: '1' }
    
    const response = await GET(mockRequest, { params: mockParams })
    
    expect(response.status).toBe(404)
  })

  it('returns 404 for invalid quiz id', async () => {
    const mockRequest = new Request('http://localhost/api/quiz/history/999')
    const mockParams = { category: 'history', id: '999' }
    
    const response = await GET(mockRequest, { params: mockParams })
    
    expect(response.status).toBe(404)
  })
})