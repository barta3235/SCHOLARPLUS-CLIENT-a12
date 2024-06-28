import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const Message = () => {
    const axiosSecure = useAxiosSecure();

    const { data: messages, refetch } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/getInTouch')
            return res.data;
        }
    })

    const handleDelete = async (id) => {
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
                const res2 = await axiosSecure.delete(`/getInTouch/${id}`)
                if (res2.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Message Deleted!",
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
                messages
                    ?
                    <div>
                        <h1 className="py-1 px-2 rounded-full text-xs mb-[30px] bg-white w-[100px] border-2 border-yellow-300 text-center font-medium">Applied - {messages.length}</h1>
                        <div className="overflow-x-auto">
                            <table className="table text-center">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Message</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        messages.map((eachMessage, idx) => <tr key={eachMessage._id}>
                                            <td>{idx + 1}</td>
                                            <td>{eachMessage?.name}</td>
                                            <td>{eachMessage?.email}</td>
                                            <td className="text-xs">{eachMessage?.message}</td>


                                            <td><button onClick={() => handleDelete(eachMessage?._id)} ><MdDelete                                                className="text-[18px]" /></button></td>

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

export default Message;