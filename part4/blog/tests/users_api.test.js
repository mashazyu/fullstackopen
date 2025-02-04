const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('password', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map((u) => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message, if username is taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(response.body.error.includes('expected `username` to be unique'))

        const usersAtEnd = await helper.usersInDb()

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation fails with proper statuscode and message, if username is missing', async () => {
        const newUser = {
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('Path `username` is required'))
    })

    test('creation fails with proper statuscode and message, if username is too short', async () => {
        const newUser = {
            username: 'ab',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('Username must be at least 3 characters long'))
    })

    test('creation fails with proper statuscode and message, if password is missing', async () => {
        const newUser = {
            name: 'Superuser',
            username: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        assert(result.body.error.includes('Path `password` is required'))
    })

    test('get request returns 1 user and correct status code and content type', async () => {
        const result = await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(result.body.length, 1)
    })
})

after(async () => {
    await mongoose.connection.close()
})
  