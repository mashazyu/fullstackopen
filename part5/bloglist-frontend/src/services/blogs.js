import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}
const getConfig = () => ({
  headers: { Authorization: token },
})

const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig())

  return response.data
}

const create = async blog => {
  const response = await axios.post(baseUrl, blog, getConfig())

  return response.data
}

const update = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, getConfig())

  return response.data
}

const remove = async blog => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, getConfig())

  return response.data
}

export default { create, getAll, setToken, remove, update }