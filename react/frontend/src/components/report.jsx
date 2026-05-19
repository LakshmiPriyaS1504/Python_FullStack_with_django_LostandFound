import { useState } from "react"

import axios from "axios"

import './items.css'

import {
  useNavigate,
  useLocation
} from "react-router-dom"


function AddItems() {

  const navigate = useNavigate()

  const locationData = useLocation()

  const editItem = locationData.state?.item


  const [name, setName] = useState(
    editItem?.name || ''
  )

  const [category, setCategory] = useState(
    editItem?.category || ''
  )

  const [location, setLocation] = useState(
    editItem?.location || ''
  )

  const [description, setDescription] = useState(
    editItem?.description || ''
  )


  const addItem = async () => {

    const token = localStorage.getItem('token')

    if (!name || !category || !location) {

      alert("Please fill required fields")

      return
    }

    try {

      if (editItem) {

        await axios.patch(
          `http://127.0.0.1:8000/api/items/item/${editItem.id}/`,
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

        alert("Item Updated Successfully")
      }

      else {

        await axios.post(
          "http://127.0.0.1:8000/api/items/report/",
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
      }


      setName('')
      setCategory('')
      setLocation('')
      setDescription('')

      navigate('/items')

    }

    catch (error) {

      console.log(error.response?.data || error.message)

      alert("Operation Failed")
    }
  }


  return (

    <div className="items-page">

      <div className="form-box">

        <h1 className="items-title">

          {
            editItem
              ? "Edit Item"
              : "Add Item"
          }

        </h1>


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

          <option value="">
            Select Category
          </option>

          <option value="Electronics">
            Electronics
          </option>

          <option value="ID Card">
            ID Card
          </option>

          <option value="Bag">
            Bag
          </option>

          <option value="Books">
            Books
          </option>

          <option value="Others">
            Others
          </option>

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


        <button
          className="add-btn"
          onClick={addItem}
        >

          {
            editItem
              ? "Update Item"
              : "Add Item"
          }

        </button>

      </div>

    </div>
  )
}

export default AddItems