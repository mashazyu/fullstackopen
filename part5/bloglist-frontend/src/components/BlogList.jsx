import { useRef, useState, useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const BlogList = ({ user, setUser, setMessage }) => {
  const [blogs, setBlogs] = useState([])
  const [isSorted, setIsSorted] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    async function fetchData() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchData()
  }, [])

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)

      const updatedBlogs = [...blogs]
      updatedBlogs.push(newBlog)
      setBlogs(updatedBlogs)

      const message = `blog ${newBlog.title} by ${newBlog.author} was added`
      setMessage(message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Could not create blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    blogService.setToken(null)
  }

  const updateBlog = async (blog) => {
    try {
      const newBlog = await blogService.update(blog)
      const updatedBlogs = [...blogs]
      updatedBlogs.forEach(blog => {
        if (blog.id === newBlog.id) {
          blog.likes = newBlog.likes
        }
      })
      setBlogs(updatedBlogs)

      const message = `blog ${newBlog.title} by ${newBlog.author} was updated`
      setMessage(message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Could not update blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async (blog) => {
    try {
      const removedBlog = await blogService.remove(blog)
      const updatedBlogs = [...blogs].filter(({ id }) => (id !== removedBlog.id))

      setBlogs(updatedBlogs)

      const message = `blog ${blog.title} by ${blog.author} was removed`
      setMessage(message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Could not remove blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleSort = () => setIsSorted(!isSorted)
  const blogsToDisplay = isSorted ? [...blogs].sort((a, b) => (Number(b.likes ? b.likes : 0) - Number(a.likes ? a.likes : 0))) : blogs

  return (
    <>
      <h2>blogs</h2>
      <>
        <>{user.username} logged in</>
        <button onClick={handleLogOut}>log out</button>
      </>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm blogs={blogs} setBlogs={setBlogs} createBlog={createBlog} />
      </Togglable>
      <button onClick={handleSort}>{isSorted ? 'unsort' : 'sort'}</button>
      {blogsToDisplay.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} user={user} />
      )}
    </>
  )
}

export default BlogList