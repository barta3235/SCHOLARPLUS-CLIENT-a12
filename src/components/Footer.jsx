import { BsLinkedin } from "react-icons/bs";
import { FaPlus, FaSquareFacebook } from "react-icons/fa6";
import webLogo from '../../src/assets/Website Logo/pngtree-toga-cap-logo-design-scholarship-brand-vector-png-image_12528833.png'
import { Link } from "react-router-dom";
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from "react";

const Footer = () => {
    useEffect(() => {
        AOS.init({ duration: 2000 })
    }, [])

    return (
        <footer className="pt-6 border-t-4 border-yellow-300">
            <div className="container px-6 mx-auto space-y-6 dark:divide-gray-600 divide-y divide-opacity-50">
                <div className="grid grid-cols-12 items-center">
                    <div className="pb-6 col-span-full md:pb-0 md:col-span-6">
                        <a rel="noopener noreferrer" href="#" className="flex justify-center space-x-1 md:justify-start items-center">
                            <img data-aos="fade-right" className="w-[40px] h-[40px] rounded-lg" src={webLogo} alt="" />
                            <h1 className="flex items-center gap-2"><h1 data-aos="fade-right"></h1><span data-aos="fade-down" className="self-center text-[25px]  font-medium tracking-wide "><span>Scholar</span></span><FaPlus className="text-[30px] text-yellow-300"></FaPlus></h1>
                        </a>
                    </div>
                    <div className="col-span-6 md:text-left md:col-span-3 text-start mt-[15px] font-medium">
                        <ul className="flex flex-col md:flex-row justify-around md:gap-2 tracking-wide">
                            <li className="mb-[7px]">
                                <Link to="/">Home</Link>
                            </li>
                            <li className="mb-[7px]">
                                <Link to='/allScholarships'>Scholarships</Link>
                            </li>
                            <li>
                                <Link to='/contactUs'>Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid justify-center lg:justify-between tracking-wider">
                    <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6  font-medium">
                        <span>©2024 All rights reserved</span>
                        <a rel="noopener noreferrer" href="#">
                            <span>Privacy policy</span>
                        </a>
                        <a rel="noopener noreferrer" href="#">
                            <span>Terms of service</span>
                        </a>
                    </div>
                    <div className="flex justify-center pt-4 space-x-4 lg:py-2 lg:col-end-13">
                        <a rel="noopener noreferrer" href="#" title="Email" className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-600 dark:text-gray-50">
                           <FaSquareFacebook className="text-[35px] text-yellow-200"></FaSquareFacebook>
                        </a>
                        <a rel="noopener noreferrer" href="#" title="Twitter" className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-600 dark:text-gray-50">
                            <BsLinkedin className="text-[32px] text-yellow-200"></BsLinkedin>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;