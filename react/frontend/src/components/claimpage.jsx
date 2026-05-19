import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

function ClaimsPages() {

  const location = useLocation()

  const item = location.state?.item

  const [claims, setClaims] = useState([])

  const token = localStorage.getItem('token')


  useEffect(() => {

    fetchClaims()

  }, [])


  const fetchClaims = () => {

    axios.get(
      'http://127.0.0.1:8000/api/claim/',
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )

    .then((response) => {

      const filteredClaims =
        response.data.filter(
          (c) => c.item === item.id
        )

      setClaims(filteredClaims)

    })

    .catch((error) => {

      console.log(
        error.response?.data ||
        error.message
      )

    })
  }


  const updateClaimStatus = async (
    claimId,
    newStatus
  ) => {

    try {

      await axios.patch(
        `http://127.0.0.1:8000/api/claim/${claimId}/`,
        {
          status: newStatus
        },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )

      alert('Status updated')

      fetchClaims()

    }

    catch (error) {

      console.log(error.response?.data)

      alert('Update failed')
    }
  }


  return (

    <div className="items-page">

      <h1  className="items-title">
        Claims for {item.name}
      </h1>
       
      {

        claims.map((claim) => (

          <div
            key={claim.id}
            className="claim-card"
          >

            <p>

              <strong>
                Proof:
              </strong>

              {claim.proof}

            </p>

            <p>

              <strong>
                Status:
              </strong>

              {claim.status}

            </p>

            {

              claim.status === 'Pending' && (

                <div>

                  <button
                    onClick={() =>
                      updateClaimStatus(
                        claim.id,
                        'Accepted'
                      )
                    }
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateClaimStatus(
                        claim.id,
                        'Rejected'
                      )
                    }
                  >
                    Reject
                  </button>

                </div>

              )

            }

          </div>

        ))
      }

    </div>
  )
}

export default ClaimsPages