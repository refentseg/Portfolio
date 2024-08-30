import { createBrowserRouter } from "react-router-dom";
import App from "../Layout/App";
import ServerError from "../Errors/ServerError";
import NotFound from "../Errors/NotFound";
import AdminPage from "../../Features/Admin/AdminPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children:[
            {path: 'admin',element:<AdminPage />},
            {path: 'server-error', element: <ServerError />},
            {path: '*', element: <NotFound />},
        ]
    }
])