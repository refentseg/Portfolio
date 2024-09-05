import { Outlet, useLocation } from 'react-router-dom'
import HomePage from '../../Features/Home/HomePage'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import { useCallback, useEffect, useState } from 'react'
import { useAppDispatch } from '../Store/configureStore'
import { fetchCurrentUser} from '../../Features/account/accountSlice'
import LoadingComponent from '../../components/LoadingComponent'
import { ToastContainer } from 'react-toastify'
function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const[loading,setLoading] = useState(true);
  const initApp = useCallback(async () => {
    try{
      await dispatch(fetchCurrentUser());
    }catch(error){
      console.log(error)
    }
}, [dispatch]);

useEffect(()=>{
  initApp().then(()=>setLoading(false))
},[initApp])
if (loading) return <LoadingComponent message="Loading..." />

  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar />
    <Header />
    {loading?<LoadingComponent message="Loading..." />
      :location.pathname === '/' ? <HomePage />
      :<Outlet />
    }
    <Footer />
    </>
  )
}

export default App
