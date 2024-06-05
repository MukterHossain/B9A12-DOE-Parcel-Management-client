import SectionTitle from "../Shared/SectionTitle";


const BookParcel = () => {
    return (
        <div>
            <SectionTitle heading="Book a Parcel" ></SectionTitle>
            <div>
                <form >
                    {/* onSubmit={handleSubmit(onSubmit)} */}
                    <div className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe name*</span>
                        </div>
                        <input type="text" 
                        // defaultValue={name} {...register("name", {required:true})} 
                        
                        placeholder="Recipe name" className="input input-bordered w-full " />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6 ">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select
                            //  defaultValue={category} {...register('category', {required:true})}
                             
                             className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                            </select>
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price*</span>
                            </div>
                            <input type="number"
                            //  defaultValue={price} {...register("price", {required:true})}
                             
                             placeholder="Price" className="input input-bordered w-full " />
                        </div>
                    </div>
                    <div className="form-control w-full my-6">
                        <input 
                        // {...register("image", {required:true})} 
                        type="file"  className="file-input w-full max-w-xs" />
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