import { AiTwotoneMail } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { GrUserAdmin } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Analytics from "../pages/Admin/Analytics";
import Analytics2 from "../pages/Admin/Analytics2";

const MyProfile = () => {

    const { user } = useAuth();
    console.log(user);
    const axiosSecure = useAxiosSecure();

    const { data: userFromDb } = useQuery({
        queryKey: ['userFromDb', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`)
            return res.data
        }
    })

    console.log(userFromDb);

    return (
        <div className="flex flex-col md:flex-row md:gap-[50px] mt-[40px] overflow-x-auto">

            <div className="ml-[5px]">
                <div className="mb-[60px]">
                    <h1 className="text-[20px] md:text-[30px] mb-[17px] font-medium tracking-wider">Hello, <span className="border-b-[3px] border-yellow-300">{user?.displayName}</span></h1>
                </div>

                <div className="avatar">
                    <div className="w-24 md:w-48 mask mask-squircle">
                        <img className="border-4 border-yellow-300" src={user?.photoURL} />
                    </div>
                </div>
                <div className="mt-[20px]">
                    <h1 className="flex flex-col md:flex-row md:items-center gap-2 md:text-[20px] font-medium link-hover"><AiTwotoneMail className="text-2xl" /><span>{user?.email}</span></h1>
                </div>
                {
                    userFromDb?.role === 'moderator'
                        ?
                        <div className="mt-[20px]">
                            <h1 className="flex flex-col md:flex-row md:items-center gap-2 md:text-[20px] font-medium link-hover"><GrUserAdmin className="text-2xl" />Role:<span>Moderator</span></h1>
                        </div>
                        :
                        ''
                }
                {
                    userFromDb?.role === 'admin'
                        ?
                        <div className="mt-[20px]">
                            <h1 className="flex md:flex-row md:items-center gap-2 md:text-[20px] font-medium link-hover"><GrUserAdmin className="text-2xl" />Role:<span>Admin</span></h1>
                        </div>
                        :
                        ''
                }
            </div>

            <div className="flex flex-row md:flex-col mt-[50px] md:mt-[0px] gap-[200px] md:gap-[30px]">
                <div className="md:border-l-yellow-300 md:border-l md:pl-5 w-3/4">
                    {
                        userFromDb?.role === 'admin'
                            ?
                            <Analytics></Analytics>
                            :
                            ''
                    }
                </div>
                <div className="pl-2 pb-2 border-l-2 border-l-yellow-300 border-b-yellow-300 border-b-2">
                    {
                        userFromDb?.role === 'admin'
                            ?
                            <Analytics2></Analytics2>
                            :
                            ''
                    }
                </div>
            </div>

        </div>
    );
};

export default MyProfile;