import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../Shared/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)
const Payment = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure();

    const { data: payBookData = [] } = useQuery({
        queryKey: ['payment-book', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment-book/${id}`)
            return res.data;
        }
    })
    console.log(payBookData)
    return (
        <div className="p-5">
            <SectionTitle heading='Payment' subHeading='Please, pay money for your service!'></SectionTitle>
            <div className="w-full md:w-3/5  py-8 px-5 grid grid-cols-1 gap-4 justify-center shadow-xl rounded-lg bg-gray-100">
                <div className=" ">
                    <p>{payBookData?.name}</p>
                    <p>Taka: {payBookData?.price}</p>
                </div>
                <hr />
                <div className=" ">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm payBookData={payBookData}></CheckoutForm>
                    </Elements>
                </div>
            </div>

        </div>
    );
};

export default Payment;