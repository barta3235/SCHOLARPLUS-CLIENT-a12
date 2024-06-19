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
import ScholarshipDetails from "../pages/scholarshipDetails/ScholarshipDetails";
import UserPrivateRoute from './UserPrivateRoute'
import PaymentInitial from "../pages/payment/PaymentInitial";
import ErrorPage from "../pages/ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/allScholarships',
        element: <AllScholarship></AllScholarship>
      },
      {
        path: '/scholarshipDetails/:id',
        element: <UserPrivateRoute><ScholarshipDetails></ScholarshipDetails></UserPrivateRoute>,
        loader:({params})=>fetch(`http://localhost:5000/allScholarship/${params.id}`)
      },
      {
         path: '/toPaymentFromDetail/:id',
         element:<UserPrivateRoute><PaymentInitial></PaymentInitial></UserPrivateRoute>
      },
      {
        path: '/dashboard/addScholarship',
        element: <ModeratorRoute><AddScholarship></AddScholarship></ModeratorRoute>
      }
    ]
  },
]);

export default router