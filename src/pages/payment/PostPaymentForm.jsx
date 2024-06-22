import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const HOSTING_KEY = import.meta.env.VITE_HOSTING_API;
const HOSTING_KEY_API = `https://api.imgbb.com/1/upload?key=${HOSTING_KEY}`
const PostPaymentForm = ({ scholarshipData,transId,payingAmount }) => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(null);
    const navigate=useNavigate();

    const { _id, universityname, scholarshipCategory, subjectcategory,scholarshipname } = scholarshipData;

    const handlePaymentFormSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        const imageFile = { image: e.target.applicantimage.files[0] }
        const res = await axiosPublic.post(HOSTING_KEY_API, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })


        const form = e.target;
        const applicantphone = form.applicantphone.value;
        const applicantgender = form.applicantgender.value;
        const applicantimage = res.data.data.display_url;
        const applicantdegree = form.applicantdegree.value;
        const country = form.country.value;
        const district = form.district.value;
        const village = form.village.value;
        const ssc = form.ssc.value;
        const hsc = form.hsc.value;
        const studygap = form.studygap.value;
        const universityname = form.universityname.value;
        const subjectcategory = form.subjectcategory.value;
        const scholarshipcategory = form.scholarshipcategory.value;
        const username = user?.displayName;
        const email = user?.email;
        const scholarshipId = _id;
        const currentdate = new Date();
        const transactionId=transId;
        const payment=payingAmount;
        const status= "pending";
        const scholarship=scholarshipname;

        const appliedScholarshipData = {
            applicantphone, applicantgender, applicantimage, applicantdegree, country, district, village, ssc, hsc, studygap, universityname, subjectcategory, scholarshipcategory, username, email, scholarshipId, currentdate,transactionId,payment,status,scholarship
        }
        console.log(appliedScholarshipData)

        const res2 = await axiosSecure.post('/appliedScholarshipByUser', appliedScholarshipData)
        if (res2.data?.insertedId) {
            Swal.fire({
                icon: "success",
                title: `Your scholarship is under review. Thank You!`,
                showConfirmButton: false,
                timer: 1500
            });
            setLoading(false);
            e.target.reset();
            navigate('/');
        }
    }

    return (
        <div className="mt-5">
            {
                loading
                    ?
                    <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars text-yellow-300 w-24"></span></div> 
                    :
                    <form onSubmit={handlePaymentFormSubmit} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
                        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-md dark:bg-gray-50">
                            <div className="space-y-2 col-span-full lg:col-span-1">
                                <p className="font-medium text-[18px]">Fill the necessary information</p>
                            </div>
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="firstname" className="font-medium">Applicant Phone Number</label>
                                    <input id="firstname" name="applicantphone" type="text" placeholder="+880" className="w-full rounded-md border py-2 pl-1" required />
                                </div>


                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="lang" className="font-medium">Applicant Gender</label>
                                    <br />
                                    <select className="pl-1 border w-full rounded-md py-2" name="applicantgender" id="lang">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="firstname" className="font-medium">Applicant Photo</label>
                                    <br />
                                    <input id="firstname" name="applicantimage" type="file" className="w-full rounded-md border py-2 pl-1" required />
                                </div>

                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="lang" className="font-medium">Applying Degree</label>
                                    <br />
                                    <select className="pl-1 border w-full rounded-md py-2" name="applicantdegree" id="lang">
                                        <option value="Diploma">Diploma</option>
                                        <option value="Bachelor">Bachelor</option>
                                        <option value="Masters">Masters</option>
                                    </select>
                                </div>

                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="firstname" className="font-medium">Country</label>
                                    <input id="firstname" name="country" type="text" placeholder="Location" className="w-full rounded-md border py-2 pl-1" required />
                                </div>

                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="img" className="font-medium" >District</label>
                                    <input id="img" name="district" type="text" placeholder="Location" className="w-full rounded-md border py-2 pl-1" required />
                                </div>
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="img" className="font-medium" >Village</label>
                                    <input id="img" name="village" type="text" placeholder="Location" className="w-full rounded-md border py-2 pl-1" required />
                                </div>
                                <br />
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="img" className="font-semibold">SSC or O-Level GPA</label>
                                    <input id="img" name="ssc" type="text" placeholder="GPA of 5 best subject" className="w-full rounded-md border py-2 pl-1" required />
                                </div>
                                <br />
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="img" className="font-semibold">HSC or A-Level GPA</label>
                                    <input id="img" name="hsc" type="text" placeholder="GPA of 5 best subject" className="w-full rounded-md border py-2 pl-1" required />
                                </div>
                                <br />
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="lang" className="font-medium">Study Gap</label>
                                    <br />
                                    <select className="pl-1 border w-full rounded-md py-2" name="studygap" id="lang">
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>


                        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-md dark:bg-gray-50">
                            <div className="space-y-2 col-span-full lg:col-span-1">
                                <p className="font-medium text-[18px]">University Information</p>
                            </div>
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="firstname" className="font-medium">University Name</label>
                                    <input defaultValue={universityname} disabled id="firstname" name="universityname" type="text" placeholder="University Name" className="w-full rounded-md border py-2 pl-1" required />
                                </div>



                                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="lang" className="font-medium">Subject Category</label>
                                        <br />
                                        <select disabled defaultValue={subjectcategory} className="pl-1 border w-full rounded-md py-2" name="subjectcategory" id="lang">
                                            <option value="Agriculture">Agriculture</option>
                                            <option value="Engineering">Engineering</option>
                                            <option value="Doctor">Doctor</option>
                                        </select>
                                    </div>

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="lang" className="font-medium">Scholarship Category</label>
                                        <br />
                                        <select disabled className="pl-1 border w-full rounded-md py-2" defaultValue={scholarshipCategory} name="scholarshipcategory" id="lang">
                                            <option value="Full fund">Full fund</option>
                                            <option value="Partial">Partial</option>
                                            <option value="Self-fund">Self-fund</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </fieldset>


                        <div className="flex justify-end">
                            <input type="submit" value="Submit" className="border py-2 rounded-lg font-medium bg-yellow-300 w-[150px] cursor-pointer" />
                        </div>
                    </form>
            }
        </div>
    );
};

export default PostPaymentForm;