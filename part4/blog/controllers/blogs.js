const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { title, url } = request.body

  if (!title || !url) {
    return response.status(400).send('Bad Request')
  }

  const blog = new Blog(request.body)
  const result = await blog.save()

  response.status(201).json(result)
})

module.exports = blogsRouter