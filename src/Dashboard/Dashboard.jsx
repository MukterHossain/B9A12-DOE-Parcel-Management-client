import { Link,  NavLink, Outlet } from "react-router-dom";
import { FaAd, FaCalendar, FaEnvelope, FaHome, FaList, FaUsers } from "react-icons/fa";
import useAdmin from "../hooks/useAdmin";
import useDeliverMen from "../hooks/useDeliverMen";
import { Helmet } from "react-helmet-async";
import { MdReviews } from "react-icons/md";
import { AiFillProduct } from "react-icons/ai";
import { FcStatistics } from "react-icons/fc";
import { GrUserWorker } from "react-icons/gr";
import { SiDatabricks } from "react-icons/si";
// import { FaBars } from "react-icons/fa6";
// import useAuth from "../hooks/useAuth";
import useUser from "../hooks/useUser";
// import { useState } from "react";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isDeliveryMen] = useDeliverMen();
    const [isUser] = useUser()
    
  
    // console.log(isAdmin, isDeliveryMen, isUser);
    // const [isActive, setActive] = useState(false)

    // const handleToggle = () => {
    //     setActive(!isActive)
    // }

    //   const toggleHandler = event => {
    //     setToggle(event.target.checked)
    //   }

    return (
        <>
            <Helmet>
                <title>DOE Courier || Dashboard</title>
            </Helmet>
            {/* dashboard side bar */}
            {/* <div className='bg-gray-100 w-full text-gray-800 flex  justify-between md:hidden'>
                <div className='block cursor-pointer p-4 font-bold'>
                    <Link to='/'>
                        <img src='https://i.ibb.co/pJtsy6q/logo.png' alt='logo' width='100' height='100' />
                    </Link>
                </div>
                <button onClick={handleToggle} className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200' >
                    <AiOutlineBars className='h-5 w-5' />
                </button>
            </div> */}
            {/* <div className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                }  md:translate-x-0  transition duration-200 ease-in-out`}>Hello Love for you</div> */}
            <div className={`flex justify-between`}>
                <div className="w-52 md:w-64   bg-sky-200 ">
                    <div className="flex flex-col min-h-screen justify-between  mt-2">
                        <div className="">
                            <ul className="menu">
                                {
                                    isAdmin && <>
                                        <div className="flex items-center rounded-xl my-2 mx-3">
                                            <Link to='/'>
                                                <img src='https://i.ibb.co/pJtsy6q/logo.png' alt='logo' width='80' height='80' />
                                            </Link>
                                        </div>
                                        <h1 className="flex justify-center items-center gap-2 text-sm md:text-lg font-semibold bg-blue-200 rounded-lg py-1 mx-1"><FaHome></FaHome> Admin Home</h1>
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
                                        <div className="flex items-center rounded-xl my-2 mx-3">
                                            <Link to='/'>
                                                <img src='https://i.ibb.co/pJtsy6q/logo.png' alt='logo' width='80' height='80' />
                                            </Link>
                                        </div>
                                        <h1 className="flex justify-center items-center gap-2 text-lg font-semibold bg-purple-200 rounded-lg py-1 mx-1"><FaHome></FaHome> Delivery Men Home</h1>
                                        {/* <li>
                                    <NavLink to="/dashboard/deliveryHome" className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                        <FaHome></FaHome>
                                        Delivery Men Home</NavLink>
                                </li> */}
                                        <li>
                                            <NavLink to={`/dashboard/deliveryList`} className={({ isActive }) => `transition-colors duration-300 transform  hover:bg-gray-300 ${isActive ? 'bg-green-400 ' : ' '}`}>
                                                <FaList></FaList>
                                                My Delivery List</NavLink>
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
                                        <div className="flex items-center rounded-xl my-2 mx-3">
                                            <Link to='/'>
                                                <img src='https://i.ibb.co/pJtsy6q/logo.png' alt='logo' width='80' height='80' />
                                            </Link>
                                        </div>
                                        <h1 className="flex justify-center items-center gap-2 text-lg font-semibold bg-yellow-200 rounded-lg py-1 mx-1"><FaHome></FaHome> User Home</h1>
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
                </div>

                {/* dashboard content */}
                <div className="flex-1  p-8">
                    {/* <p>Welcome Dashboard</p> */}
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
};

export default Dashboard;