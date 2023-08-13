import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/NavBar/Navbar';
import { FaCashRegister, FaHome, FaHouseUser, FaShoppingCart, FaTshirt, FaUserAlt, FaUserTie, FaWallet } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import UseCustomer from '../hooks/UseCustomer';

const Dashboard = () => {
    const [isAdmin] = useAdmin()
    const [isSeller] = useSeller()
    const [isCustomer] = UseCustomer()
    return (
        <>
            <Helmet>
                <title>StyleHeaven || Dashboard</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col  border-2">
                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full border-2 text-base-content">
                        {/* Sidebar content here */}
                        {
                            isAdmin &&
                            <>
                                <li><NavLink to='/dashboard/'><FaHouseUser></FaHouseUser>Admin Home </NavLink></li>
                                <li><NavLink to='/dashboard/users'><FaUserAlt></FaUserAlt>Users </NavLink></li>
                                <li><NavLink to='/dashboard/manageProduct'><FaTshirt></FaTshirt>Manage Product </NavLink></li>
                                <li><NavLink to='/dashboard/manageOrder'><FaCashRegister></FaCashRegister>Manage Order </NavLink></li>
                            </>
                        }
                        {isSeller && <>
                            <li><NavLink to='/dashboard/'><FaHouseUser></FaHouseUser>seller Home </NavLink></li>
                            <li><NavLink to='/dashboard/addproduct'><FaTshirt></FaTshirt>Add Product </NavLink></li>
                            <li><NavLink to='/dashboard/ss'><FaTshirt></FaTshirt>Edit Product </NavLink></li>
                        </>}
                        {isCustomer && <>
                            <li><NavLink to='/dashboard/'><FaHouseUser></FaHouseUser>Customer Home </NavLink></li>
                            <li><NavLink to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart>cart </NavLink></li>
                            <li><NavLink to='/dashboard/manageProduct'><FaTshirt></FaTshirt>All Product </NavLink></li>
                        </>}

                        <div className='divider'></div>
                        <li><NavLink to='/'><FaHome></FaHome>Home </NavLink></li>
                        <li><NavLink to='/'><FaHome></FaHome>Blog </NavLink></li>

                    </ul>

                </div>
            </div>
        </>
    );
};

export default Dashboard;