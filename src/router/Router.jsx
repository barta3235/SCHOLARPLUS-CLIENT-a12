import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddScholarship from "../pages/Moderator/AddScholarship";
import ModeratorRoute from "./ModeratorRoute";
import AllScholarship from '../pages/allScholarship/AllScholarship'


  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/register',
            element:<Register></Register>
        },
        {
             path:'/allScholarships',
             element:<AllScholarship></AllScholarship>
        },
        {
          path:'/dashboard/addScholarship',
          element:<ModeratorRoute><AddScholarship></AddScholarship></ModeratorRoute>
        }
      ]
    },
  ]);

  export default router