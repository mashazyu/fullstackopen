import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
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

  const container = render(< Blog blog={blog} user={user}/>)

  const title = screen.getByText('Component testing is done with react-testing-library', { exact: false })
  expect(title).toBeDefined()
  const author = screen.getByText('author', { exact: false })
  expect(author).toBeDefined()
  const likes = container.queryByTestId('likes')
  expect(likes).toBeFalsy()
  const url = container.queryByTestId('url', { exact: false })
  expect(url).toBeFalsy()
})