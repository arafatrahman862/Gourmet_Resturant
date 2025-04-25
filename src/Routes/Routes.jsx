import {
    createBrowserRouter,
 
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import Singup from "../pages/Singup/Singup";
import DashBoard from "../Layout/DashBoard";
import MyCart from "../pages/DashBoard/MyCart/MyCart";
import AllUsers from "../pages/DashBoard/AllUsers/AllUsers";
import PrivateRoute from "./PrivateRoute";
import AddItem from "../pages/DashBoard/AddItem/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItem from "../pages/DashBoard/ManageItem/ManageItem";
import Payment from "../pages/DashBoard/Payment/Payment";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/DashBoard/UserHome/UserHome";
import AdminHome from "../pages/DashBoard/AdminHome/AdminHome";

 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: "/menu",
            element: <Menu></Menu>
        },
        {
            path: "/order/:category",
            element: <Order></Order>
        },
        {
            path: "/login",
            element: <Login></Login>
        },
        {
            path: "/signup",
            element: <Singup></Singup>
        },
      ]
    },
    {
      path:"/dashboard",
      element:<PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
      children:[
        {
          path:"mycart",
          element: <MyCart></MyCart>
        },
        {
          path:"allusers",
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path:"additem",
          element: <AdminRoute><AddItem></AddItem></AdminRoute>
        },
        {
          path:"manageitems",
          element: <AdminRoute><ManageItem></ManageItem></AdminRoute>
        },
        {
          path:"payment",
          element: <Payment></Payment>
        },
        {
          path:"paymenthistory",
          element: <PaymentHistory></PaymentHistory>
        },
        {
          path:"userhome",
          element: <UserHome></UserHome>
        },
        {
          path:"adminhome",
          element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
      ]
    }
  ]);