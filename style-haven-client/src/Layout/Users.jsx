import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { FaTrashAlt, FaUserAlt, FaUserTie, FaUsersCog } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Users = () => {
    const [axiosSecure]=useAxiosSecure()
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure("/users")
        return res.data
    })

   
    const updateUserRole = async (user, role) => {
        const updatedRole = {
            role: role
        };

        const res = await fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedRole)
        });
        return await res.json();
    };

    const handleAdmin = (user) => {
        updateUserRole(user, "admin")
            .then(data => {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Make seller Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    const handleSeller = (user) => {
        updateUserRole(user, "seller")
            .then(data => {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Make Admin Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };
    const handleCustomer = (user) => {
        updateUserRole(user, "customer")
            .then(data => {
                refetch();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Make Admin Successfully',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };

    return (
        <>
            <Helmet>
                <title>StyleHeaven || users</title>
            </Helmet>
            <div className="">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>

                            <th>serial</th>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center ">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photoUrl} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <div className="dropdown dropdown-bottom dropdown-end">
                                        <label tabIndex={0} className="btn btn-xs btn-outline m-1">Action</label>
                                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box ">
                                            <li onClick={() => handleAdmin(user)} className='text-blue-600'><a ><FaUsersCog></FaUsersCog> Admin</a></li>
                                            <li onClick={() => handleSeller(user)} className='text-green-600'><a><FaUserTie></FaUserTie>Seller</a></li>
                                            <li onClick={() => handleCustomer(user)}><a><FaUserAlt></FaUserAlt>Customer</a></li>
                                            <li className='text-red-600'><a><FaTrashAlt></FaTrashAlt> Dellete</a></li>
                                        </ul>
                                    </div>
                                </td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Users;