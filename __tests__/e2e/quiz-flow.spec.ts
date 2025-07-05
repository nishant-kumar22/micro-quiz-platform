import { test, expect } from '@playwright/test'

test.describe('Complete Quiz Flow', () => {
  test('user can complete a full quiz', async ({ page }) => {
    // Start at homepage
    await page.goto('/')
    
    // Verify homepage loads
    await expect(page.getByText('Micro Quiz')).toBeVisible()
    await expect(page.getByText('Available Quiz Categories')).toBeVisible()
    
    // Click on a category
    await page.getByText('History').click()
    
    // Verify category page loads
    await expect(page.getByText('History Quizzes')).toBeVisible()
    
    // Click on first quiz
    await page.locator('[href*="/quiz/history/"]').first().click()
    
    // Verify quiz starts
    await expect(page.getByText('Question 1 of')).toBeVisible()
    
    // Select an answer
    await page.getByText('A.').first().click()
    
    // Submit answer
    await page.getByText('Submit Answer').click()
    
    // Verify feedback appears
    await expect(page.locator('text=/✅ Correct!|❌ Incorrect/')).toBeVisible()
    
    // Continue to next question (if available)
    const nextButton = page.getByText('Next Question')
    if (await nextButton.isVisible()) {
      await nextButton.click()
    }
  })

  test('responsive design works on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Navigate to homepage
    await page.goto('/')
    
    // Verify mobile layout
    await expect(page.getByText('Micro Quiz')).toBeVisible()
    
    // Test category selection on mobile
    await page.getByText('History').click()
    await expect(page.getByText('History Quizzes')).toBeVisible()
  })
})