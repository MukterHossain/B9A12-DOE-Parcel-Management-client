import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


const MainLayout = () => {
    const location = useLocation();
    console.log(location)
    const noHeaderFooter = location.pathname.includes('login')
    return (
        <div className="">
            {noHeaderFooter || <Navbar></Navbar>}
            <div>
                <Outlet></Outlet>
            </div>
            { noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;