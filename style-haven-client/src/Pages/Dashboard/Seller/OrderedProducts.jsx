import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { FaCheck, FaTimes } from 'react-icons/fa';

const OrderedProducts = () => {
    const { user } = useAuth()
    const [axiosSecure]=useAxiosSecure()
    const [histories, setHistories] = useState([])

    // useEffect(() => {
    //     axiosSecure.get(`/paymenthistory/${user?.email}`)
    //         .then(res => {
    //             setHistories(res.data);
    //         })
    // }, [])
    const { data: data = [], refetch } = useQuery(['products'], async () => {
        try {
            const response = await fetch(`https://style-haven-server.vercel.app/products/${user?.email}`);
            let data = await response.json();
            data = data.filter(item => item.status === 'approved')
            return data; // Return the data to the useQuery hook
        } catch (error) {
            console.error('Error fetching data:', error);
            return []; // Return an empty array in case of an error
        }
    });
    console.log(data);

    return (
 <div>
            <>
                <h2 className='text-center text-3xl mt-10'>Manage products</h2>
                <div className="overflow-x-clip">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>

                                <th>Serial</th>
                                <th>Product Image</th>
                                <th>Seller Email</th>
                                <th>Product Quantity</th>
                                <th>Sold Product</th>
                                <th>Available Product</th>
                                <th>Product Price</th>
                                <th>Action</th>
                                <th>Order Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((item, index) =>
                                    <tr key={item._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.photoUrl} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item?.soldproduct || 0}</td>
                                        <td>{item.quantity - item?.soldproduct || item.quantity}</td>
                                        <td>$ {item.price}</td>
                                        <th>
                                            <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                                                <label tabIndex={0} className="text-blue-600"> Action</label>
                                                <ul tabIndex={0} className="dropdown-content z-[1] menu  rounded-box bg-slate-100 ">
                                                    <li><a className="text-blue-600"><FaCheck></FaCheck>Accept</a></li>
                                                    <li onClick={() => handleDellete(item)}><a className="text-red-600"><FaTimes></FaTimes> Dellete</a></li>
                                                </ul>
                                            </div>
                                        </th>
                                        <th>
                                            <button className='btn btn-sm'>Order Details</button>
                                        </th>
                                    </tr>)
                            }

                        </tbody>

                    </table>
                </div>

            </>
        </div>
    );
};

export default OrderedProducts;