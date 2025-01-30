import { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'


const LoginForm = ({ setUser, setMessage }) => {
    const [username, setUsername] = useState('') 
    const [password, setPassword] = useState('') 

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
          const user = await loginService.login({
            username, password,
          })
          setUser(user)
          blogService.setToken(user.token)
          window.localStorage.setItem(
            'user', JSON.stringify(user)
          ) 
          setUsername('')
          setPassword('')
        } catch (exception) {
          setMessage('Wrong credentials')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
      }

    return (
        <form onSubmit={handleLogin}>
            <h2>login to application</h2>
            <div>
                username
                <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>   
    )
}

export default LoginForm