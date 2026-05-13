import axios from "axios"
import './items.css'
import { useState, useEffect } from "react"

function ViewItems() {

  const [items, setItems] = useState([])

  const token = localStorage.getItem("token")

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = () => {
    axios.get(
      'http://127.0.0.1:8000/api/item/',
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


  const deleteItem = (id) => {

    const confirmDelete = window.confirm("Sure you want to delete?")

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
      setItems(items.filter((item) => item.id !== id))
    })
    .catch((error) => {
      console.log(error.response?.data || error.message)
    })
  }


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
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.location}</td>
                <td>{item.description}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item.id)}
                  >
                    Delete
                  </button>
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