import { createBrowserRouter } from "react-router-dom";
import App from "../Layout/App";
import ServerError from "../Errors/ServerError";
import NotFound from "../Errors/NotFound";
import AdminPage from "../../Features/Admin/AdminPage";
import Login from "../../Features/account/Login";
import Register from "../../Features/account/Register";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:[
            {element:<RequireAuth />,children:[
                {path: 'admin',element:<AdminPage />}
            ]},
            {path: 'server-error', element: <ServerError />},
            {path: 'login', element: <Login />},
            {path: 'register', element: <Register />},
            {path: '*', element: <NotFound />},
        ]
    }
])