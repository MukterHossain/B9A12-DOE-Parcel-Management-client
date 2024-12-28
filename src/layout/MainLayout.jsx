import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
    const location = useLocation();
    console.log(location)
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div className="max-w-screen-xl 2xl:max-w-screen-2xl  mx-auto">
            {noHeaderFooter || <Navbar></Navbar>}
            <div className='min-h-[calc(100vh-130px)]'>
                <Outlet></Outlet>
            </div>
            { noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;