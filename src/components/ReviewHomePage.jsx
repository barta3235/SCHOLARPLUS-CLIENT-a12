import { FaPlus } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { MdEmail, MdOutlinePerson } from "react-icons/md";

const ReviewHomePage = () => {

    const axiosPublic = useAxiosPublic();

    const { data: top4Reviews } = useQuery({
        queryKey: ['top4Review'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviewsTop4')
            return res.data;
        }
    })



    return (
        <section className="dark:bg-gray-100 dark:text-gray-800 mb-[100px] mt-5 mx-[5px] md:mx-[50px]">
            <div className="container py-12 ">
                <div className="grid items-center gap-4 xl:grid-cols-5">
                    <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left tracking-wider">
                        <h2 className="text-3xl md:text-[40px] font-medium flex gap-5 tracking-wider"><h1 className="flex items-center gap-2"><span>Scholar</span><FaPlus className="text-yellow-300" /></h1> <span className="border-b-yellow-300 border-b-[3px]">reviews</span></h2>
                        <p className="text-[18px] tracking-wider">Finding the best scholarships and the brightest students is challenging. Discover what the brightest students have to say about Scholar+'s top-notch services.</p>
                    </div>
                    <div className="xl:col-span-3">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="grid content-center gap-4">
                                <div className="p-6 rounded shadow-md dark:bg-gray-50 hover:bg-yellow-100">
                                    <p className="text-justify">{top4Reviews[0]?.comment}</p>
                                    <div className="flex items-center mt-4 space-x-4">
                                        <div>
                                            <p className="text-lg font-semibold flex items-center gap-1 text-justify"><MdOutlinePerson className="text-[20px]" />{top4Reviews[0]?.username}</p>
                                            <p className="text-sm dark:text-gray-600 flex items-center gap-1"><MdEmail className="text-[18px]" />{top4Reviews[0]?.useremail}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 rounded shadow-md dark:bg-gray-50 hover:bg-yellow-100">
                                    <p className="text-justify">{top4Reviews[2]?.comment}</p>
                                    <div className="flex items-center mt-4 space-x-4">
                                        <div>
                                            <p className="text-lg font-semibold flex items-center gap-1"><MdOutlinePerson className="text-[20px]" />Angela Markel</p>
                                            <p className="text-sm dark:text-gray-600 flex items-center gap-1"><MdEmail className="text-[18px]" />angela.markel@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid content-center gap-4">
                                <div className="p-6 rounded shadow-md dark:bg-gray-50 hover:bg-yellow-100">
                                    <p className="text-justify">{top4Reviews[1]?.comment}</p>
                                    <div className="flex items-center mt-4 space-x-4">
                                        <div>
                                            <p className="text-lg font-semibold flex items-center gap-1"><MdOutlinePerson className="text-[20px]" />{top4Reviews[1]?.username}</p>
                                            <p className="text-sm dark:text-gray-600 flex items-center gap-1"><MdEmail className="text-[18px]" />{top4Reviews[1]?.useremail}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 rounded shadow-md dark:bg-gray-50 hover:bg-yellow-100">
                                    <p className="text-justify">{top4Reviews[3]?.comment}</p>
                                    <div className="flex items-center mt-4 space-x-4">
                                        <div>
                                        <p className="text-lg font-semibold flex items-center gap-1"><MdOutlinePerson className="text-[20px]" />Jim Halpert</p>
                                            <p className="text-sm dark:text-gray-600 flex items-center gap-1"><MdEmail className="text-[18px]" />JHalpert@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewHomePage;