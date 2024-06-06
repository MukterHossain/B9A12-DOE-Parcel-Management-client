

const OurFeaturesCard = ({item}) => {
    const {icon, title, description, totalBooked,totalDelivered,totalUse } = item;
    // console.log(item)
    return (
        <div>
            <div className="card card-compact w-full bg-base-100 shadow-xl">
                <img className="w-[80px] h-[70px]" src={icon} alt="" />
                <div className="card-body">
                    <h2 className="card-title uppercase text-blue-600 font-bold">{title}</h2>
                    <p>{description}</p>
                    <p>Total Booked: {totalBooked}</p>
                    <p>Total Delivered: {totalDelivered}</p>
                    <p>Total User: {totalUse}</p>
                </div>
            </div>
        </div>
    );
};

export default OurFeaturesCard;