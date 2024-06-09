import { useForm } from "react-hook-form";
import SectionTitle from "../Shared/SectionTitle";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";


const BookParcel = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()


    const onSubmit = async (data) => {
        console.log(data)
        const userInfo = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            parcelType: data.parcelType,
            parcelWeight: data.parcelWeight,
            receiverName: data.receiverName,
            receiverPhone: data.receiverPhone,
            deliveryAddress: data.deliveryAddress,
            requestedDate: data.requestedDate,
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            price: parseFloat(data.price)
        }
        const bookingsParcel = await axiosPublic.post('/bookings', userInfo)
        console.log(bookingsParcel.data)
        if (bookingsParcel.data.insertedId) {
            console.log('bookings added to the database')
            reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Sign up successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }

    }


    return (
        <div>
            <SectionTitle heading="Book a Parcel" ></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-6">
                        {/* Name */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Name</span>
                            </div>
                            <input type="text" defaultValue={user?.displayName}
                                {...register("price", { required: true })} className="input input-bordered w-full " />
                        </div>
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Email</span>
                            </div>
                            <input type="email" defaultValue={user?.email}
                                {...register("email", { required: true })} className="input input-bordered w-full " />
                        </div>
                    </div>

                    <div className="flex gap-6">
                        {/* Phone */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Phone Number*</span>
                            </div>
                            <input type="number"{...register("phone", { required: true })}
                                placeholder="Phone" className="input input-bordered w-full " />
                            {errors.phone && <span className="text-red-600">Name is required</span>}
                        </div>

                        {/* Parcel Type */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Parcel Type*</span>
                            </div>
                            <input type="text" {...register("parcelType", { required: true })}
                                placeholder="parcel Type" className="input input-bordered w-full " />
                            {errors.parcelType && <span className="text-red-600">Name is required</span>}
                        </div>
                    </div>

                    <div className="flex gap-6">
                        {/* Parcel Weight */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Parcel Weight*</span>
                            </div>
                            <input type="number"{...register("parcelWeight", { required: true })} placeholder="Parcel Weight" className="input input-bordered w-full " />
                            {errors.parcelWeight && <span className="text-red-600">Name is required</span>}
                        </div>

                        {/* Receiver’s Name */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Receivers Name*</span>
                            </div>
                            <input type="text"{...register("receiverName", { required: true })}
                                placeholder="Receivers Name" className="input input-bordered w-full " />
                            {errors.receiverName && <span className="text-red-600">Name is required</span>}
                        </div>
                    </div>
                    <div className="flex gap-6">
                        {/* Receiver's Phone Number */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Receiver Phone Number*</span>
                            </div>
                            <input type="number"{...register("receiverPhone", { required: true })}
                                placeholder="Receiver Phone Number" className="input input-bordered w-full " />
                            {errors.receiverPhone && <span className="text-red-600">Name is required</span>}
                        </div>

                        {/* Parcel Delivery Address */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Parcel Delivery Address*</span>
                            </div>
                            <input type="text"{...register("deliveryAddress", { required: true })}

                                placeholder="Parcel Delivery Address" className="input input-bordered w-full " />
                            {errors.deliveryAddress && <span className="text-red-600">Name is required</span>}
                        </div>
                    </div>
                    <div className="flex gap-6">
                        {/*  Requested Delivery Date */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Requested Delivery Date*</span>
                            </div>
                            <input type="date"{...register("requestedDate", { required: true })}
                                placeholder="Requested Delivery Date" className="input input-bordered w-full " />
                            {errors.requestedDate && <span className="text-red-600">Name is required</span>}
                        </div>

                        {/* Delivery Address Latitude */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Delivery Address Latitude*</span>
                            </div>
                            <input type="number" {...register("latitude", { required: true })}
                                placeholder="Delivery Address Latitude" className="input input-bordered w-full " />
                            {errors.latitude && <span className="text-red-600">Name is required</span>}
                        </div>
                    </div>
                    <div className="flex gap-6">
                        {/* Delivery Address longitude */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Delivery Address longitude*</span>
                            </div>
                            <input type="number" {...register("longitude", { required: true })}
                                placeholder="Delivery Address longitude" className="input input-bordered w-full " />
                            {errors.longitude && <span className="text-red-600">Name is required</span>}
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input type="number"{...register("price", { required: true })}
                                placeholder="price" className="input input-bordered w-full " />
                            {errors.price && <span className="text-red-600">Name is required</span>}
                        </div>
                    </div>

                    <button className="btn bg-green-400">
                        Book Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookParcel;