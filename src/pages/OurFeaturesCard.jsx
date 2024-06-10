

const OurFeaturesCard = ({ item }) => {
    const { icon, title, description, totalBooked, totalDelivered, totalUser } = item;
    // console.log(item)
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-xl">
                <img className="w-[80px] h-[70px]" src={icon} alt="" />
                <div className="card-body">
                    <h2 className="card-title uppercase text-blue-600 font-bold">{title}</h2>
                    <p>{description}</p>
                    <hr />
                    <div className="space-y-2">
                        <p>Total Booked: <span className="text-blue-600 font-bold">{totalBooked}</span></p>
                        <p>Total Delivered: <span className="text-blue-600 font-bold">{totalDelivered}</span></p>
                        <p>Total User: <span className="text-blue-600 font-bold">{totalUser}</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurFeaturesCard;