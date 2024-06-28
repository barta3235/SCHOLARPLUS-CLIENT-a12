import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from './useAuth';

const useAdmin = () => {
    const {user,loading}=useAuth();
    const axiosSecure=useAxiosSecure();

    const {data:isAdmin,isPending:isAdminLoading}=useQuery({
        queryKey:[user?.email,'isAdmin'],
        enabled:!loading && !!user?.email,
        queryFn:async()=>{
            const res= await axiosSecure.get(`/user/admin/${user?.email}`)
            return res?.data?.admin; 
        }
    })
     
    console.log('is hook page',isAdmin)
    return [isAdmin,isAdminLoading];
};

export default useAdmin;