const Blog = require('../models/blog')
const User = require('../models/user')

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

const initialUser = {
  username: 'mluukkai',
  name: 'Matti Luukkainen',
  password: 'salainen',
}

const nonExistingId = async () => {
  const blog = new Blog({ 
    title: 'another title',
    author: 'author',
    url: 'http://website.com',
    likes: 12,
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})

  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

function allObjectsHaveId(array) {
    return array.every((obj) => 'id' in obj)
}

function hasObjectWithAttribute(array, attributeName, attributeValue) {
    return array.some((obj) => obj[attributeName] === attributeValue)
}

module.exports = {
    allObjectsHaveId,
    blogsInDb,
    hasObjectWithAttribute,
    initialBlogs,
    nonExistingId,
    usersInDb,
}