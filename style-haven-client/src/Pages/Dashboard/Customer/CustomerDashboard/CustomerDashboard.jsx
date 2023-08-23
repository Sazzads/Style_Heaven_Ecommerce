import React from 'react';
import useUserInfo from '../../../../hooks/useUserInfo';
import { Link } from 'react-router-dom';
import useCart from '../../../../hooks/useCart';
import CustomerStat from './CustomerStat';

const CustomerDashboard = () => {
    const [userInfo] = useUserInfo()
    console.log(userInfo);
    const [cart] = useCart();
    console.log(cart);
    const total = cart.reduce((sum, item) => item.price + sum, 0)
    return (
        <div>
            <div className='my-5'>
                <CustomerStat></CustomerStat>
            </div>
            <div className="hero min-h-12 bg-">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold ">Hello <span className='text-pink-600'>{userInfo?.name}</span></h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                        <Link to='/allproducts' className="btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600  bg-black">Start Shopping</Link>
                    </div>
                </div>
            </div>

            <div className='grid grid-cols-2 gap-10 px-4'>
                <div className='customer cart history border-2 p-5 space-y-1'>
                    <h3 className="text-3xl uppercase">Cart Products:</h3>
                    <p>Total Products:{cart.length}</p>
                    <p>Total Bill:{total}</p>
                    {
                        cart.map((data, index) => {
                            return (
                                <p>Product {index + 1}: {data.name}</p>
                            )
                        })
                    }
                    <Link to='/dashboard/mycart' className="btn btn-sm border-0 border-b-4 mt-4 text-white bg-pink-600  bg-black">Go TO cart</Link>

                </div>
                <div className='customer profile border-2 p-5 space-y-1'>
                <h3 className="text-3xl uppercase">{userInfo.name}</h3>
                    <div className="avatar">
                        <div className="w-24 rounded">
                            <img src={userInfo.photoUrl} />
                        </div>
                    </div>
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>Address: {userInfo.address}</p>
                    <p>Billing Address: {userInfo.billingAddress}</p>

                </div>

            </div>

        </div>
    );
};

export default CustomerDashboard;