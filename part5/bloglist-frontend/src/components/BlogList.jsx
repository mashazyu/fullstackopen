import { useRef, useState, useEffect } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const BlogList = ({ user, setUser, setMessage }) => {
    const [blogs, setBlogs] = useState([])
    const blogFormRef = useRef()

    useEffect(() => {
        async function fetchData() {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        fetchData(); 
    }, [])

    const createBlog = async (blog) => {
        try {
            const newBlog = await blogService.create(blog)
            const updatedBlogs = [...blogs]
            updatedBlogs.push(newBlog)
            setBlogs(updatedBlogs)

            const message = `blog ${title} by ${author} was added`
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
            
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </>
    )
}

export default BlogList