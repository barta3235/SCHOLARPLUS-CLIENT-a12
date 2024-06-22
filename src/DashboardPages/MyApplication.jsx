import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyApplication = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate=useNavigate();

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

    const handleReview=async(e)=>{
        e.preventDefault();
        const rating=e.target.rating.value;
        const date=e.target.date.value;
        const scholarshipname=e.target.scholarshipname.value;
        const universityname= e.target.universityname.value;
        const username=e.target.username.value;
        const useremail=e.target.useremail.value;
        const comment=e.target.comment.value;
        
        const newReview={rating,date,scholarshipname,universityname,username,useremail,comment}
        
        const data= await axiosSecure.post('/userReview',newReview)
        if(data.data.insertedId){
            Swal.fire({
                icon: "success",
                title: `Review Added. Thank you!`,
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
                                            <td>-</td>
                                            <td>{eachApplication?.subjectcategory}</td>
                                            <td>{eachApplication?.applicantdegree}</td>
                                            <td>{eachApplication?.transactionId}</td>
                                            <td>{eachApplication?.scholarshipId}</td>
                                            <td>{eachApplication?.status}</td>
                                            {
                                                eachApplication.status === 'processing' ? <td><button className="py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium" onClick={handleError}>Update</button></td> : <td><Link to={`/dashboard/myApplication/update/${eachApplication._id}`}><button className="py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium">Update</button></Link></td>
                                            }
                                            <td><button onClick={() => handleDelete(eachApplication?._id)} className="py-1 px-2 text-xs rounded-full bg-red-700 text-white font-medium">Cancel</button></td>
                                            <td><Link to={`/scholarshipDetails/${eachApplication.scholarshipId}`}><button className="py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium">Details</button></Link></td>
                                            <td><button onClick={()=>document.getElementById('my_modal_1').showModal()} className="p-1 text-xs rounded-full bg-yellow-200 font-medium">Add Review</button></td>


                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <h1 className="text-[20px] md:text-[30px] mb-[17px] font-medium tracking-wider"><span className="border-b-[3px] border-yellow-300">No Data Available</span></h1>
            }

            {/* review modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <p className="py-2 tracking-wider">Press fill the information below</p>
                    <div className="modal-action">
                        <form onSubmit={handleReview} method="dialog" className="overflow-x-auto">
                            <fieldset className="grid grid-cols-4 gap-6  rounded-md shadow-md dark:bg-gray-50">
                                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="img" className="font-medium" >Rating Point</label>
                                        <input type="range" min={0} max="5" name="rating" className="range text-yellow-300" step="1"  />
                                        <div className="w-full rounded-lg flex justify-between bg-yellow-200 text-xs px-2">
                                            <span>1</span>
                                            <span>2</span>
                                            <span>3</span>
                                            <span>4</span>
                                            <span>5</span>
                                        </div>
                                    </div>
                                    
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="img" className="font-semibold">Review Date</label>
                                        <input id="img" name="date" type="date" placeholder="$ 00.0" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>
                                    
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="img" className="font-semibold">Scholarship Name</label>
                                        <input id="img" name="scholarshipname" type="text" placeholder="Name of the scholarship" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>
                                    
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="img" className="font-semibold">University Name</label>
                                        <input id="img" name="universityname" type="text" placeholder="Name of your university" className="w-full rounded-md border py-2 pl-1" required/>
                                    </div>

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="img" className="font-semibold">User Name</label>
                                        <input id="img" name="username" defaultValue={user?.displayName} type="text" placeholder="Name of your university" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="img" className="font-semibold">User Email</label>
                                        <input id="img" name="useremail" defaultValue={user?.email} type="text" placeholder="Name of your university" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>
                                    
                                    <div className="col-span-full">
                                        <label htmlFor="img" className="font-semibold">Review Comment</label> <br />
                                        <textarea id="comm" name="comment" placeholder="Share Your Experience" className="w-full rounded-md border py-2 pl-1 h-[120px]" required/>
                                    </div>
                                </div>
                            </fieldset>
                            <div className="flex justify-end">
                                <input className="py-2 mt-5 px-2 bg-yellow-200 rounded-lg font-medium tracking-wider cursor-pointer" type="submit" value="Submit & Close" />
                            </div>
                        </form>
                    </div>

                </div>
            </dialog>
        </div>
    );
};

export default MyApplication;