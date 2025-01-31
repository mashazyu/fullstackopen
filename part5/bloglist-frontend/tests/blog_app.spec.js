import { test, expect } from '@playwright/test'
import { loginWith } from './helper'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/tests/reset')
    await request.post('/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('login to application')).toBeVisible()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: /login/i })).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
      await expect(page.getByText('mluukkai logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'tralala')
      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })
})