import { Outlet, useLocation } from 'react-router-dom'
import HomePage from '../../Features/Home/HomePage'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'

function App() {
  const location = useLocation();
  const [loading,setLoading] = useState(false);
  return (
    <>
    <Header />
    {
      location.pathname === '/' ? <HomePage />:
      <Outlet />
    }
    <Footer />
    </>
  )
}

export default App
