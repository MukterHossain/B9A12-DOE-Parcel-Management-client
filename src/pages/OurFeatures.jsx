import SectionTitle from "../Shared/SectionTitle";


const OurFeatures = () => {
    return (
        <div>
            <SectionTitle heading={"Our Features"} subHeading={"Traditional couriers have a fleet of vehicles like motorcycle, car, van, and truck to transport goods from one location to another"}></SectionTitle>
            <div className="grid md:grid-cols-3 gap-4">
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <img src="Icon" alt="" />
                    <div className="card-body">
                        <h2 className="card-title">{"Parcel Safety Guarantee"}</h2>
                        <p>Rest easy knowing that your parcels are in safe hands. Our robust safety measures ensure that your items are securely packaged, handled with care, and protected against damage or loss during transit.</p>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <img src="Icon" alt="" />
                    <div className="card-body">
                        <h2 className="card-title">{"Parcel Safety Guarantee"}</h2>
                        <p>Rest easy knowing that your parcels are in safe hands. Our robust safety measures ensure that your items are securely packaged, handled with care, and protected against damage or loss during transit.</p>
                    </div>
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <img src="Icon" alt="" />
                    <div className="card-body">
                        <h2 className="card-title">{"Parcel Safety Guarantee"}</h2>
                        <p>Rest easy knowing that your parcels are in safe hands. Our robust safety measures ensure that your items are securely packaged, handled with care, and protected against damage or loss during transit.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default OurFeatures;