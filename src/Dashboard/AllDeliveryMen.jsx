import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";


const AllDeliveryMen = () => {
    const axiosSecure = useAxiosSecure()


    const { data:deliveryMens = [], isLoading, } = useQuery({
        queryKey: ['all-delivery-men/deliveryMen'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/all-delivery-men/deliveryMen`)
            return data;
        }
    })
    console.log(deliveryMens);
    // console.log(deliveryMens?.totalDelivered);
    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <Helmet>
                <title>DOE Courier || All Delivery Men</title>
            </Helmet>
            <SectionTitle heading={"All Delivery Men"}></SectionTitle>
        <div className=" -mx-4 sm:-mx-4 px-4 sm:px-8 py-4 overflow-x-auto">           
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Delivery Mans Name</th>
                            <th>Phone Number</th>
                            <th>Number of parcel delivered</th>
                            <th>Average review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {deliveryMens?.map((item, index) =><tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item?.name} </td>
                            <td>{item?.phone} </td>
                            <td>{item?.parcelsDelivered || 0} </td>
                            <td>{item?.avgReview || 0} </td>
                        </tr> )}
                        
                    </tbody>

                </table>
            </div>
        </div>
        </div>
    );
};

export default AllDeliveryMen;