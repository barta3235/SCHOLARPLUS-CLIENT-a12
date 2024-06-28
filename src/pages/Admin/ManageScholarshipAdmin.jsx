import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAdmin from "../../hooks/useAdmin";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import Swal from "sweetalert2";


const ManageScholarshipAdmin = () => {

    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const [isAdmin, isAdminLoading] = useAdmin();

    console.log(isAdmin);

    const { data: allScholarshipData, refetch } = useQuery({
        queryKey: ['allScholarshipDataByAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allScholarshipAdmin')
            return res?.data;
        }
    })

    console.log(allScholarshipData);

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
                const res1 = await axiosSecure.delete(`/allScholarshipDeleteByAdmin/${id}`)
                if (res1.data.deletedCount > 0) {
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

    const handleUpdate = async (id) => {
        const res2 = await axiosSecure.get(`/allScholarshipAdmin/${id}`)
        console.log(res2.data);

        document.getElementById('scholarshipname').value=res2.data.scholarshipname,
        document.getElementById('scholarshipId').value=res2.data._id,
        document.getElementById('subjectcategory').value=res2.data.subjectcategory,
        document.getElementById('scholarshipcategory').value=res2.data.scholarshipCategory,
        document.getElementById('degree').value=res2.data.degree,
        document.getElementById('tuitionfee').value=res2.data.tuitionfee,
        document.getElementById('applicationfee').value=res2.data.applicationfee,
        document.getElementById('servicecharge').value=res2.data.servicecharge,
        document.getElementById('description').value=res2.data.description,
        document.getElementById('universityname').value=res2.data.universityname,
        document.getElementById('universityimage').value=res2.data.universityimage,
        document.getElementById('country').value=res2.data.country,
        document.getElementById('city').value=res2.data.city,
        document.getElementById('worldranking').value=res2.data.worldranking,
        document.getElementById('postdate').value=res2.data.postdate,
        document.getElementById('applicationdeadline').value=res2.data.applicationdeadline,
        document.getElementById('email').value=res2.data.email,

        document.getElementById('my_modal_1').showModal();
    }

    const handleUpdate2=async(e)=>{
        e.preventDefault();
        const id=e.target.scholarshipId.value;
        const scholarshipname =e.target.scholarshipname.value;
        const subjectcategory =e.target.subjectcategory.value;
        const scholarshipCategory =e.target.scholarshipcategory.value;
        const degree =e.target.degree.value;
        const tuitionfee =e.target.tuitionfee.value;
        const applicationfee =e.target.applicationfee.value;
        const servicecharge =e.target.servicecharge.value;
        const description =e.target.description.value;
        const universityname =e.target.universityname.value;
        const universityimage =e.target.universityimage.value;
        const country =e.target.country.value;
        const city =e.target.city.value;
        const worldranking =e.target.worldranking.value;
        const postdate =e.target.postdate.value;
        const applicationdeadline =e.target.applicationdeadline.value;
        const email =e.target.email.value;

        const updatedScholarship = {
            scholarshipname,
            subjectcategory,
            scholarshipCategory,
            degree,
            tuitionfee,
            applicationfee,
            servicecharge,
            description,
            universityname,
            universityimage,
            country,
            city,
            worldranking,
            postdate,
            applicationdeadline,
            email,
        }

        const res3=await axiosSecure.put(`/allScholarshipUpdateByAdmin/${id}`,updatedScholarship)
        if(res3.data.modifiedCount>0){
            Swal.fire({
                icon: "success",
                title: `Scholarship updated`,
                showConfirmButton: false,
                timer: 1000
            });
            navigate('/dashboard/myProfile')
        }
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
                                            <td><button className="py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium" onClick={() => handleUpdate(eachScholarshipData?._id)}><GrUpdate className="text-[20px]" /></button></td>
                                            <td><button onClick={() => handleDelete(eachScholarshipData?._id)} className="py-1 px-2 text-xs rounded-full bg-red-700 text-white font-medium"><MdDelete className="text-[18px]" /></button></td>
                                            <td><Link to={`/scholarshipDetails/${eachScholarshipData?._id}`}><button className="py-1 px-2 text-xs rounded-full bg-yellow-200 font-medium"><BiMessageSquareDetail className="text-[20px]" /></button></Link></td>


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
                <div className="modal-box">
                    <p className="py-2">Update Information</p>
                    <div className="modal-action">
                        <form onSubmit={handleUpdate2} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
                            <fieldset className="grid grid-cols-4 gap-6 p-1 rounded-md shadow-md dark:bg-gray-50">
                                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="firstname" className="font-medium">Scholarship Name</label>
                                        <input id="scholarshipname" name="scholarshipname" type="text" placeholder="Scholarship Name" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="firstname" className="font-medium">Scholarship Id</label>
                                        <input id="scholarshipId" name="scholarshipId" type="text" placeholder="Scholarship Name" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>


                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="lang" className="font-medium">Subject Category</label>
                                        <br />
                                        <select className="pl-1 border w-full rounded-md py-2" name="subjectcategory" id="subjectcategory">
                                            <option value="Agriculture">Agriculture</option>
                                            <option value="Engineering">Engineering</option>
                                            <option value="Doctor">Doctor</option>
                                        </select>
                                    </div>

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="lang" className="font-medium">Scholarship Category</label>
                                        <br />
                                        <select className="pl-1 border w-full rounded-md py-2" name="scholarshipcategory" id="scholarshipcategory">
                                            <option value="Full fund">Full fund</option>
                                            <option value="Partial">Partial</option>
                                            <option value="Self-fund">Self-fund</option>
                                        </select>
                                    </div>

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="lang" className="font-medium">Degree</label>
                                        <br />
                                        <select className="pl-1 border w-full rounded-md py-2" name="degree" id="degree">
                                            <option value="Diploma">Diploma</option>
                                            <option value="Bachelor">Bachelor</option>
                                            <option value="Masters">Masters</option>
                                        </select>
                                    </div>

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="img" className="font-medium" >Tuition Fee</label>
                                        <input id="tuitionfee" name="tuitionfee" type="number" placeholder="$ 00.0" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>
                                    <br />
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="img" className="font-semibold">Application Fee</label>
                                        <input id="applicationfee" name="applicationfee" type="number" placeholder="$ 00.0" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>
                                    <br />
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="img" className="font-semibold">Service Charge</label>
                                        <input id="servicecharge" name="servicecharge" type="number" placeholder="$ 00.0" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>
                                    <br />
                                    <div className="col-span-full">
                                        <label htmlFor="img" className="font-semibold">Scholarship Description</label> <br />
                                        <textarea id="description" name="description" placeholder="A brief Description" className="w-full rounded-md border py-2 pl-1 h-[120px]" required />
                                    </div>
                                </div>
                            </fieldset>


                            <fieldset className="grid grid-cols-4 gap-6 p-1 rounded-md shadow-md dark:bg-gray-50">

                                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="firstname" className="font-medium">University Name</label>
                                        <input id="universityname" name="universityname" type="text" placeholder="University Name" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="firstname" className="font-medium">University Image</label>
                                        <br />
                                        <input id="universityimage" name="universityimage" type="text" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>

                                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="firstname" className="font-medium">Country</label>
                                            <input id="country" name="country" type="text" placeholder="Country" className="w-full rounded-md border py-2 pl-1" required />
                                        </div>

                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="firstname" className="font-medium">City</label>
                                            <input id="city" name="city" type="text" placeholder="City" className="w-full rounded-md border py-2 pl-1" required />
                                        </div>

                                        <div className="col-span-full sm:col-span-3">
                                            <label htmlFor="firstname" className="font-medium">World Ranking</label>
                                            <input id="worldranking" name="worldranking" placeholder="Eg. 400" type="number" className="w-full rounded-md border py-2 pl-1" required />
                                        </div>

                                    </div>
                                </div>
                            </fieldset>


                            <fieldset className="grid grid-cols-4 gap-6 p-1 rounded-md shadow-md dark:bg-gray-50">

                                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="firstname" className="font-medium">Scholarship Post Date</label>
                                        <input id="postdate" name="postdate" type="date" placeholder="Scholarship Release Date" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="firstname" className="font-medium">Application Deadline</label>
                                        <input id="applicationdeadline" name="applicationdeadline" type="text" placeholder="Eg. 6 Feb 24" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset className="grid grid-cols-4 gap-6 p-1 rounded-md shadow-md dark:bg-gray-50">
                                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="firstname" className="font-medium">Email</label>
                                        <input id="email" name="email" type="text" placeholder="leroy@gmail.com" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>

                                </div>


                            </fieldset>


                            <div className="flex justify-end">
                                <input type="submit" value="Update" className="border py-2 mb-[50px] rounded-lg font-medium bg-yellow-300 w-[150px] cursor-pointer" />
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ManageScholarshipAdmin;