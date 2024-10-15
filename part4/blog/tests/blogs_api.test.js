const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'title',
    author: 'famous author',
    url: 'http://website1.com',
    likes: 2,
  },
  {
    title: 'longer title',
    author: 'very famous author',
    url: 'http://website2.com',
    likes: 22,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())

  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.statusCode, 200)
  assert.match(response.type, /application\/json/)
})

test('there are two blog posts', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('the first blog has correct properties', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]

  assert.strictEqual(firstBlog.title, initialBlogs[0].title)
  assert.strictEqual(firstBlog.author, initialBlogs[0].author)
  assert.strictEqual(firstBlog.likes, initialBlogs[0].likes)
  assert.strictEqual(firstBlog.url, initialBlogs[0].url)
})

after(async () => {
  await mongoose.connection.close()
})
