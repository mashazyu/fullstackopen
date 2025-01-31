const jwt = require('jsonwebtoken')

const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

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

    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const user = await User.findById(request.user)
    const blog = new Blog({
        ...request.body,
        user: user.id,
    })
    const newBlog = await blog.save()
    // update list of blogs assigned to the user
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()

    response.status(201).json({
        ...request.body,
        id: newBlog._id,
        user
    })
})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)

    if (!blog) {
        return response.status(404).send('blog not found')
    }

    if (request.user.toString() !== blog.user.toString()) {
        return response.status(401).send('user is not authorized to delete blog')
    }

    const deletedBlog = await Blog.findByIdAndDelete(id)

    response.json(deletedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id
    const blog = await Blog.findById(id)

    if (!blog) {
        return response.status(404).send('blog not found')
    }

    if (request.user.toString() !== blog.user.toString()) {
        return response.status(401).send('user is not authorized to delete blog')
    }

    const { author, title, url, likes } = request.body
    const newBlogObject = { author, title, url, likes }
    const params = { new: true, runValidators: true }
    const updatedBlog = await Blog.findByIdAndUpdate(id, newBlogObject, params)

    response.json(updatedBlog)
})

module.exports = blogsRouter
