import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";


const DeliveryList = () => {
    return (
        <div>
            <Helmet>
                <title>DOE Courier || Delivery List</title>
            </Helmet>
            <h1>Delivery List</h1>
            <SectionTitle heading={"Delivery List"}></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>User Name</th>
                                <th>Reci. Name</th>
                                <th>User Phone</th>
                                <th>Re. Date</th>
                                <th>Appr. Date</th>
                                <th>Re. phone nu.</th>
                                <th>Reci Address</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            <tr>
                                <td>1 </td>
                                <td>Akas </td>
                                <td>012</td>
                                <td>2024</td>
                                <td>12024</td>
                                <td>1240</td>
                                <td>pending</td>
                                <td>pending</td>
                                <td>
                                    <button className="btn btn-sm">
                                    Loca
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-sm">
                                    Cancel
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-sm">
                                    Deliver
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

export default DeliveryList;