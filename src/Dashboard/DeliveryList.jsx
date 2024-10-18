import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { IoLocationSharp } from "react-icons/io5";
import { GiCancel } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import LocationMap from "../Modals/LocationMap";
import Swal from "sweetalert2";


const DeliveryList = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [currentId, setCurrentId] = useState('')


    const { data: deliveryItems = [], isLoading, refetch } = useQuery({
        queryKey: ['deliveryList',],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/deliveryList`)
            return data;
        }
    })
    function open(id) {
        setCurrentId(id)
        setIsOpen(true)

    }
    function close() {
        setIsOpen(false)
    }
    // List Status change to Cancel
    const handleCancel = async (id) => {
        const status = 'Cancel';
        const StatusChange = { status }
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Canceled it!"
            }).then(async (data) => {

                if (data.isConfirmed) {
                    const { updateData } = await axiosSecure.put(`/listStatusUpdate/${id}`, StatusChange)
                    Swal.fire({
                        title: "Canceled!",
                        text: "Your status has been Canceled.",
                        icon: "success"
                    });
                }
                // refresh data
                refetch()
            });

        }
        catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Data not Canceled',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }

    }
    //  Status change to Delivered       patch
    const handleDelivered = async (id) => {
        const status = 'Delivered';
        const deliveredChange = { status }
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delivered it!"
            }).then(async (data) => {

                if (data.isConfirmed) {
                    const { updateData } = await axiosSecure.put(`/statusDelivered/${id}`, deliveredChange)
                    Swal.fire({
                        title: "Delivered!",
                        text: "Your status has been Delivered.",
                        icon: "success"
                    });
                }
                // refresh data
                refetch()
            });

        }
        catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Data not Delivered',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        }

    }

    if (isLoading) return <LoadingSpinner></LoadingSpinner>
    return (
        <div>
            <Helmet>
                <title>DOE Courier || Delivery List</title>
            </Helmet>
            <SectionTitle heading={"Delivery List"}></SectionTitle>
            <div>
                <p>Delivery Men Name: {user?.displayName} </p>
                <div className=" -mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Receiver Name</th>
                                    <th>Phone</th>
                                    <th>Booking Date</th>
                                    <th>Re. Delivery Date</th>
                                    <th>receiverPhone</th>
                                    <th>Re. Address</th>
                                    <th>Location</th>
                                    <th>Cancel</th>
                                    <th>Deliver</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {deliveryItems?.map(item =>
                                    <tr key={item._id}>
                                        <td>{item?.name} </td>
                                        <td>{item?.receiverName} </td>
                                        <td>{item?.phone}</td>
                                        <td>{item?.requestedDate}</td>
                                        <td>{item?.approximateDate}</td>
                                        <td>{item?.receiverPhone}</td>
                                        <td>{item?.deliveryAddress}</td>
                                        {/* <td>{item?.status}</td> */}
                                        <td>
                                            <button onClick={() => open(item?._id)}
                                                className="btn btn-sm bg-green-400">
                                                <IoLocationSharp size={20}></IoLocationSharp>
                                            </button>
                                            <LocationMap isOpen={isOpen} close={close} id={currentId} ></LocationMap>
                                        </td>
                                        <td>
                                            <button onClick={() => handleCancel(item?._id)} disabled={item?.status !== 'Cancel'} className=" px-2 py-1 mx-1 text-gray-700
                                            disabled:text-red-500 transition-colors duration-300  disabled:bg-gray-200 bg-purple-300 transform rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed">

                                                <GiCancel size={20}></GiCancel>
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDelivered(item?._id)} disabled={item?.status === 'Delivered'} className=" px-2 py-1 mx-1 text-gray-700 transition-colors 
                                            disabled:text-green-500 duration-300  disabled:bg-gray-200 bg-purple-300 transform rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed">
                                                <GrDeliver size={20}></GrDeliver>
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryList;