require('dotenv').config()

const express = require('express')
const morgan = require('morgan') // logger
const cors = require('cors')

const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const Person = require('./models/person')

const app = express()

app.use(cors())
// serve static frontend content
app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
// custom logger configuration
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/', (request, response) => {
  response.send('<h1>Server is up and running</h1>')
})

app.get('/api/info', (request, response, next) => {
  Person.countDocuments({})
    .then((count) => {
      const dateTime = new Date().toString()
      let info = `<p>Phonebook has info for ${count} people</p>
    <p>${dateTime}</p>`

      response.send(info)
    })
    .catch((error) => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((data) => response.json(data))
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const person = new Person({
    name: request.body.name,
    number: request.body.number,
  })

  person
    .save()
    .then((data) => response.json(data))
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  if (id) {
    Person.findById(id)
      .then((data) => {
        if (data) {
          response.json(data)
        } else {
          response.status(404).end()
        }
      })
      .catch((error) => next(error))
  } else {
    response.status(404).send({ error: 'malformatted id' })
  }
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const name = request.body.name
  const number = request.body.number

  if (!name || !number) {
    response.status(400).send({ error: 'no info provided' })
  }

  const personObject = { name, number }
  const params = { new: true, runValidators: true }

  if (id) {
    Person.findByIdAndUpdate(id, personObject, params)
      .then(() => response.json({ ...personObject, id: id }))
      .catch((error) => next(error))
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  if (id) {
    Person.findByIdAndDelete(id)
      .then((data) => response.json(data))
      .catch((error) => next(error))
  } else {
    response.status(404).send({ error: 'no id provided' })
  }
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
