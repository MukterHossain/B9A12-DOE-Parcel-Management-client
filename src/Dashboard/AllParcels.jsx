import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";


const AllParcels = () => {
    return (
        <div>
            <Helmet>
                <title>DOE Courier || All Parcels</title>
            </Helmet>
            <SectionTitle heading={"Booked parcels"}></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Booking Date</th>
                                <th>Requested Delivery Date</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th>Manage</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td>1 </td>
                                <td>Akas </td>
                                <td>01245336</td>
                                <td>12/04/2024</td>
                                <td>12/04/2024</td>
                                <td>1240</td>
                                <td>pending</td>
                                <td>
                                    <button className="btn btn-sm">
                                        ma
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

export default AllParcels;