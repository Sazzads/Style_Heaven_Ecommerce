import React, { useEffect, useState } from 'react';
import useCart from '../../../hooks/useCart';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import useUserInfo from '../../../hooks/useUserInfo';
import useAuth from '../../../hooks/useAuth';

const MyCart = () => {
    const [isAddressConfirmed, setIsAddressConfirmed] = useState(false);
    const [cart, refetch] = useCart()
    const [counts, setCounts] = useState({}); // Use an object to store counts for each item
    const [axiosSecure] = useAxiosSecure()
    const [userInfo] = useUserInfo()
    const { user } = useAuth()
   
    useEffect(() => {
        // Initialize counts object with current cart quantities
        const initialCounts = {};
        cart.forEach(item => {
            initialCounts[item._id] = item.cartquantity || 1;
        });
        setCounts(initialCounts);
    }, [cart]);

    // const total = cart.reduce((sum, item) => item.price*item.cartquantity + sum, 0);
    let total = cart.reduce((sum, item) => item.price * (counts[item._id] || 0) + sum, 0);
    total = parseFloat(total.toFixed(2))
    // console.log(typeof(total));

    let vatTotal = (total * 7 / 100 + total)
    vatTotal = parseFloat(vatTotal.toFixed(2))
    // console.log(vatTotal);

    const handleQuantityUpdate = (item, newQuantity, successMessage) => {
        const productquantity = {
            productquantity: parseInt(newQuantity),
        }

        axiosSecure.put(`/updatecart/${item._id}`, productquantity)
            .then(res => {
                // console.log(res.data);
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: successMessage,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    const increaseCount = (item) => {
        const updatedCount = counts[item._id] + 1;
        setCounts(prevCounts => ({ ...prevCounts, [item._id]: updatedCount }));
        handleQuantityUpdate(item, updatedCount, `${updatedCount} Products added to cart`);
    };

    const decreaseCount = (item) => {
        const updatedCount = Math.max(counts[item._id] - 1, 1);
        setCounts(prevCounts => ({ ...prevCounts, [item._id]: updatedCount }));
        handleQuantityUpdate(item, updatedCount, `${updatedCount} Products added to cart`);
    };


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

    const handleAddressUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const billingAddress = form.billingAddress.value;

        const newBillingAddress =  billingAddress 
        // console.log(newBillingAddress);
        //put data
        axiosSecure.put(`/users/updateBillingAddress/${user.email}`,  { billingAddress: newBillingAddress })
            .then(res => {
                console.log(res.data);
                setIsAddressConfirmed(true);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <Helmet>
                <title>StyleHeaven || Cart</title>
            </Helmet>
            <div className='grid md:grid-cols-2'>
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
                                                    <div onClick={() => increaseCount(item)} className='btn btn-xs'>+</div>
                                                    <div>{item.cartquantity || 1}</div>
                                                    <div onClick={() => decreaseCount(item)} className='btn btn-xs'>-</div>
                                                </div>
                                            </div>
                                            <button onClick={() => handleDellete(item)} className='btn'><FaTrashAlt></FaTrashAlt></button>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    }
                </div>
                <div className='mt-10 h-96 w-96 bg-pink-300 mx-auto p-5 md:fixed md:right-40'>

                    <table >
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
                                <td>VAT: <span><small> (7%)</small></span></td>
                                <td>${(total * 7 / 100).toFixed(2)} </td>
                            </tr>
                            <tr>
                                <td>Address: </td>
                                <td>
                                    <form onSubmit={handleAddressUpdate}>
                                        <textarea
                                            name='billingAddress'
                                            defaultValue={userInfo?.address}
                                            className="textarea textarea-bordered h-24"
                                            type="text"
                                        />
                                        <input className='btn btn-xs' type="submit" value="Confirm Address" />
                                    </form>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='divider'></div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Total:</td>
                                <td>${vatTotal}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link to={`/dashboard/payment`} className={`btn btn-sm ${isAddressConfirmed ? '' : 'btn-disabled'}`}>
                        Payment
                    </Link>

                </div>
            </div>
        </>
    );
};

export default MyCart;