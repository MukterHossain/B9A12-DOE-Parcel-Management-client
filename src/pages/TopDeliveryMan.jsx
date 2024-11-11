import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../Shared/SectionTitle";
import TopDeliveryManCard from "./TopDeliveryManCard"
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxiosPublic from "../hooks/useAxiosPublic";


const TopDeliveryMan = () => {

    const axiosPublic = useAxiosPublic();


    const { data: topDeliveryMen = [], isLoading } = useQuery({
        queryKey: ['topDeliMen'],
        queryFn: async () => {
            const res = await axiosPublic.get('/topDeliMen')
            return res.data;
        }
    })

   

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div className="my-20">
            <SectionTitle heading={"Top Delivery Man"} subHeading={"Traditional couriers have a fleet of vehicles like motorcycle, car, van, and truck to transport goods from one location to another"}></SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
                {
                topDeliveryMen?.map(item => <TopDeliveryManCard key={item._id} item={item}></TopDeliveryManCard>)
                
                }               
            </div>
        </div>
    );
};

export default TopDeliveryMan;