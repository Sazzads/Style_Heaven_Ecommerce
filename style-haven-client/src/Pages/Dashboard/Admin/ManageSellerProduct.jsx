import React, { useState } from 'react';
import useAllItems from '../../../hooks/useAllItems';
import { FaCheckCircle, FaEye, FaRegNewspaper, FaTimesCircle, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageSellerProduct = () => {
    const [Id, setId] = useState(null)
    const [axiosSecure] = useAxiosSecure()
    const [allItems, refetch, loading] = useAllItems();
    // console.log(allItems);

    //delete product
    const handleDellete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log(item);
                axiosSecure.delete(`/products/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        })
    }

    //update product status 

    const handleStatusUpdate = (item, newStatus, successMessage) => {
        const updatedStatus = {
            status: newStatus
        };

        axiosSecure.put(`/productstat/${item._id}`, updatedStatus)
            .then(res => {
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

    const handleApproved = (item) => {
        handleStatusUpdate(item, "approved", "Product approved Successfully");
    };

    const handleReject = (item) => {
        handleStatusUpdate(item, "reject", "Product reject Successfully");
    };
    //feedback
    const handleFeedback = (event) => {
        event.preventDefault();
        const feedback = event.target.feedback.value;
        const newFeadback = { feedback }
        // console.log(newFeadback);
        const id = event.target.id.value;
        // console.log(id);

        axiosSecure.put(`/productfeedback/${id}`, newFeadback)
            .then(res => {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "feedback sendSuccessfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(err => {
                console.log(err);
            });

    }
    return (
        <div className='mx-auto '>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">send Feedback</h3>
                    <form onSubmit={handleFeedback}>
                        <input className='hidden' name="id" value={Id || ''} readOnly type="text" />
                        <input className='border p-4' placeholder='send feedback' type="text" name="feedback" id="" />
                        <br />
                        <input className='btn mt-3' type="submit" value="submit" />
                    </form>

                    <div className="modal-action">
                        <label htmlFor="my_modal_6" className="btn">Close!</label>
                    </div>
                </div>
            </div>
            <h2 className='text-center text-3xl mt-10'>Manage products</h2>
            <div className="overflow-x-clip">
                <table className="table w-100 border-2">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Serial</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Seller Email</th>
                            <th>Product Price</th>
                            <th>Product Quantity</th>
                            <th>Product Details</th>
                            <th>status</th>
                            <th>Feedback</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            allItems.map((item, index) =>
                                <tr key={item._id}>
                                    <td >{index + 1}</td>
                                    <td >
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.photoUrl} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td >{item.name}</td>
                                    <td >{item.email}</td>
                                    <td >$ {item.price}</td>
                                    <td >{item.quantity}</td>
                                    <td >{item.details}</td>
                                    <td >{item.status}</td>
                                    <td >{item.feedback}</td>
                                    <th>
                                        <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                                            <label tabIndex={0} className="text-blue-600"> Action</label>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu  rounded-box bg-slate-100 ">
                                                <li><a className="text-blue-600"><FaEye></FaEye>View</a></li>
                                                <li onClick={() => handleApproved(item)}><a className="text-green-600"><FaCheckCircle></FaCheckCircle>Approved</a></li>
                                                <li onClick={() => handleReject(item)}><a className="text-yellow-500"><FaTimesCircle></FaTimesCircle>Reject</a></li>
                                                <li onClick={() => setId(item._id)} htmlFor=""><label htmlFor="my_modal_6"><a className="flex gap-2 items-center"><FaRegNewspaper></FaRegNewspaper>Feedback</a></label></li>
                                                <li onClick={() => handleDellete(item)}><a className="text-red-600"><FaTrashAlt></FaTrashAlt> Dellete</a></li>
                                            </ul>
                                        </div>
                                    </th>
                                </tr>)
                        }

                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default ManageSellerProduct;