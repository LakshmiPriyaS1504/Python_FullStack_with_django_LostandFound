import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
import Items from './components/itemsviewpage'
import ViewItems from './components/itemsviewpage'
import AddItems from './components/report'
import ClaimPage from './components/claimsection'
import ClaimPages from './components/claimpage'
import ClaimsPages from './components/claimpage'
import ForgotPage from './components/forgot'
 import ResetPassword from "./components/ResetPassword";

function App() {

   return (

    <BrowserRouter>

      <Routes>

        <Route path='/' element={<Home/>} />

        <Route path='/login' element={<Login/>} />

        <Route path='/register' element={<Register/>} />

        <Route path='/items' element={<ViewItems/>} />

        <Route path='/report' element={<AddItems />} />
        <Route path="/claim" element={<ClaimPage />} />

        <Route path='/claims' element={<ClaimsPages/>} />

        <Route path='/search' element={<ViewItems/>} />

        <Route path='/forgot' element={<ForgotPage/>} />
       
        <Route path="/password_reset/:uid/:token" element={<ResetPassword />} />

      </Routes>

    </BrowserRouter>

  )
}

export default App

