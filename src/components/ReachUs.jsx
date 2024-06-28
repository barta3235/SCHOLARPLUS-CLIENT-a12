import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";

const ReachUs = () => {
    const axiosSecure= useAxiosSecure();

    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const name= e.target.name.value;
        const email=e.target.email.value;
        const message=e.target.message.value;
        const newData={name,email,message}

        const res= await axiosSecure.post('/getInTouch',newData)
        if(res.data.insertedId){
            Swal.fire({
                icon: "success",
                title: `Thank you for reaching out to us!`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        e.target.reset();
    }


    return (
        <section className="py-2 dark:bg-gray-100 dark:text-gray-900 mx-[5px] md:mx-[50px] mb-[100px]">
            <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x tracking-wider">
                <div className="py-6 md:py-0 md:px-6">
                    <h1 className="text-4xl font-semibold mb-4">Have questions? <span data-aos="zoom-in-up" className="border-b-[3px] border-b-yellow-300">Contact us!</span></h1>
                    <div className="space-y-4">
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                            </svg>
                            <span>Gulshan 2, Bangladesh</span>
                        </p>
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                            </svg>
                            <span>+880 2 12345678</span>
                        </p>
                        <p className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                            </svg>
                            <span>contact@scholarplus.org</span>
                        </p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} noValidate="" className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
                    <label className="block">
                        <span className="mb-2 font-medium">Full name</span>
                        <input name="name" type="text" placeholder="Leroy Jenkins" className="block w-full rounded-md shadow-sm shadow-yellow-300 py-2 pl-2" required />
                    </label>
                    <label className="block">
                        <span className="mb-2 font-medium">Email address</span>
                        <input name="email" type="email" placeholder="leroy@jenkins.com" className="block w-full shadow-yellow-300 rounded-md shadow-sm py-2 pl-2" required/>
                    </label>
                    <label className="block">
                        <span className="mb-2 font-medium">Message</span>
                        <textarea rows="4" name="message" className="block w-full shadow-yellow-300 rounded-md border shadow-sm pl-2 pt-1" required></textarea>
                    </label>
                    <div className="flex justify-end rounded-md">
                        <input  type="submit" className="px-6 border py-2 tracking-wider border-collapse cursor-pointer font-medium text-lg rounded-md shadow-yellow-300 bg-yellow-200 hover:bg-yellow-300" value="Submit" />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ReachUs;