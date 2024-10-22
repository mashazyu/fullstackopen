const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')

    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }

    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const id = request.params.id

    if (!id) {
        response.status(404).send({ error: 'malformatted id' })
    }

    const blog = await Blog.findById(id)

    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        ...request.body,
        user: user.id,
    })

    const newBlog = await blog.save()

    user.blogs = user.blogs.concat(newBlog.id)
    await user.save()

    response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findByIdAndDelete(id)

    if (!blog) {
        return response.status(404).send('blog not found')
    }

    response.json(blog)
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const { author, title, url, likes } = request.body
    const newBlogObject = { author, title, url, likes }
    const params = { new: true, runValidators: true }

    try {
        const blog = await Blog.findByIdAndUpdate(id, newBlogObject, params)
        // if document is not found by id, result equals null
        if (!blog) {
            return response.status(404).send('blog not found')
        }

        response.json(blog)
    } catch (error) {
        response.status(400).json({ message: error.message })
    }
})

module.exports = blogsRouter
