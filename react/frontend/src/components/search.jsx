
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios"
import './search.css'

function Search() {

  const [items, setItems] = useState([])

  const location = useLocation()

  const query =
    new URLSearchParams(location.search).get('query')


  useEffect(() => {

    axios.get('http://127.0.0.1:8000/api/item/')

    .then((response) => {

      const filteredItems =
        response.data.filter((item) => {

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

      setItems(filteredItems)

    })

    .catch((error) => {

      console.log(error)

    })

  }, [query])


  return (

    <div className="search-page">

      <h1 className="search-title">
        Search Results
      </h1>


      <div className="search-container">

        {
          items.map((item) => (

            <div
              className="search-card"
              key={item.id}
            >

              <h2>{item.name}</h2>

              <p>
                Category: {item.category}
              </p>

              <p>
                Location: {item.location}
              </p>

              <span className="status-badge">
                {item.status}
              </span>

            </div>

          ))
        }

      </div>

    </div>

  )
}

export default Search

