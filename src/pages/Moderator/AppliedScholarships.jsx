import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete, MdOutlineFeedback } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import Swal from "sweetalert2";


const AppliedScholarships = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: allAppliedScholarships, refetch } = useQuery({
        queryKey: ['allAppliedScholarships'],
        queryFn: async () => {
            const res = await axiosSecure.get('/user/moderator/allAppliedScholarships')
            return res.data;
        }
    })



    const handleDelete = async (id) => {
        console.log(id);
        const updatedStatus = {
            status: "rejected"
        }
        const res70 = await axiosSecure.put(`/user/moderator/updateStatusAfterDelete/${id}`, updatedStatus)
        if (res70.data.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: `Scholarship is Rejected`,
                showConfirmButton: false,
                timer: 1500
            });
        }
        refetch();
    }

    const handleFeedback = (id) => {
        console.log(id);

        document.getElementById('idbox').value = id;
        document.getElementById('my_modal_2').showModal();


    }

    const handleDetails = async (id) => {
        console.log(id);

        const res3 = await axiosSecure.get(`/user/moderator/eachAppliedScholarships/${id}`)

        document.getElementById('universityname').innerText = res3.data.universityname
        document.getElementById('degree').innerText = res3.data.applicantdegree
        document.getElementById('scholarshipcategory').innerText = res3.data.scholarshipcategory
        document.getElementById('scholarshipid').innerText = res3.data.scholarshipId
        document.getElementById('transactionid').innerText = res3.data.transactionId
        document.getElementById('payment').innerText = parseInt(res3.data.payment) / 100
        document.getElementById('status').innerText = res3.data.status

        document.getElementById('my_modal_1').showModal()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const feedback = e.target.textBox.value
        const sendData = {
            moderatorFeedback: feedback,
        }
        
        const res72 = await axiosSecure.put(`/user/moderator/addFeedBack/${id}`, sendData)
        if (res72.data.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: `Feed back provided!`,
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
            navigate('/dashboard/myProfile');

        }
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


                                            {
                                                eachScholarshipData?.status === 'rejected'
                                                    ?
                                                    <td className="bg-red-600 text-white font-medium">Rejected</td>
                                                    :
                                                    <td>
                                                        <select defaultValue={eachScholarshipData?.status} className="border rounded-md" name="applicationstatus" id="lang">
                                                            <option value="pending">Pending</option>
                                                            <option value="processing">Processing</option>
                                                            <option value="completed">Completed</option>
                                                        </select>
                                                    </td>
                                            }




                                            <td><button onClick={() => handleFeedback(eachScholarshipData?._id)} className="py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium"><MdOutlineFeedback className="text-[20px]" /></button></td>
                                            <td><button disabled={eachScholarshipData?.status === 'rejected'} onClick={() => handleDelete(eachScholarshipData?._id)} className={eachScholarshipData?.status === 'rejected' ? `py-1 px-2 text-xs rounded-full bg-slate-500 text-white font-medium` : `py-1 px-2 text-xs rounded-full bg-red-700 text-white font-medium`}><MdDelete className="text-[18px]" /></button></td>
                                            <td><button disabled={eachScholarshipData?.status === 'rejected'} onClick={() => handleDetails(eachScholarshipData?._id)} className={eachScholarshipData?.status === 'rejected' ? `py-1 px-2 text-xs rounded-full bg-slate-500 font-medium ` : `py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium `}><BiMessageSquareDetail className="text-[20px]" /></button></td>


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
                    <p className="py-2 mb-5 font-medium text-[20px]">Applied <span className="border-b-[3px] border-b-yellow-300">Scholarships</span></p>

                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="font-medium">University Name:</h1>
                        <h1 id="universityname" className="mt-1 rounded-md text-[18px]" type="text"></h1>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="font-medium">Applied Degree:</h1>
                        <h1 id="degree" className="mt-1 rounded-md text-[18px]" type="text"></h1>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="font-medium">Scholarship Category:</h1>
                        <h1 id="scholarshipcategory" className="mt-1 rounded-md text-[18px]" type="text"></h1>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="font-medium">Scholarship Id:</h1>
                        <h1 id="scholarshipid" className="mt-1 rounded-md text-[18px]" type="text"></h1>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="font-medium">Transaction Id:</h1>
                        <h1 id="transactionid" className="mt-1 text-[18px] bg-red-600 rounded-xl p-1 text-white" type="text"></h1>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="font-medium">Paid Amount:</h1>
                        <h1 id="payment" className="mt-1 rounded-md text-[18px]" type="text"></h1>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <h1 className="font-medium">Status:</h1>
                        <h1 id="status" className="mt-1 rounded-xl text-[18px] bg-green-500 p-1 text-white" type="text"></h1>
                    </div>



                    <div className="modal-action">
                        <form method="dialog" className="flex flex-col">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn bg-yellow-200 hover:bg-yellow-300 border-0">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="my_modal_2" className="modal">
                <div className="modal-box flex flex-col">
                    <p className="py-2 mb-2">Provide Feedback</p>
                    <div className="modal-action">
                        <form onSubmit={handleSubmit} method="dialog" className="border rounded-lg w-full">
                            <input name="id" id="idbox" className="border py-1 rounded-md" hidden type="text" />
                            <textarea name="textBox" className="textarea w-full mt-2 outline-none border-0" placeholder="Share your feedback"></textarea>
                            {/* if there is a button in form, it will close the modal */}
                            <input type="submit" className="bg-yellow-200 py-1 px-1 font-medium rounded-tr-lg cursor-pointer" value="Submit & Close" name="" id="" />
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AppliedScholarships;