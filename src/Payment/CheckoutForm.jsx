import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    

    const handleSubmit = async (event) => {
        event.preventDefault()
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
            // setError(error.message)
        }
        else {
            console.log('Payment Method', paymentMethod)
            // setError('')
        }
        // if(!stripe || elements){
        //     return
        // }
        // const card = elements.getElement(CardElement)
        // if(card == null){
        //     return
        // }

        // const {error, paymentMethod} = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card
        // })
        // if(error){
        //     console.log('payment error', error)
        // }
        // else{
        //     console.log('payment method', paymentMethod);
        // }
            
    }
    return (
        <div>
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
                {/* <button type="submit" className="bg-green-600 text-white px-2 py-1 my-3" disabled={!stripe}>
                    Pay
                </button>   || !clientSecret*/}
                <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe}>
                Pay
            </button>
            </form>

        </div>
    );
};

export default CheckoutForm;