import { useNavigate } from 'react-router-dom'
import './home.css'

import {
  useState,
  useEffect
} from 'react'

import axios from 'axios'


function Home() {

  const navigate = useNavigate()

  const [search, setSearch] = useState('')

  const token = localStorage.getItem('token')

  const [profile, setProfile] = useState(null)


  useEffect(() => {

    if (token) {

      axios.get(
        'http://127.0.0.1:8000/api/profile/',
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      )

      .then((response) => {

        setProfile(response.data)

      })

      .catch((error) => {

        console.log(error.response?.data || error.message)

      })
    }

  }, [])


  const checkLogin = (path) => {

    if (token) {

      navigate(path)

    } else {

      alert('Please login first')

      navigate('/login')
    }
  }


  const handleLogout = () => {

    localStorage.removeItem('token')

    alert('Logged out successfully')

    navigate('/login')
  }


  return (

    <div className="home">

      {/* Navbar */}
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


        {
          profile && (

            <div className="profile-container">

              <button className="profile-btn">
                {profile.username}
              </button>

              <div className="profile-dropdown">

                <p>Username: {profile.username}</p>
                <p>Phone: {profile.phone}</p>

              </div>

            </div>
          )
        }


        {
          token ? (

            <button
              className="nav-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          ) : (

            <button
              className="nav-btn"
              onClick={() => navigate('/login')}
            >
              Login
            </button>

          )
        }

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

            <button
              className="primary-btn"
              onClick={() => checkLogin('/report')}
            >
              Report Item
            </button>

            <button
              className="secondary-btn"
              onClick={() => checkLogin('/items')}
            >
              View Items
            </button>

          </div>

        </div>

      </section>


     <section id='about' className='about-section'>

  <div className="about-container">

    <h2>About Us</h2>

    <p className="about-intro">
      Lost&Found is a platform designed to make recovering lost belongings simple,
      fast, and secure. We connect people who lose items with those who find them.
    </p>

    <div className="about-grid">

      <div className="about-card">
        <h3>🔍 Easy Search</h3>
        <p>Quickly search through reported lost and found items.</p>
      </div>

      <div className="about-card">
        <h3>🔐 Secure System</h3>
        <p>Your data is safe and only visible to authenticated users.</p>
      </div>

    </div>

  </div>

</section>


      <footer className="footer">


          <p className="copyright">
            © {new Date().getFullYear()} Lost&Found. All rights reserved.
          </p>

        

      </footer>

    </div>
  )
}

export default Home