import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";


const AllDeliveryMen = () => {
    return (
        <div>
            <Helmet>
                <title>DOE Courier || All Delivery Men</title>
            </Helmet>
            <SectionTitle heading={"All Delivery Men"}></SectionTitle>
        <div>
            <div className="overflow-x-auto">
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
                        <tr>
                            <td>1 </td>
                            <td>Akas </td>
                            <td>01245336</td>
                            <td>12/04/2024</td>
                            <td> new Date()</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
        </div>
    );
};

export default AllDeliveryMen;