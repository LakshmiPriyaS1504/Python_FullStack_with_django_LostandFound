import { useParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import './items.css'

function ResetPassword() {

  const { uid, token } = useParams()
  const [password, setPassword] = useState("")

  const handleReset = async () => {
    await axios.post("http://127.0.0.1:8000/api/reset/", {
      uid,
      token,
      password
    })

    alert("Password reset successful")
  }

  return (
    <div className="auth-box">
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleReset}>
        Reset Password
      </button>
    </div>
  )
}

export default ResetPassword