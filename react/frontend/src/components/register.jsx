import './Auth.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async () => {
    setError('')

    // validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {

      const response = await axios.post(
        'http://127.0.0.1:8000/api/items/register/',
        {
          username: formData.username,
          email: formData.email,
          password: formData.password
        }
      )

      console.log(response.data)

      navigate('/login')

    } catch (error) {

      console.log(error.response?.data || error.message)

      setError(
        error.response?.data?.error || 'Registration failed'
      )
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-box">

        <p>Create an Account</p>

        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          Register
        </button>

      </div>

    </div>
  )
}

export default Register