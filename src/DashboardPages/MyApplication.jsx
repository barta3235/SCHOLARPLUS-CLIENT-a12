import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { button } from "@material-tailwind/react";
import Swal from "sweetalert2";

const MyApplication = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: myApplication } = useQuery({
        queryKey: ['MyApplications'],
        queryFn: async () => {
            const res3 = await axiosSecure.get(`/appliedScholarshipByUser/${user?.email}`)
            return res3.data
        }
    })

    const handleError=()=>{
        Swal.fire({
            icon: "warning",
            title: `Your application is in processing stage`,
            showConfirmButton: false,
            timer: 1500
        });
    }


    return (
        <div className="mt-[40px]">
            {
                myApplication
                    ?
                    <div>
                        <h1 className="py-1 border px-2 rounded-full text-xs mb-[30px] bg-yellow-200 w-[85px] text-center font-medium">Applied - {myApplication.length}</h1>
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
                                            <td><button className="py-1 px-2 text-xs rounded-full bg-red-700 text-white font-medium">Cancel</button></td>
                                            <td><button className="py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium">Details</button></td>
                                            <td><button className="p-1 text-xs rounded-full bg-yellow-200 font-medium">Add Review</button></td>


                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <h1 className="text-[20px] md:text-[30px] mb-[17px] font-medium tracking-wider"><span className="border-b-[3px] border-yellow-300">No Data Available</span></h1>
            }
        </div>
    );
};

export default MyApplication;