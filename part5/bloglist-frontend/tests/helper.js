const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: /new blog/i }).click()
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByRole('button', { name: /create blog/i }).click()
  await page.getByRole('button', { name: /cancel/i }).click()
}

const loginWith = async (page, username, password)  => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: /login/i }).click()
}

export { createBlog, loginWith }