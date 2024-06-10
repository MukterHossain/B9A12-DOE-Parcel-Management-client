import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaCalendar, FaEnvelope, FaHome, FaList, FaUsers } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useDeliverMen from "../hooks/useDeliverMen";
import { Helmet } from "react-helmet-async";
import { MdReviews } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import { GrUserWorker } from "react-icons/gr";

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
                                    <AiFillProduct></AiFillProduct>
                                    All Parcels</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/users">
                                    <FaUsers></FaUsers>
                                    All Users</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/deliveryMen">
                                    <GrUserWorker></GrUserWorker>
                                    All Delivery Men</NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/statistics">
                                    <FcStatistics></FcStatistics>
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
                                        <MdReviews></MdReviews>
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