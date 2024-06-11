import axios from "axios";



const axiosPublic = axios.create({
    baseURL:'https://y-red-five.vercel.app'
})
const useAxiosPublic = () => {

    return axiosPublic;
};

export default useAxiosPublic;