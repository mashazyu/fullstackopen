import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

const createBlog = vi.fn()

describe('<BlogForm />', () => {
  let container

  beforeEach(() => {
    container = render(<BlogForm createBlog={createBlog} />).container
  })

  test('form calls the event handler with the right details', async () => {
    const user = userEvent.setup()
    const titleInput = container.querySelector('input[name="Title"]')
    const authorInput = container.querySelector('input[name="Author"]')
    const urlInput = container.querySelector('input[name="URL"]')
    const button = screen.getByText('create blog')

    await user.type(titleInput, 'short title')
    await user.type(authorInput, 'new author')
    await user.type(urlInput, 'https://www.blabla.lala')
    await user.click(button)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('short title')
    expect(createBlog.mock.calls[0][0].author).toBe('new author')
    expect(createBlog.mock.calls[0][0].url).toBe('https://www.blabla.lala')
  })
})