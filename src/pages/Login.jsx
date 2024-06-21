import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../components/SocialLogin";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useState } from "react";



const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {signInUser}=useAuth();
    const [errorLogin,setErrorLogin]=useState('');
    const location=useLocation();
    const navigate=useNavigate();

    const onSubmit = data => {
        signInUser(data.email,data.password)
        .then(()=>{
            Swal.fire({
                icon: "success",
                title: `Log in successful`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate(location.state? location.state :'/')
        })
        .catch((error)=>{
            if(error.message==='Firebase: Error (auth/invalid-credential).'){
                setErrorLogin('Invalid email or password');
            }else{
                setErrorLogin(error.message);
            }
            
        })
    }






    return (
        <div className="flex justify-center items-center my-[60px]">
            <div className="flex flex-col md:w-[500px] p-6 sm:p-10 dark:bg-gray-50 dark:text-gray-800 border rounded-lg shadow-lg">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-3xl font-bold">Log in to your account</h1>
                    <p className="text-sm dark:text-gray-600 font-medium text-gray-500 ">Endless path with scholar plus</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate="" action="" className="space-y-12">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="font-medium block mb-2 text-sm">Email address</label>
                            <input placeholder="leroyJensen@gmail.com" className="border-gray-300 border w-full rounded-md py-2 pl-1" type="email"  {...register("email", { required: true })} />
                            {errors.email?.type === 'required' && <p className="text-sm font-medium text-red-700" role="alert">Email is required</p>}
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="font-medium text-sm">Password</label>
                            </div>
                            <input className="border w-full rounded-md py-2 pl-2" type="password"  {...register("password", { required: true })} name="password" id="password" placeholder="*****" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <input type="submit" value='Log in' className="w-full px-8 py-3 font-semibold border rounded-lg shadow-md hover:border-2 cursor-pointer hover:border-yellow-300"></input>
                            <p className="pt-[5px] text-[12px] font-medium text-red-700">{errorLogin}</p>
                        </div>
                        <div>
                            <div className="divider">Or</div>
                        </div>
                    </div>
                </form>
                <SocialLogin></SocialLogin>
                <p className="px-6 text-sm text-center dark:text-gray-600 pt-3 font-medium">Already have an account?
                    <Link to='/register' className="underline hover:text-red-800"> Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;