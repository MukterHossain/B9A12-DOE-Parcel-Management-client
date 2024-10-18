import CountUp from 'react-countup';

const OurFeaturesCard = ({ item,featureNum }) => {
    const { icon, title, description } = item;
   
    return (
        <div>
            <div className="card card-compact w-full text-black bg-pink-100 hover:scale-105 transition-all shadow-xl ">
                <img className="w-[80px] h-[70px] pt-3 pl-4 group-hover:scale-125" src={icon} alt="" />
                <div className="card-body">
                    <h2 className="card-title uppercase text-blue-600 font-bold">{title}</h2>
                    <p>{description}</p>
                    <hr />
                    <div className="space-y-2">
                        <p>Total Booked: <span className="text-blue-600 font-bold"> <CountUp duration={2.5} end={featureNum?.totalBooked}></CountUp></span></p>
                        <p>Total Delivered: <span className="text-blue-600 font-bold"><CountUp duration={2.5} end={featureNum?.totalDelivered}></CountUp></span></p>
                        <p>Total User: <span className="text-blue-600 font-bold"><CountUp duration={2.5} end={featureNum?.totalUser}></CountUp></span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurFeaturesCard;