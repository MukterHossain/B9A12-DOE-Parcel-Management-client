
import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../components/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
        {
            index:true,
            element: <Home></Home>
        },
        {
          path: 'login',
          element: <Login></Login>
        }
    ]
  },
]);