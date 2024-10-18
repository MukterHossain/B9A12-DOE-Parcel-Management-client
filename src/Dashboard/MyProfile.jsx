import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const MyProfile = () => {
    const { register, handleSubmit, reset } = useForm()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()


    const { data: userProfile = [], refetch } = useQuery({
        queryKey: ['users'.user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userProfile/${user?.email}`)
            return res.data;
        }
    })
    const { data: userRole = [] } = useQuery({
        queryKey: ['userRole'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userRole`)
            return res.data;
        }
    })
    // console.log(userRole)
    const { _id } = userProfile;
    console.log('User Id', _id)

    // Image upload
    const onSubmit = async (data) => {
        console.log(data)

        try {
            const imageFile = { image: data.image[0] }
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const image_url = res.data.data.display_url
            if (res.data.success) {
                const image = { image: image_url }
                const imageData = await axiosSecure.put(`/updateImage/${_id}`, image)
                Swal.fire("Updated Image Successfully")              
                reset()
            }
            refetch()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Helmet>
                <title>DOE Courier || My Profile</title>
            </Helmet>
            <SectionTitle heading={"My Profile"}></SectionTitle>
            <div className='  bg-pink-100 hover:scale-105 transition-all shadow-xl rounded-2xl w-full md:w-4/5 lg:w-3/5 mx-auto'>
                <img
                    alt='profile'
                    src='https://i.ibb.co/KsFzrPr/social-service5.jpg'
                    className='w-full mb-4 rounded-t-lg h-36'
                />
                <div className='flex flex-col items-center justify-center p-4 -mt-16'>
                    <a href='#' className='relative block'>
                        {<img
                            alt='profile'
                            src={userProfile && userProfile?.image ? userProfile?.image : user?.photoURL}
                            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
                        />}
                    </a>

                    <p className='p-2 px-4 text-xs font-bold uppercase text-white bg-orange-500 rounded-full'>
                        {userRole?.role}
                    </p>
                    <p className='mt-2 text-sm md:text-xl font-medium text-gray-800 '>
                        User Id: {userProfile?._id}
                    </p>
                    <div className='w-full p-2 mt-4 rounded-lg'>
                        <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-between text-sm text-gray-600 '>
                            <p className=''> User Name : <span className='font-bold text-black text-sm md:text-xl '>{user?.displayName} </span>
                            </p>
                            <p className=''>Email: <span className='font-bold text-black '>{user?.email}</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-control space-y-2 grid grid-cols-1 md:grid-cols-2 items-center justify-between">
                                <input {...register("image", { required: true })} type="file" className="file-input w-full max-w-xs" />
                                <button className="btn btn-success bg-green-400 w-full">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;