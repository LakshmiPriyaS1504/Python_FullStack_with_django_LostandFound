import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
import Items from './components/itemsviewpage'
import Search from './components/Search'
import ViewItems from './components/itemsviewpage'
import AddItems from './components/report'

function App() {

   return (

    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Home/>} />

        <Route path='/login' element={<Login/>} />

        <Route path='/register' element={<Register/>} />

        <Route path='/items' element={<ViewItems/>} />

        <Route path='/search' element={<Search />} />

        <Route path='/report' element={<AddItems />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App

