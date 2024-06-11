import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";


const MyParcel = () => {
    const axiosPublic = useAxiosPublic();

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosPublic.get('/bookings')
            return res.data;
        }
    })
    // console.log(bookings)



    
    return (
        <div>
            <Helmet>
                <title>DOE Courier || My Parcel</title>
            </Helmet>
        <SectionTitle heading={"My Parcels"}></SectionTitle>
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Parcel Type</th>
                            <th>Req. Date</th>
                            <th>Ap. Date</th>
                            <th>Deli, Men ID</th>
                            <th>Booking Status</th>
                            <th>Update</th>
                            <th>Cancel</th>
                            <th>Review</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                    {bookings.map((item, index) => <tr key={item._id}>
                        
                            <td>{index + 1} </td>
                            <td>{item.parcelType} </td>
                            <td>{item.requestedDate}</td>
                            <td>{item.requestedDate}</td>
                            <td className="w-full">{item._id}</td>
                            <td >Pending</td>
                            <td>
                                <button className="btn btn-sm">
                                    updated
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-sm">
                                    cancel
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-sm">
                                    Review
                                </button>
                            </td>
                            <td>
                                <button className="btn btn-sm">
                                    pay
                                </button>
                            </td>
                        </tr> )}
                        
                    </tbody>

                </table>
            </div>
        </div>
    </div>
    );
};

export default MyParcel;