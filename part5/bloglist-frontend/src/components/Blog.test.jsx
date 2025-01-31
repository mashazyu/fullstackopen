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

describe('<Togglable />', () => {
  let container

  beforeEach(() => {
    container = render(< Blog blog={blog} user={user}/>)
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
})