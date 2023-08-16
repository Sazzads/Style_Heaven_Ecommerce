import React, { useState } from 'react';
import { FaCcAmex, FaCcStripe, FaMobileAlt } from 'react-icons/fa';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Stripe from './Stripe/Stripe';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
    
    return (
        <>
            <h2 className="text-3xl text-center my-8">Patment</h2>
            <Tabs className="mx-auto">
                <TabList className='flex cursor-pointer items-center justify-center gap-10 mb-5'>
                    <Tab className="btn"><FaCcStripe></FaCcStripe> Card Payment</Tab>
                    <Tab className="btn"><FaMobileAlt></FaMobileAlt> Mobile Banking</Tab>

                </TabList>

                <TabPanel>
                    <Elements stripe={stripePromise}><Stripe ></Stripe></Elements>

                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        </>
    );
};

export default Payment;