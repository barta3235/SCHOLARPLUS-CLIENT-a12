import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";

const ManageScholarship = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allScholarshipData } = useQuery({
        queryKey: ['allScholarshipData'],
        queryFn: async () => {
            const res = axiosSecure.get('/user/moderator/allScholarship')
            return (await res).data;
        }
    })

    console.log(allScholarshipData);

    const handleDelete = (id) => {
        console.log(id);
    }

    const handleUpdate = (id) => {
        console.log(id);
    }


    return (
        <div className="mt-[40px]">
            {
                allScholarshipData
                    ?
                    <div>
                        <h1 className="py-1 px-2 rounded-full text-xs mb-[30px] bg-white w-[120px] border-2 border-yellow-300 text-center font-medium">Scholarships - {allScholarshipData.length}</h1>
                        <div className="overflow-x-auto">
                            <table className="table text-center">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Serial No.</th>
                                        <th>Scholarship Id</th>
                                        <th>Scholarship Name</th>
                                        <th>Scholarship Category</th>
                                        <th>Subject Category</th>
                                        <th>Degree</th>
                                        <th>Tuition Fee</th>
                                        <th>Application Fee</th>
                                        <th>Service Charge</th>
                                        <th>University Name</th>
                                        <th>Country</th>
                                        <th>City</th>
                                        <th>World Ranking</th>
                                        <th>Scholarship Post Date</th>
                                        <th>Application Deadline</th>
                                        <th>Benefactor Email</th>
                                        <th>University Image Url</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allScholarshipData.map((eachScholarshipData, idx) => <tr key={eachScholarshipData._id}>
                                            <td>{idx + 1}</td>
                                            <td>{eachScholarshipData?._id}</td>
                                            <td>{eachScholarshipData?.scholarshipname}</td>
                                            <td>{eachScholarshipData?.scholarshipCategory}</td>
                                            <td>{eachScholarshipData?.subjectcategory}</td>
                                            <td>{eachScholarshipData?.degree}</td>
                                            <td>{eachScholarshipData?.tuitionfee}</td>
                                            <td>{eachScholarshipData?.applicationfee}</td>
                                            <td>{eachScholarshipData?.servicecharge}</td>
                                            <td>{eachScholarshipData?.universityname}</td>
                                            <td>{eachScholarshipData?.country}</td>
                                            <td>{eachScholarshipData?.city}</td>
                                            <td>{eachScholarshipData?.worldranking}</td>
                                            <td>{eachScholarshipData?.postdate}</td>
                                            <td>{eachScholarshipData?.applicationdeadline}</td>
                                            <td>{eachScholarshipData?.email}</td>
                                            <td>{eachScholarshipData?.universityimage}</td>
                                            <td><button className="py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium" onClick={() => handleUpdate(allScholarshipData?._id)}><GrUpdate className="text-[20px]" /></button></td>
                                            <td><button onClick={() => handleDelete(allScholarshipData?._id)} className="py-1 px-2 text-xs rounded-full bg-red-700 text-white font-medium"><MdDelete className="text-[18px]" /></button></td>
                                            <td><Link to={`/scholarshipDetails/${allScholarshipData?._id}`}><button className="py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium"><BiMessageSquareDetail className="text-[20px]"/></button></Link></td>


                                        </tr>)
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars text-yellow-300 w-24"></span></div>
            }
        </div>
    );
};

export default ManageScholarship;