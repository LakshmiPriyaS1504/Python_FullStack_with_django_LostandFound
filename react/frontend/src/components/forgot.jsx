import { useState } from "react";
import axios from "axios"
import './items.css'


function ForgotPage() {

    const [email, setEmail] = useState("")

    const handleusername = () => {
        alert(`Username sent to ${email}`)
    }

    const handleemail = async () => {
        await axios.post("http://127.0.0.1:8000/api/accounts/forgot/",{
            email:email
        })
        alert(`Password reset link sent to ${email}`)
    }

    return (
        <div className="auth-page">
            <div className="auth-box">
            <h3>Password reset page</h3>
            <input type="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <br/>
              

            <button onClick={handleemail}>
                Forgot Password?
            </button>
            </div>
        </div>
    )
}

export default ForgotPage