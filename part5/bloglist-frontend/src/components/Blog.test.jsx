import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

const blog = {
  id: 'id',
  title: 'Component testing is done with react-testing-library',
  author: 'author',
  url: 'https://nonexistingdomain.com',
  user: {
    username: 'currentuser',
    id: 'userid'
  }
}
const user = {
  username: 'currentuser',
  token: 'token'
}
const updateBlog = vi.fn()
const removeBlog = vi.fn()

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} user={user} updateBlog={updateBlog} removeBlog={removeBlog} />)
  })

  test('renders title and author by default', () => {
    screen.getByText('Component testing is done with react-testing-library', { exact: false })
    screen.getByText('author', { exact: false })
  })

  test('does not render likes and url by default', () => {
    const likes = container.queryByTestId('likes')
    expect(likes).toBeFalsy()
    const url = container.queryByTestId('url')
    expect(url).toBeFalsy()
  })

  test('renders url and likes after hitting view button', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    container.getByTestId('likes')
    container.getByTestId('url')
  })

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})