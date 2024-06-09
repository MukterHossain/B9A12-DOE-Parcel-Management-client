import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaUsers, FaUtensils } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useDeliverMen from "../hooks/useDeliverMen";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const isDeliveryMen = useDeliverMen();
    return (
        <div className="flex">
            <Helmet>
                <title>DOE Courier || Dashboard</title>
            </Helmet>
            {/* dashboard side bar */}
            <div className="w-60 min-h-screen bg-orange-400">
                <ul className="menu">

                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to="/dashboard/adminHome">
                                    <FaHome></FaHome>
                                    Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/allParcels">
                                    <FaUtensils></FaUtensils>
                                    All Parcels</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/deliveryMen">
                                    <FaBook></FaBook>
                                    All Delivery Men</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/statistics">
                                    <FaList></FaList>
                                    Statistics</NavLink>
                            </li>
                        </>
                            : 
                            isDeliveryMen ? <>
                                <li>
                                    <NavLink to="/dashboard/deliveryHome">
                                        <FaHome></FaHome>
                                        Delivery Men Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/deliveryList">
                                        <FaList></FaList>
                                        My Delivery List</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reviews">
                                        <FaCalendar></FaCalendar>
                                        My Reviews</NavLink>
                                </li>
                                
                            </>
                            : 
                            <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookParcel">
                                        <FaCalendar></FaCalendar>
                                        Book a Parcel</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/myParcel">
                                        <FaAd></FaAd>
                                        My Parcels</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/profile">
                                        <FaList></FaList>
                                        My Profile</NavLink>
                                </li>
                            </>
                    }
                    <div className="divider"></div>

                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact">
                            <FaEnvelope></FaEnvelope>
                            Contact</NavLink>
                    </li>
                </ul>
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-6">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;