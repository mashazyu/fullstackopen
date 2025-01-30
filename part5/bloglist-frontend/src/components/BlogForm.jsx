import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async (event) => {
        event.preventDefault()

        createBlog({ title, author, url })
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
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
}

export default BlogForm