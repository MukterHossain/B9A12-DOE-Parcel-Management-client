import { Dialog, Transition, TransitionChild, DialogTitle, DialogPanel, } from '@headlessui/react'
import { useQuery } from '@tanstack/react-query';
import { Fragment, } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
// import { FaMapMarkerAlt } from "react-icons/fa";
import 'leaflet/dist/leaflet.css';
import useAxiosSecure from '../hooks/useAxiosSecure';


const LocationMap = ({ isOpen, close, id, }) => {
  const axiosSecure = useAxiosSecure()
  const { data: locationData = {}, isLoading } = useQuery({
    queryKey: ['location', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/location/${id}`)
      return data
    }
  })
  console.log('locationData', locationData);
  const position = [locationData?.latitude, locationData?.longitude]
//<FaMapMarkerAlt></FaMapMarkerAlt>
if(isLoading) return <p className='text-sm'></p>
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={close}>
          <TransitionChild as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0' enterTo='opacity-100' leave='ease-in duration-200' leaveFrom='opacity-100' leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </TransitionChild>
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <TransitionChild as={Fragment} enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95'>
                <DialogPanel className='w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-5 text-left align-middle shadow-xl transition-all'>
                  <DialogTitle as='h3' className='text-lg font-bold text-center leading-6 text-blue-900' > View Location</DialogTitle>
                  <div className='mb-2 '>
                    <p className='text-sm text-gray-500 underline  underline-offset-4 text-center'> Please  see the receiver man carefully</p>
                  </div>
                  
                  <div className='mx-auto'>
                    <MapContainer  center={position} zoom={13}  scrollWheelZoom={false}>
                      <TileLayer
                        attribution={`${import.meta.env.VITE_MAP_ATTRIBUTE}`}
                        url={`${import.meta.env.VITE_MAP_URL}`}/>
                      <Marker style={{colors:'red'}} position={position}>
                        <Popup>
                          A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                      </Marker>
                    </MapContainer>
                    <hr className='mt-2 border-dashed ' />
                    <p><span className='text-sm font-semibold text-blue-900'>Delivery Address:</span> {locationData?.deliveryAddress}</p>
                  </div>
                  <hr className='mt-2 border-dashed ' />
                  <div className='flex mt-2 justify-end'>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
                      onClick={close}
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LocationMap;