

const TopDeliveryManCard = ({item}) => {
    
    return (
        <div>
            <div className="card card-compact text-black w-full shadow-xl bg-rose-100 hover:scale-105 transition-all ">
                <img className="w-1/4 min-h-24 rounded-full mx-auto  group-hover:scale-125" src={item?.image} alt="" />
                <div className="card-body ">
                    <h2 className="card-title "><span className="text-xl font-semibold text-gray-800">Delivery Man Name:</span> <span className="uppercase text-blue-600 text-2xl font-bold">{item?.name}</span></h2>
                    <p className="text-sm font-semibold text-gray-800">Total Booked: <span className=" text-blue-600 text-xl font-bold">{item?.parcelsDelivered || 0}</span></p>
                    <p className="text-sm font-semibold text-gray-800">Total Delivered: <span className="text-blue-600 text-lg font-bold">{item?.averageRating}</span></p>
                </div>
            </div>
        </div>
    );
};

export default TopDeliveryManCard;