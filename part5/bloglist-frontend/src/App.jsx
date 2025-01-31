import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'

const App = () => {
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  return (
    <div>
      {message && <p>{message}</p>}
      {user === null ?
        <LoginForm setUser={setUser} setMessage={setMessage}/> :
        <>
          <BlogList user={user} setUser={setUser} setMessage={setMessage} />
        </>
      }
    </div>
  )
}

export default App