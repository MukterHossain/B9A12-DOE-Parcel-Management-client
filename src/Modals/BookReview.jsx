import PropTypes from 'prop-types'
import { Dialog, Transition, TransitionChild, DialogTitle, DialogPanel, } from '@headlessui/react'
import { Fragment, useState } from 'react'
import LoadingSpinner from '../Shared/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const BookReview = ({ isOpen, close }) => {
    // const { user , loading} = useAuth() {open, close, isOpen}
    const { user, loading } = useAuth()
    // const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [rating, setRating] = useState('');

    // const [selected, setSelected] = useState(user)
    // console.log(isOpen);
    // console.log(typeof isOpen);

    const { data: review = [], refetch } = useQuery({
        queryKey: ['review', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/review/${user?.email}`)
            return data;
        }
    })

    // rating
    const handleInputChange = (e) => {
        const value = parseInt(e.target.value, 10);
        if (value >= 0 && value <= 5) {
            setRating(value);
        }
    }

    // Review submit
    const handleReviewSubmit = async (event, id) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value
        const photo = form.photoURL.value
        const reviewId = form.reviewId.value
        const feedback = form.feedback.value
        const rating = parseFloat(form.rating.value)
        const reviewData = { name, photo, rating, feedback, reviewId }
        console.table(reviewData);
        try {
            const reviewInfo = await axiosSecure.put(`/review${id}`, reviewData)
            console.log(reviewInfo.data)
            if (reviewInfo.data.insertedId) {
                // console.log('bookings added to the database')
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sign up successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard/profile')
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Some is wrong",
                showConfirmButton: false,
                timer: 1500
            });
        }



    }

    if (loading) return <LoadingSpinner></LoadingSpinner>
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={close}>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />

                </TransitionChild>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <DialogTitle
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900'
                                >
                                     Give Your Review
                                </DialogTitle>
                                {/* Review Form */}
                                <div className="rounded-lg">
                                    <form onSubmit={handleReviewSubmit} className="">
                                        <div className="form-control grid md:grid-cols-2 justify-between gap-4 ">
                                            <div>
                                                <label className="">
                                                    <span className="text-white">User Name</span>
                                                    <br />
                                                </label>
                                                <input type="text" name='name' defaultValue={user?.displayName} placeholder="email" className="input input-bordered w-full" required />
                                            </div>
                                            <div>
                                                <label className="">
                                                    <span className="text-white">User Photo</span>
                                                    <br />
                                                </label>
                                                <input type="text" name='photoURL' defaultValue={user?.photoURL} placeholder="email" className="input input-bordered w-full" required />
                                            </div>
                                            <div>
                                                <label className="">
                                                    <span className="text-white"> Rating</span>
                                                    <br />
                                                </label>
                                                <input type="number" step="0.1" min="0" max="5" value={rating} onChange={handleInputChange} name='rating' placeholder="Rate between 0 to 5" className="input input-bordered w-full" required />
                                            </div>
                                            <div>
                                                <label className="">
                                                    <span className="text-white"> Feedback</span>
                                                    <br />
                                                </label>
                                                <input type="text" name='feedback' placeholder="Feedback" className="input input-bordered w-full" required />
                                            </div>
                                        </div>
                                        <div className="form-control mt-2">
                                            <label className="">
                                                <span className="text-white">Delivery Men’s Id</span>
                                            </label>
                                            <input type="text" name='reviewId' defaultValue={review?._id} className="input input-bordered w-full" required />
                                        </div>
                                        <div className="form-control mt-6">
                                            <button className="btn bg-green-600 text-white hover:text-blue-800 font-bold hover:bg-gray-200 transition-colors duration-300 ">Submit</button>
                                        </div>
                                    </form>
                                </div>
                                <hr className='mt-2 ' />
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
    );
};
BookReview.propTypes = {
    closeModal: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default BookReview;