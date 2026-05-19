import './Auth.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {

    axios.post('http://127.0.0.1:8000/api/items/login/', {
      username,
      password
    })
    .then((response) => {

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user_id', response.data.user_id)

      alert('Login successful')

      navigate('/')

    })
    .catch((error) => {

      console.log(error)

      if (error.response?.data?.error) {
        alert(error.response.data.error)
      } else {
        alert('Server error or network issue')
      }

    })

  }

  return (
    <div className="auth-page">

      <div className="auth-box">

        <h1>Welcome</h1>

        <p>Login to continue</p>

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="auth-btn"
          onClick={handleLogin}
        >
          Login
        </button>

        <p>
          Forgot{' '}
          <span
            onClick={() => navigate('/forgot')}
            style={{ cursor: 'pointer', color: 'blue' }}
          >
            password?
          </span>
        </p>

        <button
          className="register-btn"
          onClick={() => navigate('/register')}
        >
          Register
        </button>

      </div>

    </div>
  )
}

export default Login