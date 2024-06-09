import SectionTitle from "../Shared/SectionTitle";
import useFeatureMenu from "../hooks/useFeatureMenu";
import TopDeliveryManCard from "./TopDeliveryManCard";


const TopDeliveryMan = () => {
    const [features] = useFeatureMenu()
    return (
        <div className="my-20">
            <SectionTitle heading={"Top Delivery Man"} subHeading={"Traditional couriers have a fleet of vehicles like motorcycle, car, van, and truck to transport goods from one location to another"}></SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
                {
                features?.map(item => <TopDeliveryManCard key={item._id} item={item}></TopDeliveryManCard>)
                }               
            </div>
        </div>
    );
};

export default TopDeliveryMan;