import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from '../../hooks/useAxiosPublic';
import EachCard_Top6 from "./EachCard_Top6";

const Top6_Scholarship = () => {
    const axiosPublic = useAxiosPublic();

    const { data: allScholarship } = useQuery({
        queryKey: ['top6Scholarship'],
        queryFn: async () => {
            const res = await axiosPublic.get('/top6Scholarship')
            return res.data;
        }
    })


    return (
        <div>
            {
                allScholarship
                    ?
                    <div className="mx-[5px] md:mx-[50px] mb-[100px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            allScholarship?.map((eachScholarship) => <EachCard_Top6 key={eachScholarship._id} eachScholarship={eachScholarship}></EachCard_Top6>)
                        }
                    </div>
                    :
                    <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars text-yellow-300 w-24"></span></div>
            }
        </div>
    );
};

export default Top6_Scholarship;