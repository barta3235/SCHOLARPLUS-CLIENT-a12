import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { TiDeleteOutline } from "react-icons/ti";
import { MdMenuBook, MdOutlineMail } from "react-icons/md";
import { LiaUniversitySolid } from "react-icons/lia";
import { IoPerson } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const ReviewEachCardByAdmin = ({ eachReview, refetch }) => {

    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#fcd34d",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/reviewDeleteByAdmin/${id}`)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        icon: "success",
                        title: `Review removed`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            }
        });


    }

    return (
        <div className="flex flex-col max-w-lg p-3 overflow-x-auto rounded-lg shadow-lg border dark:bg-gray-50 dark:text-gray-800 mt-[40px]">
            <div className="flex space-x-4">
                <div className="flex flex-col space-y-3 mb-2">
                    <span className="text-sm font-semibold flex  items-center gap-1"><IoPerson className="text-[17px]" />{eachReview?.username}</span>
                    <span className="text-sm font-semibold flex  items-center gap-1"><MdOutlineMail className="text-[18px]" />
                        {eachReview?.useremail}</span>
                    <span className=" dark:text-gray-600  flex items-center gap-1 text-[17px]"><SlCalender className="text-[16px]" /><span>{eachReview?.date}</span></span>
                </div>
            </div>
            <hr />
            <div>
                <Rating className="mt-3 mb-3" style={{ maxWidth: 120 }} value={parseInt(eachReview?.rating)} />
                <h2 className="mb-2 text-base font-semibold flex items-center"><LiaUniversitySolid className="text-[20px]" />{eachReview?.universityname}</h2>
                <h2 className="mb-2 text-base font-semibold flex items-center gap-1"><MdMenuBook className="text-[18px]" />{eachReview?.scholarshipname}</h2>
                <hr />
                <p className="text-xs mt-2 tracking-wider dark:text-gray-600 text-justify">{eachReview?.comment}</p>
            </div>
            <div className="justify-end flex">
                <button onClick={() => handleDelete(eachReview?._id)}><TiDeleteOutline className="text-3xl text-red-700 cursor-pointer" /></button>
            </div>
        </div>
    );
};

export default ReviewEachCardByAdmin;