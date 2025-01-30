import { useState, useEffect } from 'react'

import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import blogService from './services/blogs'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null) 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogOut = () => {
    window.localStorage.removeItem('user')
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>
      {user === null ?
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage}/> :
        <>
          <BlogList user={user} />
          <button onClick={handleLogOut}>log out</button>
        </>
      }
    </div>
  )
}

export default App