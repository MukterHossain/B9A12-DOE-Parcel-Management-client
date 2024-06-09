import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";


const MyParcel = () => {
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
                            <th>Requested Delivery Date</th>
                            <th>Approximate Delivery Date</th>
                            <th>Delivery Men ID</th>
                            <th>Booking Status</th>
                            <th>Update</th>
                            <th>Cancel</th>
                            <th>Review</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        <tr>
                            <td>1 </td>
                            <td>Akas </td>
                            <td>01245336</td>
                            <td>12/04/2024</td>
                            <td> new Date()</td>
                            <td>1240</td>
                            <td>pending</td>
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
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    </div>
    );
};

export default MyParcel;