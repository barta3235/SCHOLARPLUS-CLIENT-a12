import { AiTwotoneMail } from "react-icons/ai";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {

    const { user } = useAuth();
    console.log(user)

    return (
        <div className="mx-[2px] mt-[40px] md:mx-[30px]">
            <div className="mt-[20px] mb-[60px]">
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
        </div>
    );
};

export default MyProfile;