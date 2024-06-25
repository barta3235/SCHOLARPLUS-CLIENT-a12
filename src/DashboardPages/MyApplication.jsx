import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyApplication = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: myApplication, refetch } = useQuery({
        queryKey: ['MyApplications'],
        queryFn: async () => {
            const res3 = await axiosSecure.get(`/appliedScholarshipByUser/${user?.email}`)
            return res3.data
        }
    })

    const handleError = () => {
        Swal.fire({
            icon: "warning",
            title: `Your application is in processing stage`,
            showConfirmButton: false,
            timer: 1500
        });
    }

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
                const res10 = await axiosSecure.delete(`/appliedScholarshipByUser/delete/${id}`)
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
        console.log(id);
        const res2 = await axiosSecure.get(`/appliedScholarshipByUser/update/${id}`)

        const scholarshipname = res2.data.scholarship;
        const universityname = res2.data.universityname;
        const scholarshipid = res2.data.scholarshipId;
        const username = user?.displayName;
        const useremail = user?.email;
        console.log(username)
        document.getElementById('un').value = universityname
        document.getElementById('sn').value = scholarshipname
        document.getElementById('si').value = scholarshipid
        document.getElementById('n').value = username
        document.getElementById('ue').value = useremail


        document.getElementById('my_modal_1').showModal();
    }


    const handleReview2 = async (e) => {
        e.preventDefault();
        const rating = e.target.elements['rating-2'].value;
        const date = e.target.date.value;
        const comment = e.target.comment.value;
        const scholarshipname = e.target.scholarshipname.value;
        const universityname = e.target.universityname.value
        const scholarshipid = e.target.scholarshipid.value
        const username = e.target.username2.value;
        const useremail = e.target.useremail2.value;

        const newReview = { rating, date, comment, scholarshipid, scholarshipname, universityname, username, useremail }

        const res4 = await axiosSecure.post('/userReview', newReview)
        if (res4?.data?.insertedId) {
            Swal.fire({
                icon: "success",
                title: `Thanks for sharing your feedback!`,
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/dashboard/myProfile');
        }

    }






    return (
        <div className="mt-[40px]">
            {
                myApplication
                    ?
                    <div>
                        <h1 className="py-1 px-2 rounded-full text-xs mb-[30px] bg-white w-[85px] border-2 border-yellow-300 text-center font-medium">Applied - {myApplication.length}</h1>
                        <div className="overflow-x-auto">
                            <table className="table text-center">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>University Name</th>
                                        <th>University Address</th>
                                        <th>Application Feedback</th>
                                        <th>Subject Category</th>
                                        <th>Degree</th>
                                        <th>Transaction Id</th>
                                        <th>Scholarship Id</th>
                                        <th>Application Status</th>
                                        <th>Update Information</th>
                                        <th>Cancel</th>
                                        <th>View Details</th>
                                        <th>Add a review</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        myApplication.map((eachApplication, idx) => <tr key={eachApplication._id}>
                                            <td>{idx + 1}</td>
                                            <td>{eachApplication?.universityname}</td>
                                            <td>{eachApplication?.country}, {eachApplication?.district}</td>
                                            <td className="text-xs">{eachApplication?.feedback ? eachApplication?.feedback : '-'}</td>
                                            <td>{eachApplication?.subjectcategory}</td>
                                            <td>{eachApplication?.applicantdegree}</td>
                                            <td>{eachApplication?.transactionId}</td>
                                            <td>{eachApplication?.scholarshipId}</td>
                                            <td>{eachApplication?.status}</td>
                                            {
                                                eachApplication.status === 'processing' ? <td><button className="py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium" onClick={handleError}>Update</button></td> : <td><Link to={`/dashboard/myApplication/update/${eachApplication._id}`}><button disabled={eachApplication?.status === 'rejected'} className={eachApplication?.status === 'rejected' ? 'py-1 px-2 text-xs rounded-full bg-slate-300 ' : 'py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium'}>Update</button></Link></td>
                                            }
                                            <td><button disabled={eachApplication?.status === 'rejected'} onClick={() => handleDelete(eachApplication?._id)} className={eachApplication?.status === 'rejected' ? 'py-1 px-2 text-xs rounded-full bg-slate-300 text-white' : 'py-1 px-2 text-xs rounded-full bg-red-700 text-white font-medium'}>Cancel</button></td>
                                            <td><Link to={`/scholarshipDetails/${eachApplication.scholarshipId}`}><button className="py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium">Details</button></Link></td>
                                            <td><button disabled={eachApplication?.status === 'rejected'} onClick={() => handleReview(eachApplication?._id)} className={eachApplication?.status === 'rejected' ? 'p-1 text-xs rounded-full bg-slate-300' : 'p-1 text-xs rounded-full bg-yellow-200 font-medium'}>Add Review</button></td>
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
                                <h1 className="text-xs mb-2 ml-1 font-medium">Rate the Scholarship</h1>
                                <div className="rating">
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" value="1" required />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" value="2" required />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" value="3" required />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" value="4" required />
                                    <input type="radio" name="rating-2" className="mask mask-star-2 bg-yellow-400" value="5" required />
                                </div>
                            </div>
                            <input name="date" type="date" className="border px-2 py-1 rounded-lg" required />
                            <input type="text" id="un" name="universityname" placeholder="University Name" className="border rounded-md py-1 px-2" required />
                            <input type="text" id="sn" name="scholarshipname" placeholder="Scholarship Name" className="border rounded-md py-1 px-2" required />
                            <input type="text" id="si" name="scholarshipid" placeholder="Scholarship Id" className="border rounded-md py-1 px-2" required />
                            <input type="text" id="n" name="username2" placeholder="User Name" className="border rounded-md py-1 px-2" required />
                            <input type="text" id="ue" name="useremail2" placeholder="User Email" className="border rounded-md py-1 px-2" required />
                            <textarea name="comment" className="textarea textarea-bordered" placeholder="Share our experience" required></textarea>
                            <input type="submit" className="cursor-pointer border-b-2 rounded-md font-medium border-b-yellow-300 w-[120px]" value="Submit & Close" />
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyApplication;