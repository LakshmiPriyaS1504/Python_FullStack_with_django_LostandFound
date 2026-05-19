import axios from "axios"
import './items.css'
import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function ViewItems() {

  const navigate = useNavigate()

  const location = useLocation()

  const [items, setItems] = useState([])

  const [claims, setClaims] = useState([])

  const token = localStorage.getItem("token")

  const userId = localStorage.getItem('user_id')

  const query =
    new URLSearchParams(location.search)
    .get('query')

  useEffect(() => {

    fetchItems()

    fetchClaims()

  }, [])



  const fetchItems = () => {

    axios.get(
      'http://127.0.0.1:8000/api/items/item/',
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )

    .then((response) => {

      setItems(response.data)

    })

    .catch((error) => {

      console.log(error.response?.data || error.message)

    })
  }



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

      setClaims(response.data)

    })

    .catch((error) => {

      console.log(error.response?.data || error.message)

    })
  }



  const deleteItem = (id) => {

    const confirmDelete = window.confirm(
      "Sure you want to delete?"
    )

    if (!confirmDelete) return

    axios.delete(
      `http://127.0.0.1:8000/api/item/${id}/`,
      {
        headers: {
          Authorization: `Token ${token}`
        }
      }
    )

    .then(() => {

      setItems(
        items.filter((item) => item.id !== id)
      )

    })

    .catch((error) => {

      console.log(
        error.response?.data
      )

    })
  }



  const handleEdit = (item) => {

    navigate('/report', {
      state: {
        item
      }
    })
  }



  const handleSearch = (search) => {

    navigate(`/search?query=${search}`)

  }



  const filteredItems = items.filter((item) => {

    const searchText =
      query?.toLowerCase() || ''

    return (

      item.name?.toLowerCase()
      .includes(searchText)

      ||

      item.category?.toLowerCase()
      .includes(searchText)

    )

  })



  return (

    <div className="items-page">

      <h1 className="items-title">
        Lost and Found Items
      </h1>

      <table className="items-table">

        <thead>

          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Location</th>
            <th>Description</th>
            <th>Delete</th>
            <th>Edit</th>
            <th>Claim</th>
          </tr>

        </thead>

        <tbody>

          {
            filteredItems.map((item) => (

              <tr key={item.id}>

                <td>{item.name}</td>

                <td>{item.category}</td>

                <td>{item.location}</td>

                <td>{item.description}</td>

                <td>

                  {
                    item.user == Number(userId) && (

                      <button
                        className="delete-btn"
                        onClick={() => deleteItem(item.id)}
                      >
                        Delete
                      </button>

                    )
                  }

                </td>

                <td>

                  {
                    item.user == Number(userId) && (

                      <button
                        className="delete-btn"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>

                    )
                  }

                </td>

                <td>

                  {

                    item.user === Number(userId) ? (

                      <button
                        className="claim-btn"
                        onClick={() =>
                          navigate('/claims', {
                            state: { item }
                          })
                        }
                      >
                        View Claims
                      </button>

                    ) : (

                      (() => {

                        const userClaim = claims.find(

                          (c) =>

                            c.item === item.id &&

                            c.claimant === Number(userId)

                        )



                        if (userClaim) {

                          return (

                            <p>

                              {userClaim.status}

                            </p>

                          )
                        }



                        return (

                          <button
                            className="claim-btn"
                            onClick={() =>
                              navigate('/claim', {
                                state: { item }
                              })
                            }
                          >
                            Claim
                          </button>

                        )

                      })()

                    )

                  }

                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  )
}

export default ViewItems