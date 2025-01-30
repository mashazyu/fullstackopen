import { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const BlogList = ({user}) => {
    const [blogs, setBlogs] = useState([])
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )  

    }, [])

    const handleCreateBlog = async (event) => {
        event.preventDefault()

        blogService
            .create({ title, author, url })
            .then(blog => {
                const updatedBlogs = [...blogs]
                updatedBlogs.push(blog)

                setBlogs(updatedBlogs)
                setAuthor('')
                setTitle('')
                setUrl('')
            })
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

            {createBlogForm()}
            
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </>
    )
}

export default BlogList