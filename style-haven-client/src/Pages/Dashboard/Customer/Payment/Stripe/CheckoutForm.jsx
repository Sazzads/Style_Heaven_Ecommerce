import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useAuth from '../../../../../hooks/useAuth';
import useCart from '../../../../../hooks/useCart';
import useUserInfo from '../../../../../hooks/useUserInfo';

const CheckoutForm = ({ price }) => {
    const { user } = useAuth()
    const [cart, refetch] = useCart()
    const [userInfo]=useUserInfo()
    // console.log(userInfo.billingAddress);
    // console.log(cart);
    console.log(price);
  
    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setcardError] = useState('')
    const [axiosSecure] = useAxiosSecure()
    const [process, setProcess] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [trxID, setTrxId] = useState('')

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret);
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
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
            setcardError(error.message)


        }
        else {
            console.log('[PaymentMethod]', paymentMethod);
            setcardError('')
        }
        setProcess(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment
            (
                clientSecret,
                {
                    payment_method: {
                        card: card,
                        billing_details: {
                            email: user?.email || "anonymous",
                            name: user?.displayName || "anonymous",
                        },
                    },
                }
            );
        if (confirmError) {
            console.log(confirmError);
        }
        // console.log(paymentIntent);
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
                names:cart.map(item=>item.name),
                CartItems: cart.map(item => item._id),
                productItems: cart.map(item => item.itemId),
                delevaryStatus: "Delevary pending",
                paidStatus:true,
                billingAddress:userInfo.billingAddress
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        // display confirm 
                        refetch()
                    }
                })

            //update sold product

            const updateSoldProduct = async (itemId, newSoldProduct) => {
                try {
                    const response = await fetch(`http://localhost:5000/paymentsprductupdate/${itemId}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newSoldProduct)
                    });

                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error updating soldproduct on the client:', error);
                    throw error;
                }
            };

            // Iterate through the cart and update each item's soldproduct
            for (const item of cart) {
                const itemId = item.itemId;
                const newSoldProduct = {
                    newSoldProduct: parseInt(item.cartquantity, 10)
                };

                try {
                    const result = await updateSoldProduct(itemId, newSoldProduct);
                    console.log(`Soldproduct updated for item ${itemId}:`, result);
                } catch (error) {
                    console.error(`Error updating soldproduct for item ${itemId}:`, error);
                }
            }


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

export default CheckoutForm;