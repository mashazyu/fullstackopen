const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

function allObjectsHaveId(array) {
    return array.every((obj) => 'id' in obj)
}

function hasObjectWithAttribute(array, attributeName, attributeValue) {
    return array.some((obj) => obj[attributeName] === attributeValue)
}

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
    const promiseArray = blogObjects.map((blog) => blog.save())

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', passwordHash })

    await Promise.all([...promiseArray, user.save()])
})

describe.skip('get(/)', () => {
    test('all initial posts are saved in DB', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs have id attribute', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(allObjectsHaveId(response.body), true)
    })

    test('all blogs have correct properties', async () => {
        const response = await api.get('/api/blogs')
        const firstBlog = helper.initialBlogs[0]
        const assertionsArray = ['title', 'author', 'url', 'likes'].map((attr) =>
            assert.strictEqual(hasObjectWithAttribute(response.body, attr, firstBlog[attr]), true)
        )

        await Promise.all(assertionsArray)
    })
})

describe.skip('post(/)', () => {
    test('a valid blog can be added ', async () => {
        const users = await helper.usersInDb()
        const newBlog = {
            title: 'very long title',
            author: 'the most famous author',
            url: 'http://website22.com',
            likes: 222,
            userId: users[0].id,
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
        const users = await helper.usersInDb()
        const newBlog = {
            title: 'very long title',
            author: 'the most famous author',
            url: 'http://website22.com',
            userId: users[0].id,
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
        const users = await helper.usersInDb()
        const newBlog = {
            author: 'the most famous author',
            url: 'http://website22.com',
            userId: users[0].id,
        }
        const response = await api.post('/api/blogs').send(newBlog)

        assert.strictEqual(response.status, 400)
        assert(response.text, /validation failed/)
    })

    test('if url prop is missing, return 400 bad request', async () => {
        const users = await helper.usersInDb()
        const newBlog = {
            title: 'very long title',
            author: 'the most famous author',
            userId: users[0].id,
        }

        const response = await api.post('/api/blogs').send(newBlog)

        assert.strictEqual(response.status, 400)
        assert(response.text, /validation failed/)
    })
})

describe.skip('put(/:id)', () => {
    test('updates blog attributes', async () => {
        const blog = {
            title: 'updated title',
            author: 'updated author',
            url: 'http://updatedwebsite.com',
            likes: 33,
        }
        const blogs = await helper.blogsInDb()

        const response = await api.put(`/api/blogs/${blogs[0].id}`).send(blog)

        assert.strictEqual(response.status, 200)
        assert.strictEqual(response.text.includes(blog.title), true)
        assert.strictEqual(response.text.includes(blog.author), true)
        assert.strictEqual(response.text.includes(blog.url), true)
        assert.strictEqual(response.text.includes(blog.likes), true)
    })

    test('returns error, if no id provided', async () => {
        const response = await api.put('/api/blogs/').send({})

        assert.strictEqual(response.status, 404)
    })

    test('returns error, if no id valid provided', async () => {
        const response = await api.put('/api/blogs/67112821ce34933798533303').send({})

        assert.strictEqual(response.status, 404)
        assert.strictEqual(response.text, 'blog not found')
    })
})

describe.skip('delete(/:id)', () => {
    test('deletes blog', async () => {
        const blogs = await helper.blogsInDb()
        const initialAmountOfBlogs = blogs.length

        const response = await api.delete(`/api/blogs/${blogs[0].id}`)

        assert.strictEqual(response.status, 200)
        assert.strictEqual((await helper.blogsInDb()).length, initialAmountOfBlogs - 1)
    })

    test('returns deleted blog', async () => {
        const blogs = await helper.blogsInDb()
        const { id, title, author, url, likes } = blogs[0]

        const response = await api.delete(`/api/blogs/${id}`)

        assert.strictEqual(response.text.includes(title), true)
        assert.strictEqual(response.text.includes(author), true)
        assert.strictEqual(response.text.includes(url), true)
        assert.strictEqual(response.text.includes(likes), true)
    })

    test('returns error, if no id valid provided', async () => {
        const response = await api.delete('/api/blogs/67112821ce34933798533303')

        assert.strictEqual(response.status, 404)
        assert.strictEqual(response.text, 'blog not found')
    })
})

after(async () => {
  await mongoose.connection.close()
})
