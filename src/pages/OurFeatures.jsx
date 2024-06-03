
import { useEffect } from "react";
import SectionTitle from "../Shared/SectionTitle";
import { useState } from "react";
import OurFeaturesCard from "./OurFeaturesCard";


const OurFeatures = () => {
    const [menu, setMenu] = useState();

    useEffect(() => {
        // fetch('features.json')
        fetch('menu.json')
        .then(res => res.json())
        .then(data => {
            setMenu(data)
        })
    }, [])
    console.log(menu)
    return (
        <div>
            <SectionTitle heading={"Our Features"} subHeading={"Traditional couriers have a fleet of vehicles like motorcycle, car, van, and truck to transport goods from one location to another"}></SectionTitle>
            <div className="grid md:grid-cols-3 gap-4">
                {
                menu?.map(item => <OurFeaturesCard key={item.id} item={item}></OurFeaturesCard>)
                }               
            </div>

        </div>
    );
};

export default OurFeatures;