import { useQuery } from "@tanstack/react-query";
import { CiSearch } from "react-icons/ci";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import EachAllScholarship from "./EachAllScholarship";
import { useState } from "react";
import { button } from "@material-tailwind/react";
import { Pagination } from "swiper/modules";

const AllScholarship = () => {
    const axiosPublic = useAxiosPublic();
    const [searchText, setSearchText] = useState('');

    //pagination starts
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    //pagination ends

    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        setSearchText(search);
        setCurrentPage(1);
    }
    console.log(searchText);



    //Pagination starts
    const handlePagination = (page) => {
        setCurrentPage(page);
    }

    const handleItemsPerPage = (e) => {
        const val = e.target.value;
        setItemsPerPage(val);
        setCurrentPage(1)
    }
    //pagination ends

    const { data: count = 0 } = useQuery({
        queryKey: ['scholarship-count'],
        queryFn: async () => {
            const res = await axiosPublic.get('/scholarship-count')
            return res.data.count;
        }
    })

    const { data: allScholarships} = useQuery({
        queryKey: ['allscholarship', searchText, currentPage, itemsPerPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allScholarship?search=${searchText}&page=${currentPage}&size=${itemsPerPage}`);
            return res?.data;
        }
    })

    //pagination starts
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);
    //pagination ends



    return (

        allScholarships
        ?
        <div className="mx-[5px] md:mx-[50px] mt-[30px] mb-[50px]">
            <form onSubmit={handleSearch} className="flex items-center mb-[50px]">
                <CiSearch className="absolute ml-2 text-[20px]" />
                <input className="border py-2 pl-[30px] pr-1 outline-yellow-300 rounded-md rounded-r-none border-r-0" type="search" name="search" id="" />
                <input type="submit" className="border bg-yellow-200 border-l-0 rounded-r-md py-2 px-2 font-medium cursor-pointer" value="Search" />
            </form>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mb-[80px]">
                {
                    allScholarships?.map((eachScholarship) => <EachAllScholarship key={eachScholarship._id} eachScholarship={eachScholarship}></EachAllScholarship>)
                }
            </div>


            {/* pagination */}
            <div className="flex justify-center items-center gap-5">
                <div className="pagination flex items-center gap-4">
                    <button disabled={currentPage == 1} onClick={() => setCurrentPage(currentPage - 1)} className={`p-2 ${currentPage === 1 && 'bg-slate-300'}  font-medium rounded-lg bg-yellow-200`}>Previous</button>
                    <div>
                        {
                            pages.map((eachPage, idx) => <button className={`py-2 px-4 ${currentPage == eachPage && 'bg-yellow-200'} rounded-md font-medium hover:bg-yellow-300 hover:text-white`} key={idx} onClick={() => handlePagination(eachPage)}>{eachPage}</button>)
                        }
                    </div>
                    <button disabled={currentPage == numberOfPages} onClick={() => setCurrentPage(currentPage + 1)} className={`p-2 ${currentPage == numberOfPages && 'bg-slate-300'}  font-medium rounded-lg bg-yellow-200`}>Next</button>
                </div>
                <div className="p-2 rounded-lg font-medium bg-yellow-200 border-yellow-300">
                    <select value={itemsPerPage} className="bg-yellow-200 outline-0" onChange={handleItemsPerPage} name="" id="">
                        <option value="6">6</option>
                        <option value="9">9</option>
                        <option value="12">12</option>
                        <option value="15">15</option>
                    </select>
                </div>
            </div>
        </div>
        :
        <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars text-yellow-300 w-24"></span></div>
    );
};

export default AllScholarship;