import { useQuery } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import EachAllScholarship from "./EachAllScholarship";
import { useState } from "react";

const AllScholarship = () => {
    const axiosPublic=useAxiosPublic();
    const [searchText,setSearchText]=useState('');

    const handleSearch=(e)=>{
        e.preventDefault();
        const search=e.target.search.value;
        setSearchText(search);
    }
    console.log(searchText);
    
    const { data: allScholarships = [] } = useQuery({
        queryKey: ['allscholarship',searchText],
        queryFn: async () => {
             const res= await axiosPublic.get(`/allScholarship?search=${searchText}`);
             return res?.data;
        }
    })

    console.log(allScholarships)
    
    
    return (
        <div className="mx-[5px] md:mx-[50px] mt-[30px]">
            <form onSubmit={handleSearch} className="flex items-center mb-[50px]">
                <CiSearch className="absolute ml-2 text-[20px]" />
                <input className="border py-2 pl-[30px] pr-1 outline-yellow-300 rounded-md rounded-r-none border-r-0" type="search" name="search" id="" />
                <input type="submit" className="border bg-yellow-200 border-l-0 rounded-r-md py-2 px-2 font-medium cursor-pointer" value="Search" />
            </form>

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