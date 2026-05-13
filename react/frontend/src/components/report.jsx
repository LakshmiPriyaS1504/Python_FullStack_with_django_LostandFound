import { useState } from "react"
import axios from "axios"
import './items.css'
import { useNavigate } from "react-router-dom"

function AddItems() {

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

  const addItem = async () => {

    const token = localStorage.getItem('token')

    if (!name || !category || !location) {
      alert("Please fill required fields")
      return
    }

    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/report/",
        {
          name,
          category,
          location,
          description
        },
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )

      alert("Item Added Successfully")

      // clear form
      setName('')
      setCategory('')
      setLocation('')
      setDescription('')

      navigate('/items')

      console.log(response.data)

    } catch (error) {
      console.log(error.response?.data || error.message)
      alert("Failed to add item")
    }
  }

  return (
    <div className="items-page">

      <div className="form-box">

        <h1 className="items-title">Add Item</h1>

        <input
          type="text"
          placeholder="Enter Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="ID Card">ID Card</option>
          <option value="Bag">Bag</option>
          <option value="Books">Books</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button className="add-btn" onClick={addItem}>
          Add Item
        </button>

      </div>

    </div>
  )
}

export default AddItems