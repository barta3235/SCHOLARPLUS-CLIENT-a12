import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";

const HOSTING_KEY = import.meta.env.VITE_HOSTING_API;
const HOSTING_KEY_API = `https://api.imgbb.com/1/upload?key=${HOSTING_KEY}`

const AddScholarship = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(null);


    const handleAddScholarship = async (e) => {
        setLoading(true);
        e.preventDefault();

        //imgbb creating hosting URL
        const imageFile = { image: e.target.universityimage.files[0] }
        const res = await axiosPublic.post(HOSTING_KEY_API, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        console.log('Add scholarship0', res.data);

        const form = e.target;
        const scholarshipname = form.scholarshipname.value
        const subjectcategory = form.subjectcategory.value
        const scholarshipCategory = form.scholarshipcategory.value
        const degree = form.degree.value
        const tuitionfee = form.tuitionfee.value
        const applicationfee = form.applicationfee.value
        const servicecharge = form.servicecharge.value
        const description= form.description.value
        const universityname = form.universityname.value
        const universityimage = res.data.data.display_url;
        const country = form.country.value;
        const city = form.city.value;
        const worldranking = form.worldranking.value
        const postdate = form.postdate.value;
        const applicationdeadline = form.applicationdeadline.value;
        const email = form.email.value;

        console.log(universityimage);

        const newScholarship = {
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

        //sending to database
        const res2 = await axiosSecure.post('/addScholarshipModerator', newScholarship)
        if (res2.data.insertedId) {
            Swal.fire({
                icon: "success",
                title: `New Scholarship Added`,
                showConfirmButton: false,
                timer: 1000
            });
            setLoading(false);
            e.target.reset()
        }

    }


    return (
        <div>
            {
                loading 
                ? 
                <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars text-yellow-300 w-24"></span></div> 
                : 
                <div>
                    <form onSubmit={handleAddScholarship} noValidate="" action="" className="container flex flex-col mx-auto space-y-12">
                        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-md dark:bg-gray-50">
                            <div className="space-y-2 col-span-full lg:col-span-1">
                                <p className="font-medium text-[18px]">Add Scholarship</p>
                            </div>
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">

                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="firstname" className="font-medium">Scholarship Name</label>
                                    <input id="firstname" name="scholarshipname" type="text" placeholder="Scholarship Name" className="w-full rounded-md border py-2 pl-1" required />
                                </div>


                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="lang" className="font-medium">Subject Category</label>
                                    <br />
                                    <select className="pl-1 border w-full rounded-md py-2" name="subjectcategory" id="lang">
                                        <option value="Agriculture">Agriculture</option>
                                        <option value="Engineering">Engineering</option>
                                        <option value="Doctor">Doctor</option>
                                    </select>
                                </div>

                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="lang" className="font-medium">Scholarship Category</label>
                                    <br />
                                    <select className="pl-1 border w-full rounded-md py-2" name="scholarshipcategory" id="lang">
                                        <option value="Full fund">Full fund</option>
                                        <option value="Partial">Partial</option>
                                        <option value="Self-fund">Self-fund</option>
                                    </select>
                                </div>

                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="lang" className="font-medium">Degree</label>
                                    <br />
                                    <select className="pl-1 border w-full rounded-md py-2" name="degree" id="lang">
                                        <option value="Diploma">Diploma</option>
                                        <option value="Bachelor">Bachelor</option>
                                        <option value="Masters">Masters</option>
                                    </select>
                                </div>

                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="img" className="font-medium" >Tuition Fee</label>
                                    <input id="img" name="tuitionfee" type="number" placeholder="$ 00.0" className="w-full rounded-md border py-2 pl-1" required />
                                </div>
                                <br />
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="img" className="font-semibold">Application Fee</label>
                                    <input id="img" name="applicationfee" type="number" placeholder="$ 00.0" className="w-full rounded-md border py-2 pl-1" required />
                                </div>
                                <br />
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="img" className="font-semibold">Service Charge</label>
                                    <input id="img" name="servicecharge" type="number" placeholder="$ 00.0" className="w-full rounded-md border py-2 pl-1" required />
                                </div>
                                <br />
                                <div className="col-span-full">
                                    <label htmlFor="img" className="font-semibold">Scholarship Description</label> <br />
                                    <textarea id="img" name="description"  placeholder="A brief Description" className="w-full rounded-md border py-2 pl-1 h-[120px]" required />
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
                                    <input id="firstname" name="universityname" type="text" placeholder="University Name" className="w-full rounded-md border py-2 pl-1" required />
                                </div>

                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="firstname" className="font-medium">University Image</label>
                                    <br />
                                    <input id="firstname" name="universityimage" type="file" className="w-full rounded-md border py-2 pl-1" required />
                                </div>

                                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="firstname" className="font-medium">Country</label>
                                        <input id="firstname" name="country" type="text" placeholder="Country" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="firstname" className="font-medium">City</label>
                                        <input id="firstname" name="city" type="text" placeholder="City" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>

                                    <div className="col-span-full sm:col-span-3">
                                        <label htmlFor="firstname" className="font-medium">World Ranking</label>
                                        <input id="firstname" name="worldranking" placeholder="Eg. 400" type="number" className="w-full rounded-md border py-2 pl-1" required />
                                    </div>

                                </div>
                            </div>
                        </fieldset>


                        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-md dark:bg-gray-50">
                            <div className="space-y-2 col-span-full lg:col-span-1">
                                <p className="font-medium text-[18px]">Important Dates</p>
                            </div>
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="firstname" className="font-medium">Scholarship Post Date</label>
                                    <input id="firstname" name="postdate" type="date" placeholder="Scholarship Release Date" className="w-full rounded-md border py-2 pl-1" required />
                                </div>

                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="firstname" className="font-medium">Application Deadline</label>
                                    <input id="firstname" name="applicationdeadline" type="text" placeholder="Eg. 6 Feb 24" className="w-full rounded-md border py-2 pl-1" required />
                                </div>
                            </div>
                        </fieldset>

                        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-md dark:bg-gray-50">
                            <div className="space-y-2 col-span-full lg:col-span-1">
                                <p className="font-medium text-[18px]">Benefactor Information</p>
                            </div>
                            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                <div className="col-span-full sm:col-span-3">
                                    <label htmlFor="firstname" className="font-medium">Email</label>
                                    <input id="firstname" name="email" type="text" placeholder="leroy@gmail.com" className="w-full rounded-md border py-2 pl-1" required />
                                </div>

                            </div>


                        </fieldset>


                        <div className="flex justify-end">
                            <input type="submit" value="Add Scholarship" className="border py-2 rounded-lg font-medium bg-yellow-300 w-[150px] cursor-pointer" />
                        </div>
                    </form>
                </div>
            }
        </div>
    );
};

export default AddScholarship;