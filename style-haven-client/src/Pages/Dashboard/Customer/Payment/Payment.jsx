import React, { useState } from 'react';
import { FaCcStripe, FaMobileAlt } from 'react-icons/fa';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import useCart from '../../../../hooks/useCart';
import CheckoutForm from './Stripe/CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SslPayment from './SslPayment/SslPayment';

const Payment = ({ counts }) => {
    const [cart, refetch] = useCart()
    // console.log(cart);
    // let total = cart.reduce((sum, item) => item.price * parseInt(item.cartquantity) + sum, 0);
    // total = (total * 7 / 100 + total)
    // const price = parseFloat(total.toFixed(2))
    // console.log(total);
    
    const total = cart.reduce((sum, item) => {
        const itemPrice = parseFloat(item.price);
        const itemQuantity = parseInt(item.cartquantity, 10);

        if (isNaN(itemPrice) || isNaN(itemQuantity)) {
            console.error(`Invalid price or quantity for item: ${item.name}`);
            return sum;
        }



        const itemTotal = itemPrice * itemQuantity;
        return itemTotal + sum;
    }, 0);
    const price = parseFloat((total * 7 / 100 + total).toFixed(2))
  
// console.log(price);
    // const stripPromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
    return (
        <>
            <h2 className="text-3xl text-center my-8">Payment</h2>
            <Tabs className="mx-auto">
                <TabList className='flex cursor-pointer items-center justify-center gap-10 mb-5'>
                    <Tab className="btn"><FaCcStripe></FaCcStripe> Card Payment</Tab>
                    <Tab className="btn"><FaMobileAlt></FaMobileAlt> Mobile Banking</Tab>

                </TabList>

                <TabPanel>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={price}></CheckoutForm>
                    </Elements>

                </TabPanel>
                <TabPanel>
                    <SslPayment price={price}></SslPayment>
                </TabPanel>
            </Tabs>
        </>
    );
};

export default Payment;