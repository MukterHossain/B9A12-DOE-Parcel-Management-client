import Swal from "sweetalert2";
import SectionTitle from "../Shared/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query'
import { FaUsers } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import LoadingSpinner from "../Shared/LoadingSpinner";
import {  useState } from "react";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";


const AllUsers = () => {
    const [perPage, setperPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0)
    const axiosSecure = useAxiosSecure();

    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['allUsers',currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUsers?page=${currentPage}&size=${perPage}`)
            return res.data;
        }
    })


 // data for pagination
    const { data } = useQuery({
        queryKey: ['userCount'],
        queryFn: async () => {
            const res = await axiosSecure.get('/userCount')
            setCount(res?.data.count)
            return res.data;
        }
    })
    console.log('users,', users)

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }


    const handleMakeDeliveryMen = user => {
        axiosSecure.patch(`/users/deliveryMen/${user._id}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    // pagination
    const allPage = Math.ceil(count / perPage)
    const pages = [...Array(allPage).keys()].map(
        count => count + 1
    );  
    const handlePagination = (value) => {
        console.log(value);
        refetch() 
        setCurrentPage(value)
              
    }



    if (isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div>
            <Helmet>
                <title>DOE Courier || All Users</title>
            </Helmet>
            <SectionTitle heading={"All Users"}></SectionTitle>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>No </th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Number of parcel Booked</th>
                                <th> Total Spent Amount</th>
                                <th>Make Delivery Men</th>
                                <th> Make Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users?.map((user, index) => <tr key={user._id}>
                                    <td>{index + 1} </td>
                                    <td>{user.name}</td>
                                    <td>{user?.phone}</td>
                                    <td> 
                                        { user?.role === 'deliveryMen' && 'No data'|| user?.role === 'admin' && 'Owner' || user?.totalBooking} 
                                    </td>
                                    <td> 
                                        { user?.role === 'deliveryMen' && 'No data'|| user?.role === 'admin' && 'Owner' || user?.totalSpentAmount} 
                                    </td>
                                    <td className="text-blue-600 text-center text-bold">
                                        {user.role === 'deliveryMen' ? 'Delivery Man' : <button onClick={() => handleMakeDeliveryMen(user)} disabled={`${user.role === 'admin'}`} className="btn btn-sm w-14 h-10 bg-sky-500">
                                            <img src={'https://i.ibb.co/hWMhjbN/delivery-man1.png'} alt="" />
                                        </button>}
                                    </td>
                                    <td className="text-green-600  text-center text-bold">
                                        {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)}
                                        disabled={`${user.role !== 'admin'}`}
                                         className="btn btn-sm bg-orange-600">
                                            <FaUsers className="text-white text-2xl"></FaUsers>
                                        </button>}
                                    </td>
                                </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
            <div>
                <div className="flex justify-center mt-12">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => handlePagination(currentPage - 1)}
                        className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 bg-gray-300 transform rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed">
                        <span className="mx-1 flex justify-center items-center gap-2"><FaArrowLeftLong></FaArrowLeftLong> Previous</span>
                    </button>
                    {pages?.map(page => (
                        <button key={page}
                            onClick={() => handlePagination(page)}
                            className={`hidden px-4 py-2 mx-1 ${currentPage === page ? 'bg-blue-500 text-white' : ''} transition-colors duration-300 transform rounded-md sm:inline hover:bg-blue-500 hover:text-white text-blue-900`}> {page}</button>
                    ))}
                    <button
                        disabled={currentPage === allPage}
                        onClick={() => handlePagination(currentPage + 1)}
                        className=" px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 bg-gray-300 transform rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed">
                        <span className="mx-1 flex justify-center items-center gap-2">Next <FaArrowRightLong></FaArrowRightLong> </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;