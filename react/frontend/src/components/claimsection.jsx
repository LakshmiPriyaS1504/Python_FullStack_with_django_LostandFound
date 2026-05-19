import { useLocation , useNavigate} from "react-router-dom"
import { useState } from "react"
import axios from "axios"

function ClaimPage() {

  const location = useLocation()
  const navigate = useNavigate()

  const item = location.state?.item

  const [proof, setProof] = useState('')

  const token = localStorage.getItem('token')

const [contact, setContact] = useState('')
  const submitClaim = async () => {

    try {

      await axios.post(
        'http://127.0.0.1:8000/api/claim/',
        {
          item: item.id,
          proof: proof,
          contact:'contact'
        },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )

      alert('Claim submitted')
      navigate('/items')
    }

    catch (error) {

      console.log(error.response?.data)

      alert('Claim failed')
    }
  }


  return (

    <div className="items-page">

      <div className="form-box">

        <h1  className="items-title">Claim Item</h1>

        <p>
          Item: {item.name}
        </p>
         <p>
            contact details: {item.owner_email}
        </p>

        <textarea
          placeholder="Enter proof/details"
          value={proof}
          onChange={(e) =>
            setProof(e.target.value)
          }
        />

        <textarea
          placeholder="Enter your contact details."
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          />

        <button onClick={submitClaim}>

          Submit Claim

        </button>

      </div>

    </div>
  )
}

export default ClaimPage