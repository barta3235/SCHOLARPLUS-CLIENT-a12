import { useQuery } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import EachAllScholarship from "./EachAllScholarship";

const AllScholarship = () => {
    const axiosPublic=useAxiosPublic();
    
    const { data: allScholarships = [] } = useQuery({
        queryKey: ['allscholarship'],
        queryFn: async () => {
             const res= await axiosPublic.get('/allScholarship');
             return res.data;
        }
    })
    
    
    return (
        <div className="mx-[5px] md:mx-[50px] mt-[30px]">
            <div className="flex items-center mb-[50px]">
                <CiSearch className="absolute ml-2 text-[20px]" />
                <input className="border py-2 pl-[30px] pr-1 outline-yellow-300 rounded-md" type="search" id="" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mb-[50px]">
                {
                    allScholarships?.map((eachScholarship)=><EachAllScholarship key={eachScholarship._id} eachScholarship={eachScholarship}></EachAllScholarship>)
                }
            </div>

            {/* pagination */}
            <div>
                <h1>Pagination</h1>
            </div>
        </div>
    );
};

export default AllScholarship;