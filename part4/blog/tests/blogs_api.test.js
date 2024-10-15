const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())

  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blog posts', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('the first blog has correct properties', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]

  assert.strictEqual(firstBlog.title, helper.initialBlogs[0].title)
  assert.strictEqual(firstBlog.author, helper.initialBlogs[0].author)
  assert.strictEqual(firstBlog.likes, helper.initialBlogs[0].likes)
  assert.strictEqual(firstBlog.url, helper.initialBlogs[0].url)
  assert.strictEqual(Object.keys(firstBlog).includes('id'), true)
})

test('a valid blog can be added ', async () => {
  const newBlog =  {
    title: 'very long title',
    author: 'the most famous author',
    url: 'http://website22.com',
    likes: 222,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlogs = await helper.blogsInDb()
  assert.strictEqual(updatedBlogs.length, helper.initialBlogs.length + 1)

  const lastSavedBlog = updatedBlogs.pop()
  assert.strictEqual(lastSavedBlog.title, newBlog.title)
  assert.strictEqual(lastSavedBlog.author, newBlog.author)
  assert.strictEqual(lastSavedBlog.likes, newBlog.likes)
  assert.strictEqual(lastSavedBlog.url, newBlog.url)
})

test('if no likes prop is provided, it will be set to 0', async () => {
  const newBlog =  {
    title: 'very long title',
    author: 'the most famous author',
    url: 'http://website22.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlogs = await helper.blogsInDb()
  const lastSavedBlog = updatedBlogs.pop()

  assert.strictEqual(lastSavedBlog.likes, 0)
})

test('if title prop is missing, return 400 bad request', async () => {
  const newBlog =  {
    author: 'the most famous author',
    url: 'http://website22.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)

  assert.strictEqual(response.status, 400)
  assert.deepStrictEqual(response.body, { error: true, message: 'Bad Request' })
})

test('if url prop is missing, return 400 bad request', async () => {
  const newBlog =  {
    title: 'very long title',
    author: 'the most famous author',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)

  assert.strictEqual(response.status, 400)
  assert.deepStrictEqual(response.body, { error: true, message: 'Bad Request' })
})

after(async () => {
  await mongoose.connection.close()
})
