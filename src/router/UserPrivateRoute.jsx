import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserPrivateRoute = ({children}) => {
    const location=useLocation();
    const {user,loading}=useAuth();
 
    if(loading){
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars text-yellow-300 w-24"></span></div>
    }
 
    if(user){
        return children;
    }
 
    return <Navigate state={location.pathname} to='/login' replace></Navigate>
};

export default UserPrivateRoute;