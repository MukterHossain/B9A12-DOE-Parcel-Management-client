import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";


const MyProfile = () => {
    const axiosPublic = useAxiosPublic();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data;
        }
    })
    console.log(users)
    return (
        <div>
            <Helmet>
                <title>DOE Courier || My Profile</title>
            </Helmet>
            <SectionTitle heading={"My Parcels"}></SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
                {
                    users?.map(data => 
                    <div key={data._id} className="card bg-base-100 shadow-xl">
                        <div className="px-10 pt-10">
                            <img src={data.image} alt="Photo"/>
                        </div>                      
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{data.name}</h2>
                            <p>{data.email}</p>
                            <div className="card-actions">
                                <button className="btn btn-primary"> upload</button>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyProfile;