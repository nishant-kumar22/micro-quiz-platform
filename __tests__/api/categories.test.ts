import { GET } from '@/app/api/categories/route'

describe('/api/categories API Route', () => {
  it('returns successful response with categories', async () => {
    const response = await GET()
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })

  it('returns categories with correct structure', async () => {
    const response = await GET()
    const categories = await response.json()
    
    categories.forEach((category: any) => {
      expect(category).toHaveProperty('id')
      expect(category).toHaveProperty('name')
      expect(category).toHaveProperty('description')
      expect(category).toHaveProperty('icon')
      expect(category).toHaveProperty('imageUrl')
    })
  })

  it('includes all expected categories', async () => {
    const response = await GET()
    const categories = await response.json()
    
    const categoryIds = categories.map((c: any) => c.id)
    expect(categoryIds).toContain('history')
    expect(categoryIds).toContain('science')
    expect(categoryIds).toContain('math')
    expect(categoryIds).toContain('programming')
  })
})