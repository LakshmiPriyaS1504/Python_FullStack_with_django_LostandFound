import { useNavigate } from 'react-router-dom'
import './home.css'
import { useState } from 'react'

function Home() {

  const navigate = useNavigate()

  const [search, setSearch] = useState('')


  return (

    <div className="home">

      <nav className="navbar">

        <h2 className="logo">
          Lost&Found
        </h2>


        <ul className="nav-links">

          <li onClick={() => navigate('/')}>
            Home
          </li>

          <li>
            <a href='#about'>
              About
            </a>
          </li>

        </ul>



        <div className="search-box">

          <input
            type="text"
            placeholder="Search items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="search-btn"
            onClick={() => navigate(`/search?query=${search}`)}
          >
            Search
          </button>

        </div>



        <button
          className="nav-btn"
          onClick={() => navigate('/login')}
        >
          Login
        </button>

      </nav>



      {/* Home Section */}

      <section id='home' className='hero'>

        <div className="overlay">

          <h1>
            Find Your Lost Items Easily
          </h1>

          <p>
            Report • Search • Recover
          </p>

          <div className="hero-buttons">

            <button className="primary-btn"
            onClick={() => navigate('/report')}>
              Report Item
            </button>

            <button className="secondary-btn">
              View Items
            </button>

          </div>

        </div>

      </section>



      {/* About Section */}

      <section id='about' className='about-section'>

        <h2>
          About Us
        </h2>

        <p>
          Lost&Found is a platform that helps users report,
          search and recover lost belongings easily and securely.
        </p>

      </section>

    </div>

  )
}

export default Home