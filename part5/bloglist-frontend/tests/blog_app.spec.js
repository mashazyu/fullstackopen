import { test, expect } from '@playwright/test'
import { createBlog, loginWith } from './helper'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
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

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'short title', 'john doe', 'https://www.nonexist.ent')

      await expect(page.getByText('short title john doe')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await createBlog(page, 'new title', 'jack sparrow', 'https://www.ent.non')
      await page.getByRole('button', { name: /view/i }).click()
      await page.getByRole('button', { name: /like/i }).click()

      await expect(page.getByText(/likes 1/)).toBeVisible()
    })

    test('user who added the blog can delete the blog', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept())
      await createBlog(page, 'new title', 'jack sparrow', 'https://www.ent.non')
      await page.getByRole('button', { name: /view/i }).click()
      await page.getByRole('button', { name: /remove/i }).click()

      await expect(page.getByText('new title jack sparrow')).not.toBeVisible()
    })

    test('only the user who added the blog sees the blogs delete button', async ({ page, request }) => {
      await createBlog(page, 'new title', 'jack sparrow', 'https://www.ent.non')

      await request.post('/api/users', {
        data: {
          name: 'New User',
          username: 'newuser',
          password: 'unknownunicorn'
        }
      })
      await page.getByRole('button', { name: /log out/i }).click()
      await loginWith(page, 'newuser', 'unknownunicorn')

      await page.getByRole('button', { name: /view/i }).click()
      await expect(page.getByRole('button', { name: /remove/i })).not.toBeVisible()
    })
  })
})