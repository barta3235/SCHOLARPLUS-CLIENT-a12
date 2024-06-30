import axios from "axios";

export const axiosPublic= axios.create({
    baseURL:'https://m12-a12-server.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;