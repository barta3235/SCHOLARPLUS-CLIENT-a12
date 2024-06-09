import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";


const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
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
                            <input placeholder="leroyJensen@gmail.com" className="border-gray-300 border w-full rounded-md py-2 pl-1" type="email"  {...register("email",{ required: true })} />
                            {errors.email?.type === 'required' && <p className="text-sm font-medium text-red-700" role="alert">Email is required</p>}
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="font-medium text-sm">Password</label>
                            </div>
                            <input className="border w-full rounded-md py-2 pl-2" type="password"  {...register("password",{ required: true })} name="password" id="password" placeholder="*****" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <input type="submit" value='Log in' className="w-full px-8 py-3 font-semibold border rounded-lg shadow-md"></input>
                        </div>
                        <div>
                            <div className="divider">Or</div>
                        </div>
                        <div>
                            <button className="w-full px-8 py-3 font-semibold border rounded-lg shadow-md flex justify-center bg-yellow-300"><FaGoogle className="text-2xl"></FaGoogle></button>
                        </div>
                        <p className="px-6 text-sm text-center dark:text-gray-600 pt-3 font-medium">Already have an account?
                            <Link to='/register' className="underline hover:text-red-800"> Sign up</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;