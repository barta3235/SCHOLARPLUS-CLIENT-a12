import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { MdDelete } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageUsersAdmin = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allUsers, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allUsersByAdmin')
            return res?.data;
        }
    })

    const handleChangeRole = async (e, id) => {
        console.log(id);

        const ur = e.target.value;

        const role = {
            roleChange: ur
        }

        console.log(role);

        const res32 = await axiosSecure.put(`/userRoleChangeByAdmin/${id}`, role)
        if (res32.data.modifiedCount > 0) {
            Swal.fire({
                icon: "success",
                title: `Role Updated`,
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }


    }

    const handleDelete=(id)=>{
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
                const res1 = await axiosSecure.delete(`/deleteUserByAdmin/${id}`)
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

    return (
        <div className="mt-[40px]">
            {
                allUsers
                    ?
                    <div>
                        <h1 className="py-1 px-2 rounded-full text-xs mb-[30px] bg-white w-[100px] border-2 border-yellow-300 text-center font-medium">Applied - {allUsers.length}</h1>
                        <div className="overflow-x-auto">
                            <table className="table text-center">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Photo</th>
                                        <th>User Name</th>
                                        <th>User Email</th>
                                        <th>Role</th>
                                        <th>Change Role To</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allUsers.map((eachUserData, idx) => <tr key={eachUserData._id}>
                                            <td>{idx + 1}</td>
                                            <td className="w-[90px] h-[75px]"><img className="w-full h-full" src={eachUserData?.photo} alt="" /></td>
                                            <td>{eachUserData?.name}</td>
                                            <td>{eachUserData?.email}</td>
                                            <td>{eachUserData?.role ? eachUserData?.role : 'user'}</td>
                                            {
                                                eachUserData.role === 'admin'
                                                    ?
                                                    <td className="font-medium bg-yellow-200">Admin</td>
                                                    :
                                                    <td><form>
                                                        <select onChange={(e) => handleChangeRole(e, eachUserData?._id)} defaultValue={eachUserData?.role} className="border rounded-md" name="applicationstatus" id="ppc">
                                                            <option value="user">User</option>
                                                            <option value="moderator">moderator</option>
                                                            <option value="admin">admin</option>
                                                        </select>
                                                    </form></td>
                                            }

                                            <td><button onClick={() => handleDelete(eachUserData?._id)} ><MdDelete
                                                className="text-[18px]" /></button></td>


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

export default ManageUsersAdmin;