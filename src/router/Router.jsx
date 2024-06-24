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
import Dashboard from "../MainLayout/Dashboard";
import MyProfile from "../DashboardPages/MyProfile";
import MyApplication from '../DashboardPages/MyApplication'
import MyReviews from "../DashboardPages/MyReviews";
import UpdateMyApplication from "../DashboardPages/UpdateMyApplication";
import ManageScholarship from "../pages/Moderator/ManageScholarship";
import ManageReview from "../pages/Moderator/ManageReview";

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
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      },
      {
        path: 'allScholarships',
        element: <AllScholarship></AllScholarship>
      },
      {
        path: 'scholarshipDetails/:id',
        element: <UserPrivateRoute><ScholarshipDetails></ScholarshipDetails></UserPrivateRoute>,
        loader:({params})=>fetch(`http://localhost:5000/allScholarship/${params.id}`)
      },
      {
         path: 'toPaymentFromDetail/:id',
         element:<UserPrivateRoute><PaymentInitial></PaymentInitial></UserPrivateRoute>
      },
      {
        path: '/dashboard/moderator/addScholarships',
        element: <ModeratorRoute><AddScholarship></AddScholarship></ModeratorRoute>
      }
    ]
  },
  {
    path:'/dashboard',
    element:<UserPrivateRoute><Dashboard></Dashboard></UserPrivateRoute>,
    children:[
        {
          path:'myProfile',
          element:<MyProfile></MyProfile>
        },
        {
          path:'myApplication',
          element:<MyApplication></MyApplication>
        },
        {
          path:'myApplication/update/:id',
          element:<UpdateMyApplication></UpdateMyApplication>
        },
        {
          path:'MyReviews',
          element:<MyReviews></MyReviews>
        },
        {
          path:'moderator/manageScholarships',
          element:<ManageScholarship></ManageScholarship>
        },
        {
          path:'moderator/reviews',
          element:<ManageReview></ManageReview>
        }
    ]
  }
]);

export default router