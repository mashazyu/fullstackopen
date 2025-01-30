import { useRef, useState, useEffect } from 'react'
import Blog from './Blog'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const BlogList = ({ user, setUser, setMessage }) => {
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const blogFormRef = useRef()

    useEffect(() => {
        async function fetchData() {
            const blogs = await blogService.getAll()
            setBlogs(blogs)
        }
        fetchData(); 
    }, [])

    const handleCreateBlog = async (event) => {
        event.preventDefault()

        try {
            const blog = await blogService.create({ title, author, url })
            const updatedBlogs = [...blogs]
            updatedBlogs.push(blog)

            const message = `blog ${title} by ${author} was added`
            setMessage(message)
            setBlogs(updatedBlogs)
            setAuthor('')
            setTitle('')
            setUrl('')
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

    const createBlogForm = () => (
        <form onSubmit={handleCreateBlog}>
            <h2>login to application</h2>
            <div>
                title
                <input
                type="text"
                value={title}
                name="Title"
                onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <input
                type="text"
                value={author}
                name="Author"
                onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
                <input
                type="url"
                value={url}
                name="URL"
                onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create blog</button>
        </form>   
    )

    return (
        <>
            <h2>blogs</h2>
            <>
                <>{user.username} logged in</>
                <button onClick={handleLogOut}>log out</button>
            </>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                {createBlogForm()}
            </Togglable>
            
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </>
    )
}

export default BlogList