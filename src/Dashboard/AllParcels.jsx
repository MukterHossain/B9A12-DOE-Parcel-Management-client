import { Helmet } from "react-helmet-async";
import SectionTitle from "../Shared/SectionTitle";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ManageModal from "../Modals/ManageModal";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Swal from "sweetalert2";


const AllParcels = () => {

  const axiosSecure = useAxiosSecure();
  const [selectedMan, setSelectedMan] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  let [isOpen, setIsOpen] = useState(false)
  const [currentId, setCurrentId] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const { data: parcelItem = [], isLoading, refetch } = useQuery({
    queryKey: ['parcel-allData'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel-allData?fromDate=${fromDate}&toDate=${toDate}`)
      return res.data;
    },
    // enabled: false,
  })
  console.log(parcelItem);

  function open(id) {
    setCurrentId(id)
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }



  // Manage Modal
  const { data: allDeliveryMen = [] } = useQuery({
    queryKey: ['delivery-men'],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/delivery-men`)
      return data;
    }
  })
  
  console.log(allDeliveryMen);
  // // Handle Assign 
  const handleAssign = (id) => {
    if (!selectedMan || !deliveryDate) {
      Swal.fire({
        title: 'Warning!',
        text: 'Please select a delivery man and date.',
        icon: 'warning',
        confirmButtonText: 'Ok'
      });
      return;
    }
console.log(id);
console.log(selectedMan)

    const deliveryMenInfo = {
      status: 'On The Way',
      deliveryMenId: selectedMan,
      approximateDate: deliveryDate,
    };


    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Changed it!"
      }).then(async (data) => {
        if (data.isConfirmed) {
          const { updateData } = await axiosSecure.put(`/deliveryMenUpdate/${id}`, deliveryMenInfo)
          console.log('updateData', updateData);
          Swal.fire({
            title: "Changed!",
            text: "Your data has been Changed.",
            icon: "success"
          });
        }
        // refresh data
        refetch()
        close()
      });

    }
    catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: 'Data not Canceled',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    }
  };


  // Search
  const handleSearch = e => {
    e.preventDefault()
    refetch();
  }


  if (isLoading) return <LoadingSpinner></LoadingSpinner>
  return (
    <div>
      <Helmet>
        <title>DOE Courier || All Parcels</title>
      </Helmet>
      <SectionTitle heading={"All parcels"}></SectionTitle>
      <div>
        <div className="w-3/5 md:w-1/3 mx-auto ">
          <form onSubmit={handleSearch}>
            <div className="flex p-1 rounded-lg bg-slate-200">
              <input value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="px-6 py-2 w-full text-gray-700 placeholder:gray-500 bg-white rounded-l-md outline-none transparent mr-1" type="date" name="fromDate" placeholder="From Date" id="" />

              <input value={toDate} onChange={(e) => setToDate(e.target.value)} className="px-6 py-2 w-full text-gray-700 placeholder:gray-500 bg-white rounded-l-md outline-none transparent" type="date" name="toDate" placeholder="End Date" id="" />
              <button className="px-1 md:px-4 py-3 bg-slate-300 text-sm font-medium  rounded-r-md hover:bg-gray-600 hover:text-white  focus:outline-none">Search</button>
            </div>
          </form>
        </div>
       
        <div className=" -mx-4 sm:-mx-4 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Booking Date</th>
                  <th>Re. Delivery Date</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {parcelItem?.map(item =>
                  <tr key={item._id}>
                    <td>{item?.name} </td>
                    <td>{item?.phone}</td>
                    <td>{item?.bookingDate}</td>
                    <td>{item?.requestedDate}</td>
                    <td>{item?.price}</td>
                    <td><p className={`px-2 py-1 text-center text-bold ${item?.status === 'On The Way' && 'text-blue-500  bg-blue-100/60'} ${item?.status === 'Delivered' && 'text-green-500  bg-green-100/60'} ${item?.status === 'Cancel' && 'text-red-500  bg-red-100/60'} ${item?.status === 'Pending' && 'text-pink-500  bg-pink-100/60'} text-xs rounded-full`}>{item?.status}</p></td>
                    <td>
                      <button disabled={item?.status === 'Cancel' || item?.status === 'On The Way'} onClick={() => open(item?._id)} className="btn btn-sm bg-green-400">
                        Manage
                      </button>
                      <ManageModal isOpen={isOpen} setSelectedMan={setSelectedMan} selectedMan={selectedMan} close={close} handleAssign={handleAssign} setDeliveryDate={setDeliveryDate} allDeliveryMen={allDeliveryMen} id={currentId}></ManageModal>
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

export default AllParcels;