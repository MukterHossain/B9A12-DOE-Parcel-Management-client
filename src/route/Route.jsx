
import {createBrowserRouter} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../components/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import Demo from "../pages/Demo";
import Dashboard from "../Dashboard/Dashboard";
import AdminHome from "../Dashboard/AdminHome";
import BookParcel from "../Dashboard/BookParcel";
import UserHome from "../Dashboard/UserHome";

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
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path: 'demo',
          element:<PrivateRoute><Demo></Demo></PrivateRoute>
        }
    ]
  },
  {
    path:'dashboard',
    element:<Dashboard></Dashboard>,
    children: [
      {
        path:'adminHome',
        element:<AdminHome></AdminHome>
      },
      {
        path:'bookParcel',
        element: <BookParcel></BookParcel>
      },
      {
        path:'userHome',
        element: <UserHome></UserHome>
      }
    ]
  }
]);