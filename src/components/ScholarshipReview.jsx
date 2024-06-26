import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../hooks/useAxiosSecure';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { IoPerson } from "react-icons/io5";
import { MdDateRange, MdEmail } from "react-icons/md";

const ScholarshipReview = ({ id }) => {
    const axiosSecure = useAxiosSecure();

    const { data: specificReviews } = useQuery({
        queryKey: ['specificReviews', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/specificReviews/${id}`)
            return res.data;
        }
    })

    console.log(specificReviews);


    return (
        <div>
            {
                specificReviews
                    ?
                    <div className="carousel carousel-center bg-yellow-200 rounded-box space-x-4 p-4 w-full">
                        {

                            specificReviews.map((eachReview) => <div className="carousel-item flex flex-col p-5 bg-white rounded-lg" key={eachReview._id}>
                                <h1 className="flex items-center font-medium gap-1"><IoPerson></IoPerson>{eachReview?.username}</h1>
                                <br />
                                <h1 className="flex items-center font-medium gap-1"><MdEmail></MdEmail>{eachReview?.useremail}</h1>
                                <br />
                                <h1 className="flex items-center font-medium gap-1"><MdDateRange></MdDateRange>{eachReview?.date}</h1>
                                <hr className="py-2"/>
                                <h1 className="w-[200px] md:w-[350px] text-xs text-justify">{eachReview?.comment}</h1>
                                
                                <Rating className="mt-5" style={{ maxWidth: 100 }} value={parseInt(eachReview?.rating)}  />

                            </div>)
                        }

                    </div>
                    :
                    ''

            }

        </div>
    );
};

export default ScholarshipReview;