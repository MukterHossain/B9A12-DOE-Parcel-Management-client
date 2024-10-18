import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const CheckoutForm = ({payBookData}) => {
    const [error, setError] = useState('')
    const stripe = useStripe();
    const {user} = useAuth()
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()
    const [clientSecret, setClientSecret] = useState();
    const [processing, setProcessing] = useState(false);

    useEffect(() =>{
        if(payBookData?.price && payBookData?.price > 1){
            getClientSecret({price: payBookData?.price})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[payBookData?.price])

    const getClientSecret = async price =>{
        const {data} = await axiosSecure.post(`/create-payment-intent`, price)
        console.log('client secret from server',data)
        setClientSecret(data.clientSecret)
    }
    

    const handleSubmit = async (event) => {
        event.preventDefault()
        setProcessing(true)
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('payment error', error)
            setError(error.message)
            setProcessing(false)
            return
        }
        else {
            console.log('Payment Method', paymentMethod)
            setError('')
        }
        // confirm payment
    const {error: confirmError, paymentIntent}=    await stripe.confirmCardPayment(clientSecret, {
            payment_method:{
                card:card,
                billing_details:{
                    email:user?.email,
                    name: user?.displayName,
                }
            }
        })
        if(confirmError){
            console.log(confirmError)
            setError(confirmError.message)
            setProcessing(false)
            return
        }
        if(paymentIntent.status === 'succeeded'){
            console.log(paymentIntent)
            const paymentInfo = {
                ...payBookData,
                bookId:payBookData._id,
                transactionId: paymentIntent.id,
                date: new Date()
            }
            delete paymentInfo._id
            console.log(paymentInfo)
            try {
               const {data} = await axiosSecure.post(`/bookPay`, paymentInfo)
                console.log(data)
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Booked Payment successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                navigate('/dashboard/myBooking')
            } catch (error) { 
                console.log(error)
                Swal.fire({
                    position: "top-center",
                    icon: "error",
                    title: "Something is wrong",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
        setProcessing(false)
            
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}>

                </CardElement>
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe  || !clientSecret || processing}>
                    {processing ? (
                        <ImSpinner9 className="animate-spin m-auto" size={25}></ImSpinner9>
                    ):(`Pay Tk-${payBookData?.price}`)}
                
            </button> 
            <p className="text-red-500">{error}</p>
            </form>
                {error && <p className="text-red-400 mt-5">{error}</p>}
        </>
    );
};

export default CheckoutForm;