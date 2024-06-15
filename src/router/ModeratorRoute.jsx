import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useModerator from "../hooks/useModerator";

const ModeratorRoute = ({children}) => {
    const location=useLocation();
    const {user,loading}=useAuth();
    const [isModerator,isModeratorLoading]=useModerator();

    if(loading || isModeratorLoading){
        return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars text-yellow-300 w-24"></span></div>
    }

    if(user && isModerator){
        return children
    }
    return <Navigate state={location.pathname} to='/login' replace></Navigate>

};

export default ModeratorRoute;