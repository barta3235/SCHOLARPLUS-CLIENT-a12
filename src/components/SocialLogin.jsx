import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {

    const { googleSignIn } = useAuth()
    const axiosPublic = useAxiosPublic();
    const [errorLogin, setErrorLogin] = useState('');
    const location = useLocation();
    const navigate = useNavigate();


    const handelSocialLogin = () => {
        googleSignIn()
            .then(async (result) => {
                const userInfo = {
                    name: result?.user?.displayName,
                    photo: result?.user?.photoURL,
                    email: result?.user?.email,
                }

                const res = await axiosPublic.post('/users', userInfo)
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: `Log in successful`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(location.state ? location.state : '/')
                } else {
                    Swal.fire({
                        icon: "success",
                        title: `Log in successful`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    navigate(location.state ? location.state : '/')
                }


            })
            .catch((error) => {
                setErrorLogin(error.message)
            })
    }

    return (
        <div>
            <button onClick={handelSocialLogin} className="w-full px-8 py-3 font-semibold border rounded-lg shadow-md flex justify-center bg-yellow-300"><FaGoogle className="text-2xl"></FaGoogle></button>
            <p className="pt-[5px] text-[12px] font-medium text-red-700">{errorLogin}</p>
        </div>
    );
};

export default SocialLogin;