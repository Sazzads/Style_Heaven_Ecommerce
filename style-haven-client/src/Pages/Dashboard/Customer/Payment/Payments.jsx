/* import React, { useState } from 'react';
import {FaCcStripe, FaMobileAlt } from 'react-icons/fa';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import useCart from '../../../../hooks/useCart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const Payments = () => {
    const [cart, refetch] = useCart()
    // console.log(cart);
    let total = cart.reduce((sum, item) => item.price * parseInt(item.cartquantity) + sum, 0);
    total = (total * 7 / 100 + total)
    const price = parseFloat(total.toFixed(2))
    // console.log(price);

    // const stripPromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
    const stripPromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
    return (
        <>
            <h2 className="text-3xl text-center my-8">Payment</h2>
            <Tabs className="mx-auto">
                <TabList className='flex cursor-pointer items-center justify-center gap-10 mb-5'>
                    <Tab className="btn"><FaCcStripe></FaCcStripe> Card Payment</Tab>
                    <Tab className="btn"><FaMobileAlt></FaMobileAlt> Mobile Banking</Tab>

                </TabList>

                <TabPanel>
            <Elements stripe={stripPromise}>
                <CheckoutForm price={price} cart={cart}></CheckoutForm>
            </Elements>
            
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        </>
    );
};

export default Payments; */