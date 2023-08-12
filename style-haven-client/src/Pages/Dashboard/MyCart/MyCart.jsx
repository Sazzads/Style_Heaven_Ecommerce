import React from 'react';
import useCart from '../../../hooks/useCart';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MyCart = () => {
    const [cart, refetch] = useCart()
    const total = cart.reduce((sum, item) => item.price + sum, 0)
    const vatTotal = total * 7 / 100 + total
    console.log(vatTotal);
    
    const handleDellete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!'
                            )
                        }
                    })

            }
        })
    }
    return (
        <>
            <Helmet>
                <title>StyleHeaven || Cart</title>
            </Helmet>
            <div className='grid grid-cols-2'>
                <div className='card'>
                    {
                        cart.map((item, index) =>
                            <div key={item._id} className='grid grid-cols-1 mb-5 border-2'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <img src={item.image} alt="" />
                                    <div className='flex flex-col justify-between p-2'>
                                        <div>
                                            <h3 className='text-xl mb-3'>{item.name}</h3>
                                            <p className='text-lg'>${item.price}</p>
                                        </div>

                                        <div className='flex justify-between '>
                                            <div>
                                                <p>Black/xl</p>
                                                <div className='flex justify-center gap-2'>
                                                    <div className='btn btn-xs'>+</div>
                                                    <div>0</div>
                                                    <div className='btn btn-xs'>-</div>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDellete(item)} className='btn'><FaTrashAlt></FaTrashAlt></button>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    }
                </div>
                <div className='mt-10 h-96 w-96 bg-pink-300 mx-auto p-5'>
                    <table>
                        <thead>
                            <tr>
                                <th>Total Items:</th>
                                <th>{cart.length}</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>SubTotal:</td>
                                <td>${total}</td>
                            </tr>
                            <tr>
                                <td>Tax: <span><small>(7%)</small></span></td>
                                <td>${total * 7 / 100} </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='divider'></div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Total:</td>
                                <td>${total * 7 / 100 + total}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button className='btn btn-xs '>Pay</button>
                </div>
            </div>
        </>
    );
};

export default MyCart;