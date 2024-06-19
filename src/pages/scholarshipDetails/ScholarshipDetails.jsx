import { count } from "firebase/firestore";
import { IoLocationOutline } from "react-icons/io5";
import { LiaUniversitySolid } from "react-icons/lia";
import { Link, useLoaderData } from "react-router-dom";

const ScholarshipDetails = () => {

    const data = useLoaderData();

    const { _id, scholarshipname,
        subjectcategory,
        scholarshipCategory,
        degree,
        tuitionfee,
        applicationfee,
        servicecharge,
        description,
        universityname,
        universityimage,
        country,
        city,
        worldranking,
        postdate,
        applicationdeadline,
        email } = data;

    return (
        <section>
            {
                data ? <div>
                    <div className="dark:bg-violet-600">
                        <div className="container flex md:flex-row flex-col gap-10 justify-between px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 dark:text-gray-50 bg-gradient-to-r from-yellow-200 to-slate-100 hover:bg-gradient-to-l">

                            <div className="text-start">
                                <span className="block text-[18px] font-medium tracking-widest uppercase dark:text-violet-600 mb-4">University Name: <span className="font-normal">{universityname}</span></span>
                                <span className="block text-[18px] font-medium tracking-widest uppercase dark:text-violet-600 mb-4">Campus Location: <span className="font-normal">{city}, {country}</span></span>
                                <div className="divider"></div>
                                <span className="block text-[18px] font-medium tracking-widest uppercase dark:text-violet-600 mb-4">Subject Category: <span className="font-normal">{subjectcategory}</span></span>
                                <span className="block text-[18px] font-medium tracking-widest uppercase dark:text-violet-600 mb-4">Service Charge: <span className="font-normal">${servicecharge}</span></span>
                                <span className="block text-[18px] font-medium tracking-widest uppercase dark:text-violet-600 mb-4">Application Fees: <span className="font-normal">${applicationfee}</span></span>

                                <div className="divider"></div>
                                <span className="block text-[18px] font-medium tracking-widest uppercase dark:text-violet-600 mb-4">Post Date: <span className="font-norrmal text-red-700">{postdate}</span></span>
                                <span className="block text-[18px] font-medium tracking-widest uppercase dark:text-violet-600 mb-4">Application Deadline: <span className="text-red-700">{applicationdeadline}</span></span>

                                <div>
                                    <Link to={`/toPaymentFromDetail/${_id}`}><button className="mt-5 font-medium tracking-widest cursor-pointer px-5 py-2 rounded-lg bg-yellow-300">Apply</button></Link>
                                </div>
                            </div>


                            <div className="md:w-1/2 text-start">
                                <span className="block text-[18px] font-medium tracking-widest cursor-pointer uppercase dark:text-violet-600 mb-4">Scholarship: <span className="font-normal">{scholarshipname}</span></span>
                                <span className="block text-[18px] font-medium tracking-widest uppercase dark:text-violet-600 mb-6">Scholarship Category: <span className="font-normal">{scholarshipCategory}</span></span>
                                <span className="block text-[18px] font-medium tracking-widest uppercase dark:text-violet-600 mb-4"><span className="text-yellow-400 font-semibold">About the Scholarship</span> : <br /> <h1 className="font-medium text-justify leading-7 text-xs">{description}</h1></span>
                            </div>


                        </div>
                    </div>
                    <img src={universityimage} alt="" className="w-5/6 mx-auto mb-12 -mt-20 dark:bg-gray-500 rounded-lg shadow-md lg:-mt-40" />
                </div>
                    :
                    <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars text-yellow-300 w-24"></span></div>
            }

            <div>
                <h1>Review Section</h1>
            </div>
        </section>

    );
};

export default ScholarshipDetails;