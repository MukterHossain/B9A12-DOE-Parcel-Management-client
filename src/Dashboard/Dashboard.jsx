import { Link, NavLink, Outlet } from "react-router-dom";
import { FaAd, FaCalendar, FaEnvelope, FaHome, FaList, FaUsers } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useDeliverMen from "../hooks/useDeliverMen";
import { Helmet } from "react-helmet-async";
import { MdReviews } from "react-icons/md";
import { AiFillProduct, AiOutlineBars } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import { GrUserWorker } from "react-icons/gr";
import { SiDatabricks } from "react-icons/si";
import useUser from "../hooks/useUser";
import { useState } from "react";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isDeliveryMen] = useDeliverMen();
    const [isUser] = useUser()



    const [isActive, setActive] = useState(false)

    const handleToggle = () => {
        setActive(!isActive)
    }
    // const handleSidebarToggle = () => {
    //     setActive(false)
    // }


    return (
        <>
            <Helmet>
                <title>DOE Courier || Dashboard</title>
            </Helmet>
            {/* dashboard side bar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>
                            <img
                                // className='hidden md:block'
                                src='https://i.ibb.co/pJtsy6q/logo.png'
                                alt='logo'
                                width='70'
                                height='70'
                            />
                        </Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
                >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div>
            <div className='relative h-screen md:flex'>
                {/* <div className={`w-full flex justify-between`}>className={`z-10 absolute md:static flex flex-col justify-between overflow-x-hidden bg-gray-100 w-56 lg:w-64 space-y-6 px-2 py-2  inset-y-0 left-0 transform ${!isActive && '-translate-x-full'
                        }  md:translate-x-0  transition duration-200 ease-in-out`} */}
                <div className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}>
                    <div>
                        <div>
                            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-100 mx-auto'>
                                <Link to='/'>
                                    <img
                                        // className='hidden md:block'
                                        src='https://i.ibb.co/pJtsy6q/logo.png'
                                        alt='logo'
                                        width='80'
                                        height='80'
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className=" mt-2">
                            <ul className="menu space-y-2">
                                {
                                    isAdmin && <>
                                        <h1 className="flex justify-center items-center gap-2 text-sm md:text-lg font-semibold bg-blue-200 rounded-lg py-1 mx-1"><FaHome></FaHome> Admin</h1>
                                        <li>
                                            <NavLink to="/dashboard/statistics" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                                <FcStatistics></FcStatistics>
                                                Statistics</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/allParcels" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                                <AiFillProduct></AiFillProduct>
                                                All Parcels</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/users" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                                <FaUsers></FaUsers>
                                                All Users</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/deliveryMen" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                                <GrUserWorker></GrUserWorker>
                                                All Delivery Men</NavLink>
                                        </li>
                                    </>
                                }
                                {
                                    isDeliveryMen && <>
                                        <h1 className="flex justify-center items-center gap-2 text-lg font-semibold bg-purple-200 rounded-lg py-1 mx-1"><FaHome></FaHome> Delivery Men</h1>
                                        <li>
                                            <NavLink to={`/dashboard/deliveryList`} className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                                <FaList></FaList>
                                                Delivery List</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/reviews" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                                <MdReviews></MdReviews>
                                                My Reviews</NavLink>
                                        </li>

                                    </>
                                }

                                {isUser &&
                                    <>
                                        <h1 className="flex justify-center items-center gap-2 text-lg font-semibold bg-yellow-200 rounded-lg py-1 mx-1"><FaHome></FaHome> User</h1>
                                        <li>
                                            <NavLink to="/dashboard/bookParcel" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                                <FaCalendar></FaCalendar>
                                                Book a Parcel</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/myParcel" className={({ isActive }) => `transition-colors duration-300 transform text-sm  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                                <FaAd></FaAd>
                                                My Parcels</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/profile" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                                <FaList></FaList>
                                                My Profile</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/dashboard/myBooking" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                                <SiDatabricks></SiDatabricks>
                                                My Booking</NavLink>
                                        </li>
                                    </>
                                }

                            </ul>
                        </div>
                    </div>

                    <div className="">
                        <ul className="menu">
                            <div className="divider "></div>

                            <li className="">
                                <NavLink to="/" >
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
                </div>

                {/* dashboard content   onClick={handleSidebarToggle}*/}
                <div className="flex-1 md:ml-64" >
                    <div className='p-5'>
                        <Outlet />
                    </div>
                </div> 
            </div>
        </>
    );
};

export default Dashboard;