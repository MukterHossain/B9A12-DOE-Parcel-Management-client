
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
import AllUsers from "../Dashboard/AllUsers";
import AllParcels from "../Dashboard/AllParcels";

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
    element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
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
      },

      // Admin Route
      {
        path: 'users',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'allParcels',
        element: <AllParcels></AllParcels>
      }

    ]
  }
]);