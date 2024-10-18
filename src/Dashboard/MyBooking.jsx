import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../Shared/LoadingSpinner";
import ConfettiExplosion from 'react-confetti-explosion';
import React, { useEffect } from "react";
import { useWindowSize } from 'react-use';


const MyBooking = () => {
    const [isExploding, setIsExploding] = React.useState(false);
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { width, height } = useWindowSize();

    const { data: bookedData = [], isLoading, refetch } = useQuery({
        queryKey: ['book-payment', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/book-payment/${user?.email}`)
            return data;
        }
    })

    useEffect(() => {
        if (bookedData.length > 0) {
            setIsExploding(true);
            const timer = setTimeout(() => {
                setIsExploding(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [bookedData]);
    console.log('bookedData', bookedData);


    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <>
            <Helmet>
                <title>DOE Courier || My Booking</title>
            </Helmet>
            <SectionTitle heading={"My Booking"}></SectionTitle>
            <div className="flex justify-center">
                {isExploding && <ConfettiExplosion width={width} height={height} force={0.8} duration={3000} particleCount={200} > </ConfettiExplosion>}
            </div>
            <div className=" -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                    <table className="table min-w-full">
                        {/* head */}
                        <thead >
                            <tr className=" shadow-lg rounded-md text-blue-800 font-bold">
                                <th>Parcel Type</th>
                                <th>Name</th>
                                <th>Booking Date</th>
                                <th>Cost</th>
                                <th>Transaction Id</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookedData?.map((item) => <tr key={item._id} >
                                <td>{item?.parcelType} </td>
                                <td>{item?.name} </td>
                                <td>{item?.date.slice(0, 10)}</td>
                                <td>{item?.price}</td>
                                <td>{item?.transactionId}</td>
                                <td>{item?.status}</td>
                            </tr>)}

                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
};

export default MyBooking;