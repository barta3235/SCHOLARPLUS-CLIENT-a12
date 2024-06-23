import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: myReview, refetch } = useQuery({
        queryKey: ['userReview', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userReview/${user?.email}`);
            return res.data;
        }
    })

    console.log(myReview);

    const handleDelete = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res10 = await axiosSecure.delete(`/userReview/delete/${id}`)
                if (res10.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your application has been cancelled.",
                        icon: "success"
                    });
                }
                refetch();
            }
        });

    }

    const handleReview = async (id) => {
        const res2 = await axiosSecure.get(`/userReviewById/${id}`)

        const date = res2.data.date;
        const comment = res2.data.comment;
        const scholarship = res2.data.scholarshipname;
        const universityname = res2.data.universityname;
        const scholarshipid = res2.data.scholarshipid;
        const username = res2.data.username;
        const useremail = res2.data.useremail;
        const reviewid=res2.data._id;

        document.getElementById('dt').value = date
        document.getElementById('un').value = universityname
        document.getElementById('sn').value = scholarship
        document.getElementById('si').value = scholarshipid
        document.getElementById('n').value = username
        document.getElementById('ue').value = useremail
        document.getElementById('tt').value = comment
        document.getElementById('ri').value = reviewid


        document.getElementById('my_modal_1').showModal();

    }

    const handleReview2 = async(e) => {
        e.preventDefault()
        const rating = e.target.elements['rating-2'].value;
        const date = e.target.date.value;
        const comment = e.target.comment.value;
        const scholarshipname = e.target.scholarshipname.value;
        const universityname = e.target.universityname.value
        const scholarshipid = e.target.scholarshipid.value
        const username = e.target.username2.value;
        const useremail = e.target.useremail2.value;
        const reviewid=e.target.reviewid.value;

        const updatedReview= {rating,date,comment,scholarshipname,universityname,scholarshipid,username,useremail};
        
        const res20= await axiosSecure.put(`/userReviewUpdate/${reviewid}`,updatedReview)
        if(res20?.data?.modifiedCount>0>0){
            Swal.fire({
                icon: "success",
                title: `Review Updated`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/myProfile')
        }
    }


    return (
        <div className="mt-[40px]">
            {
                myReview
                    ?
                    <div>
                        <h1 className="py-1 px-2 rounded-full text-xs mb-[30px] bg-white w-[95px] border-2 border-yellow-300 text-center font-medium">Reviewed - {myReview.length}</h1>
                        <div className="overflow-x-auto">
                            <table className="table text-center tracking-wider">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Scholarship Name</th>
                                        <th>University Name</th>
                                        <th>Review Posted Date</th>
                                        <th>Comment</th>
                                        <th>Delete</th>
                                        <th>Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myReview.map((eachReview, idx) => <tr key={eachReview._id}>
                                            <td>{idx + 1}</td>
                                            <td>{eachReview?.scholarshipname}</td>
                                            <td>{eachReview?.universityname}</td>
                                            <td>{eachReview?.date}</td>
                                            <td className="text-justify">{eachReview?.comment}</td>
                                            <td><button onClick={() => handleDelete(eachReview?._id)} className="py-1 px-2 text-xs rounded-full bg-red-700 text-white font-medium">Cancel</button></td>
                                            <td><button onClick={() => handleReview(eachReview?._id)} className="px-2 py-1 text-xs rounded-full bg-yellow-200 font-medium">Edit</button></td>
                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <h1 className="text-[20px] md:text-[30px] mb-[17px] font-medium tracking-wider"><span className="border-b-[3px] border-yellow-300">No Data Available</span></h1>
            }
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <p className="py-2 tracking-wider">Press fill the necessary information.</p>
                    <div className="modal-action">
                        <form onSubmit={handleReview2} method="dialog" className="flex flex-col gap-5 w-full">
                            <div>
                                <h1 className="text-xs mb-2 ml-1 font-medium">Rate the Scholarship <span className="text-red-800">*(Re-do)</span></h1>
                                <div className="rating">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" value="1" required />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" value="2" required />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" value="3" required />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" value="4" required />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" value="5" required />
                                </div>
                            </div>

                            <input name="date" id="dt" type="date" className="border px-2 py-1 rounded-lg" required />
                            <input type="text" id="ri" name="reviewid" placeholder="Review Id" className="border hidden rounded-md py-1 px-2" required />
                            <input type="text" id="un" name="universityname" placeholder="University Name" className="border rounded-md py-1 px-2" required />
                            <input type="text" id="sn" name="scholarshipname" placeholder="Scholarship Name" className="border rounded-md py-1 px-2" required />
                            <input type="text" id="si" name="scholarshipid" placeholder="Scholarship Id" className="border rounded-md py-1 px-2" required />
                            <input type="text" id="n" name="username2" placeholder="User Name" className="border rounded-md py-1 px-2" required />
                            <input type="text" id="ue" name="useremail2" placeholder="User Email" className="border rounded-md py-1 px-2" required />
                            <textarea id="tt" name="comment" className="textarea textarea-bordered" placeholder="Share our experience" required></textarea>
                            <input type="submit" className="cursor-pointer border-b-2 rounded-md font-medium border-b-yellow-300 w-[120px]" value="Submit & Close" />
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyReviews;