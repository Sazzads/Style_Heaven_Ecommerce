/* import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";


const CheckoutForm = ({ price }) => {
    const { user } = useAuth()
    const [cart, refetch] = useCart()
    // console.log(price);
    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setcardError] = useState('')
    const [axiosSecure] = useAxiosSecure()
    const [process, setProcess] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [trxID, setTrxId] = useState('')

    // console.log(cart);
    // console.log(cart[0].email,cart[0].courseId,cart[0].seat);
    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })

        }
    }, [price, axiosSecure]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }
        // Use your card Element with other Stripe.js APIs
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('[error]', error);
            setcardError(error.message)


        }
        else {
            console.log('[PaymentMethod]', paymentMethod);
            setcardError('')
        }
        setProcess(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError);
        }
        console.log(paymentIntent);
        setProcess(false)
        if (paymentIntent.status === 'succeeded') {

            setTrxId(paymentIntent.id)
            //save pay info
            const payment = {
                email: user?.email,
                trxID: paymentIntent.id,
                price,
                date: new Date(),
                quantity: cart.length,
                // items:cart.map(item=>item.name)
                CartItems: cart.map(item => item._id),
                productItems: cart.map(item => item.itemId),
                status: "Delevary pending"
                // email: cart[0]?.email,
                // courseId: cart[0].courseId,
                // cartId: cart.map(data => data._id),
                // seat: cart[0]?.seat,
                // className: cart[0]?.className,
                // image: cart[0]?.image,
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        // display confirm 
                        refetch()
                    }
                })

            // const sellproducts={
            //     sellProductId:gc
            // }
        }

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
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
                    }}
                />
                <button className='btn btn-outline btn-sm my-3' type="submit" disabled={!stripe || !clientSecret || process}>
                    Payment
                </button>
            </form>
            {cardError && <p className='text-red-600'>{cardError}</p>}
            {trxID && <p className='text-green-600'>Transcction is Completed: {trxID}</p>}
        </>
    );
};

export default CheckoutForm; */