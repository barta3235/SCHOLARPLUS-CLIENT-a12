import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location= useLocation();
    const [isAdmin, isAdminLoading] = useAdmin();


    if (loading || isAdminLoading) {
        return  <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars text-yellow-300 w-24"></span></div>
    }
    if(user && isAdmin){
        return children;
    }

    return <Navigate state={location?.pathname} to='/login' replace></Navigate>

};

export default AdminRoute;