import { useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { LiaUniversitySolid } from "react-icons/lia";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const EachAllScholarship = ({ eachScholarship }) => {

    const [click, setClick] = useState(false);

    const { _id, subjectcategory, scholarshipCategory, applicationfee, universityname, universityimage, country, city, applicationdeadline } = eachScholarship

    return (
        <div>
            <div className={`${click ? 'hidden' : 'flex flex-col'} border p-5 rounded-md shadow-md`}>
                <img src={universityimage} alt="" className="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500" />
                <div className="mt-6 mb-2">
                    <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600 mb-2">{universityname}</span>
                    <h2 className="text-xl font-semibold tracking-wide mb-2">{subjectcategory}</h2>
                </div>

                <button className="w-[30px] bg-yellow-300 rounded-md" onClick={() => setClick(!click)}><MdOutlineKeyboardArrowRight className="text-[30px]" /></button>
            </div>
            {
                click ? <div className="border p-5 rounded-md shadow-md">
                    <img src={universityimage} alt="" className="object-cover object-center w-full rounded-md h-20 dark:bg-gray-500" />
                    <div className="mt-6 mb-2">
                        <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600 mb-3">Subject Category: {subjectcategory}</span>
                        <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600 mb-3">Scholarship Category: {scholarshipCategory}</span>
                        <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600 mb-3">Application Fee: ${applicationfee}</span>
                        <hr className="my-3" />
                        <span className="text-xs font-medium tracking-widest uppercase dark:text-violet-600 mb-3 flex items-center gap-2"><LiaUniversitySolid className="text-[18px]" /> <h1>University: {universityname}</h1></span>
                        <span className="text-xs font-medium tracking-widest uppercase dark:text-violet-600 mb-3 flex items-center gap-2"><IoLocationOutline className="text-[18px]" /><h1>Country: {country}</h1></span>
                        <span className="text-xs font-medium tracking-widest uppercase dark:text-violet-600 mb-3 flex items-center gap-2"><IoLocationOutline className="text-[18px]" /><h1>City: {city}</h1></span>
                        <hr className="my-3" />
                        <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600 mb-3">Application Deadline: {applicationdeadline}</span>
                        <span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-600 mb-3">Rating: </span>
                        <hr className="my-3" />

                    </div>
                    <div className="flex justify-between items-center">
                        <button className="w-[30px] bg-yellow-300 rounded-md" onClick={() => setClick(!click)}><MdOutlineKeyboardArrowLeft className="text-[30px]" /></button>
                        <Link to={`allscholarships/${_id}`}><button className="border px-2 py-1 hover:bg-yellow-300 hover:font-medium rounded-md border-yellow-300 ">Details</button></Link>
                    </div>
                </div> : ''
            }
        </div>
    );
};

export default EachAllScholarship;