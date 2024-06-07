
import Banner from "../pages/Banner";
import OurFeatures from "../pages/OurFeatures";
import { Helmet } from 'react-helmet-async';
import TopDeliveryMan from "../pages/TopDeliveryMan";


const Home = () => {
    const result = 60;
    const result1 = 50;


    return (
        <div className="">
            <div>
            <Helmet>
                <title>DOE Courier || Home</title>
            </Helmet>
            </div>
            <Banner></Banner>
            <OurFeatures></OurFeatures>
            <TopDeliveryMan></TopDeliveryMan>
            <button className="btn btn-outline">
                {result > '50' ? <li>Item 1</li> : result1 > '40' ? <li>Item 2</li> :  <li>Item 3</li> }
            </button>
        </div>
    );
};

export default Home;