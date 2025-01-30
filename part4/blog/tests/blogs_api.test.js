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

const mockUser = {
    username: 'root',
    password: 'password',
}
const initialUsers = [mockUser]

beforeEach(async () => {
    // seed test database
    await User.deleteMany({})

    for (let user of initialUsers) {
        const passwordHash = await bcrypt.hash(user.password, 10)
        let userObject = new User({ username: user.username, passwordHash })
        await userObject.save()
    }

    const users = await helper.usersInDb()
    const userId = users.find((user) => user.username === mockUser.username).id

    await Blog.deleteMany({})
    const initialBlogs = helper.initialBlogs.map((blog) => ({ ...blog, user: userId }))

    await Blog.insertMany(initialBlogs)
})

describe('after successful login', () => {
    let token

    beforeEach(async () => {
        // execute login before running tests
        const { username, password } = mockUser
        const loginResponse = await api.post('/api/login').send({ username, password })
        token = loginResponse.body.token
    })

    describe('get(/)', () => {
        test('blogs are returned as json', async () => {
            await api
                .get('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .expect(200)
                .expect('Content-Type', /application\/json/)
        })

        test('correct amount of blogs', async () => {
            const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

            assert.strictEqual(response.body.length, helper.initialBlogs.length)
        })

        test('blogs have id attribute', async () => {
            const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

            assert.strictEqual(helper.allObjectsHaveId(response.body), true)
        })

        test('blogs have correct properties', async () => {
            const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

            const firstBlog = helper.initialBlogs[0]
            const assertionsArray = ['title', 'author', 'url', 'likes'].map((attr) =>
                assert.strictEqual(helper.hasObjectWithAttribute(response.body, attr, firstBlog[attr]), true)
            )
        })
    })

    describe('post(/)', () => {
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
                .set('Authorization', `Bearer ${token}`)
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
                .set('Authorization', `Bearer ${token}`)
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
            const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`)

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
            const response = await api.post('/api/blogs').send(newBlog).set('Authorization', `Bearer ${token}`)

            assert.strictEqual(response.status, 400)
            assert(response.text, /validation failed/)
        })
    })

    describe('delete(/:id)', () => {
        test('deletes blog', async () => {
            const blogs = await helper.blogsInDb()
            const initialAmountOfBlogs = blogs.length

            const response = await api.delete(`/api/blogs/${blogs[0].id}`).set('Authorization', `Bearer ${token}`)

            assert.strictEqual(response.status, 200)
            assert.strictEqual((await helper.blogsInDb()).length, initialAmountOfBlogs - 1)
        })

        // test('returns deleted blog', async () => {
        //     const blogs = await helper.blogsInDb()
        //     const { id, title, author, url, likes } = blogs[0]

        //     const response = await api.delete(`/api/blogs/${id}`).set('Authorization', `Bearer ${token}`)

        //     assert.strictEqual(response.text.includes(title), true)
        //     assert.strictEqual(response.text.includes(author), true)
        //     assert.strictEqual(response.text.includes(url), true)
        //     assert.strictEqual(response.text.includes(likes), true)
        // })

        // test('returns error, if no id valid provided', async () => {
        //     const response = await api
        //         .delete('/api/blogs/67112821ce34933798533303')
        //         .set('Authorization', `Bearer ${token}`)

        //     assert.strictEqual(response.status, 404)
        //     assert.strictEqual(response.text, 'blog not found')
        // })
    })

    describe('put(/:id)', () => {
        test('updates blog attributes', async () => {
            const blog = {
                title: 'updated title',
                author: 'updated author',
                url: 'http://updatedwebsite.com',
                likes: 33,
            }
            const blogs = await helper.blogsInDb()
            const response = await api
                .put(`/api/blogs/${blogs[0].id}`)
                .send(blog)
                .set('Authorization', `Bearer ${token}`)
                .expect(200)

            assert.strictEqual(response.text.includes(blog.title), true)
            assert.strictEqual(response.text.includes(blog.author), true)
            assert.strictEqual(response.text.includes(blog.url), true)
            assert.strictEqual(response.text.includes(blog.likes), true)
        })

        test('returns error, if no id provided', async () => {
            await api.put('/api/blogs/').send({}).set('Authorization', `Bearer ${token}`).expect(404)
        })

        test('returns error, if no valid id provided', async () => {
            await api
                .put('/api/blogs/67112821ce34933798533303')
                .send({})
                .set('Authorization', `Bearer ${token}`)
                .expect(404)
        })
    })
})

after(async () => {
  await mongoose.connection.close()
})
