import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";


const MyProfile = () => {
    return (
        <div>
            <Helmet>
                <title>DOE Courier || My Profile</title>
            </Helmet>
            <SectionTitle heading={"My Parcels"}></SectionTitle>
            <h2>My Profile</h2>
        </div>
    );
};

export default MyProfile;