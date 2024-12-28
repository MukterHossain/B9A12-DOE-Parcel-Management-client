import PropTypes from 'prop-types'
import { Dialog, Transition, TransitionChild, DialogTitle, DialogPanel, } from '@headlessui/react'
import { Fragment, } from 'react'
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';


const BookReview = ({ isOpen, close ,id,refetch}) => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit } = useForm()
    
    const { data: reviewMenData = [] } = useQuery({
        queryKey: ['reviewMen',user?.email ],
        queryFn: async () => {
          const { data } = await axiosSecure.get(`/reviewMen?email=${user?.email}`)
          return data;
        }
      })
    console.log(reviewMenData);
    // console.log('reviewMenData',reviewMenData[0]?.deliveryMenId);

    // Review submit
    const handleReviewSubmit = async (data) => {
        const reviewData = {
            name: data.name,
            image: data.image,
            rating: data.rating,
            feedback: data.feedback,
            deliveryMenId: data.deliveryMenId,
            date: new Date().toLocaleDateString(),
        }

        try {
            const reviewInfo = await axiosSecure.post(`/review/${id}`, reviewData)
            if (reviewInfo.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Review set successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            }refetch()
            close()
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Some is wrong",
                showConfirmButton: false,
                timer: 1500
            });
        }



    }

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
                                    <form onSubmit={handleSubmit(handleReviewSubmit)} className="">
                                        <div className="form-control grid md:grid-cols-2 justify-between gap-4 ">
                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">User Name</span>
                                                </div>
                                                <input type="text" defaultValue={user?.displayName}
                                                    {...register("name", { required: true })} className="input input-bordered w-full " />
                                            </div>
                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">User Photo</span>
                                                </div>
                                                <input type="text" defaultValue={user?.photoURL}
                                                    {...register("image", { required: true })} className="input input-bordered w-full " />
                                            </div>
                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <label htmlFor="rating">Rating</label>
                                                    <span className="label-text">Rating</span>
                                                </div>
                                                {/* value={rating} onChange={handleInputChange} */}
                                                <input type="number" id="rating" name="rating" min="1" max="5" 
                                                      placeholder="Rate between 0 to 5"
                                                    {...register("rating", { required: true, min:1, max:5 })} className="input input-bordered w-full " />
                                            </div>
                                            <div className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text">Feedback</span>
                                                </div>
                                                <input type="text" {...register("feedback", { required: true })} className="input input-bordered w-full " />
                                            </div>
                                        </div>
                                        {/* <div className="form-control mt-2">
                                            <input type="text" name='reviewId' defaultValue={review?._id} className="input input-bordered w-full" required />
                                        </div> */}
                                        <div className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text">Delivery Men’s Id</span>
                                            </div>
                                            <input type="text" defaultValue={id} {...register("deliveryMenId", { required: true })} className="input input-bordered w-full " />
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