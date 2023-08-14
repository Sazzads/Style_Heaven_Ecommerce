import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const ManageProducts = () => {
    // const [datas, setDatas] = useState([])
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()


    const { data: data = [], refetch } = useQuery(['products'], async () => {
        try {
            const response = await fetch(`http://localhost:5000/products/${user?.email}`);
            const data = await response.json();
            return data; // Return the data to the useQuery hook
        } catch (error) {
            console.error('Error fetching data:', error);
            return []; // Return an empty array in case of an error
        }
    });
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
            }
        })
    }
    return (
        <>
            <h2 className='text-center text-3xl mt-10'>Manage products</h2>
            <div className="overflow-x-clip">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>Serial</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Seller Email</th>
                            <th>Product Price</th>
                            <th>Action</th>
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
                                    <td>{item.email}</td>
                                    <td>$ {item.price}</td>
                                    <th>
                                        <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                                            <label tabIndex={0} className="text-blue-600"> Action</label>
                                            <ul tabIndex={0} className="dropdown-content z-[1] menu  rounded-box bg-slate-100 ">
                                                <li><a className="text-blue-600"><FaEye></FaEye>View</a></li>
                                                <li><Link to={`/dashboard/editproduct/${item._id}`} className="text-green-600"><FaEdit></FaEdit> Edit</Link></li>
                                                <li onClick={() => handleDellete(item)}><a className="text-red-600"><FaTrashAlt></FaTrashAlt> Dellete</a></li>
                                            </ul>
                                        </div>
                                    </th>
                                </tr>)
                        }

                    </tbody>

                </table>
            </div>

        </>
    );
};

export default ManageProducts;