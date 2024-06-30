import { useQuery } from "@tanstack/react-query";
import { FaFileSignature, FaUserGraduate } from "react-icons/fa";
import { SiSemanticscholar } from "react-icons/si";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { GiMoneyStack } from "react-icons/gi";

const Analytics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: analytics1 } = useQuery({
        queryKey: ['analytics1'],
        queryFn: async () => {
            const res = await axiosSecure.get('/analytics1ByAdmin')
            return res.data;
        }
    })


    return (
        <div>
            {
                analytics1
                    ?
                    <div className="bg-yellow-50 shadow-md">
                        <section className=" dark:bg-gray-100 dark:text-gray-800 border-t-yellow-300 border-t-2 pt-2 md:border-t-0">
                            <div className="container grid grid-cols-1 gap-6 mx-auto sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4">
                                <div className="flex p-2 space-x-2  rounded-lg md:space-x-4 dark:bg-gray-50 dark:text-gray-800">
                                    <div className="flex justify-center align-middle rounded-lg items-center">
                                        <SiSemanticscholar className="text-5xl text-yellow-400" />
                                    </div>
                                    <div className="flex flex-col justify-center align-middle">
                                        <p className="text-3xl font-semibold leading-none">{analytics1?.allScholarshipCount}</p>
                                        <p className="capitalize">Scholarships</p>
                                    </div>
                                </div>
                                <div className="flex p-2 space-x-2 rounded-lg md:space-x-4 dark:bg-gray-50 dark:text-gray-800">
                                    <div className="flex justify-center align-middle rounded-lg items-center">
                                        <FaFileSignature className="text-[45px] text-yellow-300" />
                                    </div>
                                    <div className="flex flex-col justify-center align-middle">
                                        <p className="text-3xl font-semibold leading-none">{analytics1?.appliedCount}</p>
                                        <p className="capitalize">Applied</p>
                                    </div>
                                </div>

                                <div className="flex p-2 space-x-2 rounded-lg md:space-x-4 dark:bg-gray-50 dark:text-gray-800">
                                    <div className="flex justify-center align-middle rounded-lg items-center">
                                        <FaUserGraduate className="text-[45px] text-yellow-300" />

                                    </div>
                                    <div className="flex flex-col justify-center align-middle">
                                        <p className="text-3xl font-semibold leading-none">{analytics1?.userCount}</p>
                                        <p className="capitalize">Users</p>
                                    </div>
                                </div>
                                <div className="flex p-2 space-x-2 rounded-lg md:space-x-4 dark:bg-gray-50 dark:text-gray-800">
                                    <div className="flex justify-center align-middle rounded-lg items-center">
                                        <GiMoneyStack className="text-[45px] text-yellow-300" />

                                    </div>
                                    <div className="flex flex-col justify-center align-middle">
                                        <p className="text-3xl font-semibold leading-none">{analytics1?.totalApplicationFee/100}</p>
                                        <p className="capitalize">Total Fees</p>
                                    </div>
                                </div>


                            </div>
                        </section>

                    </div>
                    :
                    <div className="flex items-center justify-center">
                        <span className="loading loading-bars loading-md text-yellow-300"></span>
                    </div>

            }
        </div>
    );
};

export default Analytics;