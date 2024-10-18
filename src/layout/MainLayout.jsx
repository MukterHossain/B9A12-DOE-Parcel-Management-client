import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
    const location = useLocation();
    console.log(location)
    // <div className='max-w-screen-xl mx-auto'>
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div className="max-w-screen-xl mx-auto">
            {noHeaderFooter || <Navbar></Navbar>}
            <div className="">
                <Outlet></Outlet>
            </div>
            { noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;