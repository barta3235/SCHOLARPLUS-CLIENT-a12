import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { MdDelete, MdOutlineFeedback } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";

const AppliedScholarships = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allAppliedScholarships } = useQuery({
        queryKey: ['allAppliedScholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user/moderator/allAppliedScholarships')
            return res.data;
        }
    })



    const handleDelete = (id) => {
        console.log(id);
    }

    const handleDetails = (id) => {
        console.log(id);
        document.getElementById('my_modal_1').showModal()
    }

    return (
        <div className="mt-[40px]">
            {
                allAppliedScholarships
                    ?
                    <div>
                        <h1 className="py-1 px-2 rounded-full text-xs mb-[30px] bg-white w-[100px] border-2 border-yellow-300 text-center font-medium">Applied - {allAppliedScholarships.length}</h1>
                        <div className="overflow-x-auto">
                            <table className="table text-center">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Serial No.</th>
                                        <th>University Name</th>
                                        <th>Scholarship Name</th>
                                        <th>Scholarship Category</th>
                                        <th>Subject Category</th>
                                        <th>Degree</th>
                                        <th>Scholarship Id</th>
                                        <th>Applicant Email</th>
                                        <th>Applicant Phone</th>
                                        <th>Application Status</th>
                                        {/* <th>Country</th>
                                        <th>City</th> */}
                                        {/* <th>World Ranking</th>
                                        <th>Scholarship Post Date</th>
                                        <th>Application Deadline</th>
                                        <th>Benefactor Email</th>
                                        <th>University Image Url</th> */}
                                        <th>Feedback</th>
                                        <th>Cancel</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allAppliedScholarships.map((eachScholarshipData, idx) => <tr key={eachScholarshipData._id}>
                                            <td>{idx + 1}</td>
                                            <td>{eachScholarshipData?.universityname}</td>
                                            <td>{eachScholarshipData?.scholarship}</td>
                                            <td>{eachScholarshipData?.scholarshipcategory}</td>
                                            <td>{eachScholarshipData?.subjectcategory}</td>
                                            <td>{eachScholarshipData?.applicantdegree}</td>
                                            <td>{eachScholarshipData?.scholarshipId}</td>
                                            <td>{eachScholarshipData?.email}</td>
                                            <td>{eachScholarshipData?.applicantphone}</td>

                                            {/* <td>{eachScholarshipData?.country}</td>
                                            <td>{eachScholarshipData?.city}</td>
                                            <td>{eachScholarshipData?.worldranking}</td>
                                            <td>{eachScholarshipData?.postdate}</td>
                                            <td>{eachScholarshipData?.applicationdeadline}</td>
                                            <td>{eachScholarshipData?.email}</td>
                                            <td>{eachScholarshipData?.universityimage}</td> */}


                                            <td>
                                                <select defaultValue={eachScholarshipData?.status} className="border rounded-md" name="applicationstatus" id="lang">
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </td>




                                            <td><button className="py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium"><MdOutlineFeedback className="text-[20px]" /></button></td>
                                            <td><button onClick={() => handleDelete(eachScholarshipData?._id)} className="py-1 px-2 text-xs rounded-full bg-red-700 text-white font-medium"><MdDelete className="text-[18px]" /></button></td>
                                            <td><button onClick={() => handleDetails(eachScholarshipData?._id)} className="py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium"><BiMessageSquareDetail className="text-[20px]" /></button></td>


                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars text-yellow-300 w-24"></span></div>
            }
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box tracking-wider">
                    <p className="py-2 mb-5 text-[20px]">Applied <span className="border-b-2 border-b-yellow-300">Scholarships</span></p>

                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="font-medium">University Name:</h1>
                        <h1 className="mt-1 rounded-md" type="text">xsdsdx</h1>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="font-medium">Applied Degree:</h1>
                        <h1 className="mt-1 rounded-md" type="text">xsdsdx</h1>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="font-medium">Scholarship Category:</h1>
                        <h1 className="mt-1 rounded-md" type="text">xsdsdx</h1>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="font-medium">Transaction Id:</h1>
                        <h1 className="mt-1 rounded-md" type="text">xsdsdx</h1>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="font-medium">Paid Amount:</h1>
                        <h1 className="mt-1 rounded-md" type="text">xsdsdx</h1>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="font-medium">Status:</h1>
                        <h1 className="mt-1 rounded-md" type="text">xsdsdx</h1>
                    </div>



                    <div className="modal-action">
                        <form method="dialog" className="flex flex-col">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn bg-yellow-200 hover:bg-yellow-300 border-0">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AppliedScholarships;