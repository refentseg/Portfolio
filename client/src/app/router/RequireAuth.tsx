import { useLocation, Outlet, Navigate} from "react-router-dom";
import { useAppSelector } from "../Store/configureStore";


export default function RequireAuth()
{
    const {token} = useAppSelector(state => state.account);
    const location = useLocation();
    if (!token) {
    return <Navigate to='/login' state={{from: location}} />
    }
    

  return(
    <>
    
     <Outlet />
    </>
    
  );
}