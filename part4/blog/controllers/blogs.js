const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

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
  const blog = new Blog(request.body)

  try {
    const result = await blog.save()

    response.status(201).json(result)
  } catch(error) {
    response.status(400).json({ message: error.message });
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findByIdAndDelete(id)

  if (!blog) {
    return response.status(404).send('blog not found' )
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
      return response.status(404).send('blog not found' )
    } 
    
    response.json(blog)
  } catch(error) {
    response.status(400).json({ message: error.message });
  }
})

module.exports = blogsRouter