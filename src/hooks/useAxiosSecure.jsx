import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {

    const navigate = useNavigate();
    const { logout } = useAuth();

    //request
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token');
        console.log('in axios secure 0', token);
        config.headers.authorization= `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    })

    //intercepts 401 and 403 statuses
    axiosSecure.interceptors.response.use(function(response){
        return response;
    }, async (error)=>{
        const status= error?.response?.status;
        if(status===401 || status===403){
            try{
                await logout()
                navigate('/login')
            }catch(logOutError){
                console.log('in axios secure file,',logOutError);
            }
        }
    })




    return axiosSecure;
};

export default useAxiosSecure;