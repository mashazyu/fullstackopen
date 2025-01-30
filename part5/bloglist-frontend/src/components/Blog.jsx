import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [fullDetails, setFullDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const buttonLabel = fullDetails ? "hide" : "view"
  const handleDetailsVisibility = () => setFullDetails(!fullDetails)
  const handleLike = () => {
    updateBlog({
      ...blog,
      likes: Number(blog.likes) + 1
    })
  }

  return (
    <div style={blogStyle}>
      <div>
        <div>{blog.title} {blog.author} <button onClick={handleDetailsVisibility}>{buttonLabel}</button></div>
        {fullDetails && (
          <div> 
            {blog.url}
            <div>likes {blog.likes} <button onClick={handleLike}>like</button></div>
            {blog.user?.username}
          </div>
        )}
      </div>
  </div>
)}

export default Blog