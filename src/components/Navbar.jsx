import { Link, NavLink } from "react-router-dom";
import avatarImg from '../assets/profile.jpg'
import { MdNotificationsActive } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { useState } from "react";


const Navbar = () => {
    const { user, logOutUser } = useAuth()
    const [isOpen, setIsOpen] = useState(false)



    const handleLogOut = () => {
        logOutUser()
            .then(() => { })
            .catch(error => console.log(error))
    }

    const navOption = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
        <li><NavLink to='/contact'>Contact Us</NavLink></li>
    </>
   



    return (
        <>
            <div className="navbar fixed bg-black bg-opacity-60 max-w-screen-xl mx-auto text-white z-10 shadow-sm">
                <div className="navbar-start ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOption}
                        </ul>
                    </div>

                    <div>
                        <Link to='/'>
                            <div className="flex items-center">
                                <img
                                    src={"https://i.ibb.co/pJtsy6q/logo.png"}
                                    alt='logo'
                                    width='70'
                                    height='70'
                                />
                                <h2><span className="text-3xl font-bold text-blue-700">DOE</span> <span className="text-sm text-green-700 font-bold">Courier</span></h2>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOption}
                    </ul>
                </div>

                <div className="navbar-end">
                    <div>
                        <Link to="/dashboard/adminHome">
                            <MdNotificationsActive className="text-xl mr-4"></MdNotificationsActive>
                        </Link>
                    </div>
                    <div className='relative'>
                        <div className='flex flex-row items-center gap-3'>
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className='p-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                            >
                                <div className=''>
                                    <img
                                        className='rounded-full'
                                        referrerPolicy='no-referrer'
                                        title={user?.displayName}
                                        src={user && user.photoURL ? user.photoURL : avatarImg}
                                        alt='profile'
                                        height='40'
                                        width='40'
                                    />
                                </div>
                            </div>
                        </div>

                        {isOpen && (
                            <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                                <div className='flex flex-col cursor-pointer'>
                                    <Link
                                        to='/'
                                        className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                                    >
                                        Home
                                    </Link>

                                    {user ? (
                                        <>
                                            <Link
                                                to='/dashboard'
                                                className='block  px-4 py-3 hover:bg-neutral-100 text-black  transition font-semibold'
                                            >
                                                Dashboard
                                            </Link>
                                            <div
                                                onClick={handleLogOut}
                                                className='px-4 py-3 hover:bg-neutral-100 text-black  transition font-semibold cursor-pointer'
                                            >
                                                Logout
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to='/login'
                                                className='px-4 py-3 hover:bg-neutral-100 text-black transition font-semibold'
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to='/signup'
                                                className='px-4 py-3 hover:bg-neutral-100 text-black  transition font-semibold'
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Navbar;