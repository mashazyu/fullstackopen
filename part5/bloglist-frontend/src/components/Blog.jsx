import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [fullDetails, setFullDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const buttonLabel = fullDetails ? 'hide' : 'view'
  const handleDetailsVisibility = () => setFullDetails(!fullDetails)
  const handleLike = () => {
    updateBlog({
      ...blog,
      likes: blog.likes ? Number(blog.likes) + 1 : 1
    })
  }
  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog)
    }
  }
  const currentUserIsAuthor = blog.user?.username && (blog.user.username === user.username)

  return (
    <div style={blogStyle}>
      <div>
        <div>{blog.title} {blog.author} <button onClick={handleDetailsVisibility}>{buttonLabel}</button></div>
        {fullDetails && (
          <div>
            <span data-testid="url">{blog.url}</span>
            <div data-testid="likes">likes {blog.likes} <button onClick={handleLike}>like</button></div>
            {blog.user?.username}
            {currentUserIsAuthor && (<div><button onClick={handleRemove}>remove</button></div>)}
          </div>
        )}
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog