import { Outlet, useLocation } from 'react-router-dom'
import HomePage from '../../Features/Home/HomePage'
import './App.css'
import Header from './Header'

function App() {
  const location = useLocation();
  return (
    <>
    <Header />
    {
      location.pathname === '/' ? <HomePage />:
      <Outlet />
    }
    </>
  )
}

export default App
