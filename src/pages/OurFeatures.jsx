
import SectionTitle from "../Shared/SectionTitle";
import OurFeaturesCard from "./OurFeaturesCard";
import useFeatureMenu from "../hooks/useFeatureMenu";


const OurFeatures = () => {
    const [features] = useFeatureMenu()

    return (
        <div>
            <SectionTitle heading={"Our Features"} subHeading={"Traditional couriers have a fleet of vehicles like motorcycle, car, van, and truck to transport goods from one location to another"}></SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-4">
                {
                features?.map(item => <OurFeaturesCard key={item.id} item={item}></OurFeaturesCard>)
                }               
            </div>

        </div>
    );
};

export default OurFeatures;