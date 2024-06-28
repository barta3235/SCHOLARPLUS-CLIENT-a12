import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ReviewEachCardByAdmin from "./ReviewEachCardByAdmin";

const ReviewsAdmin = () => {

    const axiosSecure=useAxiosSecure();

    const {data:allReview,refetch}=useQuery({
        queryKey:['allReview'],
        queryFn:async()=>{
            const res1= await axiosSecure.get('/allReviewsByAdmin')
            return res1.data;
        }
    })

    

    return (
        <div className="mt-[40px]">
        {
            allReview
            ?
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {
                    allReview.map((eachReview)=><ReviewEachCardByAdmin key={eachReview._id} eachReview={eachReview} refetch={refetch}></ReviewEachCardByAdmin>)
                }
            </div>
            :
            <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars text-yellow-300 w-24"></span></div>
        }
    </div>
    );
};

export default ReviewsAdmin;