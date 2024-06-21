import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SocialLogin from "../components/SocialLogin";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";


const HOSTING_KEY = import.meta.env.VITE_HOSTING_API;
const IMAGE_HOSTING_API = `https://api.imgbb.com/1/upload?key=${HOSTING_KEY}`;

const Register = () => {
    const [showPassword, setShowPassword] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const { createUser, updateUserProfile, logout } = useAuth();
    const axiosPublic = useAxiosPublic();


    const onSubmit = async (data) => {

        //imgbb creating hosting URL
        const imageFile = { image: data.photo[0] }
        const res = await axiosPublic.post(IMAGE_HOSTING_API, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log('register file0', res.data);

        //firebase auth.
        createUser(data.email, data.password)
            .then(async (result) => {
                console.log('register file1', result.user)

                //updating user profile in firebase
                updateUserProfile(data.name, res.data.data.display_url)
                    .then(() => {
                    })
                    .catch((error) => {
                        console.log('register file2', error.message)
                    })

                //update to database
                const user = {
                    name: data.name,
                    photo: res.data.data.display_url,
                    email: data.email,
                }

                const databaseRes = await axiosPublic.post('/users', user);
                if (databaseRes.data.insertedId !== 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Your have registered yourself",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    logout();
                    navigate('/login');
                }

            })
            .catch((error) => {
                Swal.fire({
                    icon: "success",
                    title: `${error.message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            })






    }


    return (
        <div className="flex justify-center items-center my-[60px]">
            <div className="flex flex-col md:w-[500px] p-2 md:p-6 sm:p-10 dark:bg-gray-50 dark:text-gray-800 border rounded-lg shadow-lg">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-3xl font-bold">Register your account</h1>
                    <p className="text-sm dark:text-gray-600 text-gray-500 font-medium">Sign up to get yourself access to infinity</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate="" action="" className="space-y-12">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="font-medium block mb-2 text-sm">Name</label>
                            <input placeholder="Leroy Jensen" className="border border-gray-300 w-full rounded-md py-2 pl-1" type="text"  {...register("name", { required: true })} />
                            {errors.name?.type === 'required' && <p className="text-[12px] font-medium text-red-700" role="alert">Name is required</p>}
                        </div>
                        <div>
                            <label htmlFor="photo" className=" font-medium block mb-2 text-sm">Photo</label>
                            <input className="file-input-bordered border border-gray-300 w-full rounded-md py-2 pl-1" type="file"  {...register("photo", { required: true })} />
                            {errors.photo?.type === 'required' && <p className="text-[12px] font-medium text-red-700" role="alert">Photo is required</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="font-medium block mb-2 text-sm">Email address</label>
                            <input placeholder="leroyJensen@gmail.com" className="border-gray-300 border w-full rounded-md py-2 pl-1" type="email"  {...register("email", { required: true })} />
                            {errors.email?.type === 'required' && <p className="text-[12px] font-medium text-red-700" role="alert">Email is required</p>}
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="font-medium text-sm">Password</label>
                                <label onClick={() => setShowPassword(!showPassword)} htmlFor="password" className="font-medium text-sm">{showPassword ? <FaEye className="text-[18px] mr-[5px]" /> : <FaEyeSlash className="text-[18px] mr-[5px]" />}</label>
                            </div>
                            <input className="border-gray-300 border w-full rounded-md py-2 pl-2" type={showPassword ? 'password' : 'text'}  {...register("password", {
                                required: true,
                                minLength: 6,
                                pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;"'<>?,./]).{6,}$/
                            })} name="password" id="password" placeholder="*****" />
                            {errors.password?.type === 'minLength' && <p className="text-[12px] font-medium text-red-700" role="alert">Password should be of at least 6 characters</p>}
                            {errors.password?.type === 'required' && <p className="text-[12px] font-medium text-red-700" role="alert">Password is required</p>}
                            {errors.password?.type === 'pattern' && <p className="text-[12px] font-medium text-red-700" role="alert">Password should be of at least 6 characters and must contain an uppercase letter and a special character </p>}

                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <input type="submit" value='Sign Up' className="cursor-pointer w-full px-8 py-3 cursor-pointer font-semibold border rounded-lg shadow-md hover:border-2 hover:border-yellow-300"></input>
                        </div>
                        <div>
                            <div className="divider">Or</div>
                        </div>
                    </div>
                </form>
                <SocialLogin></SocialLogin>
                <p className="px-6 text-sm text-center dark:text-gray-600 pt-3 font-medium">Already have an account?
                    <Link to='/login' className="underline hover:text-red-800"> Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;