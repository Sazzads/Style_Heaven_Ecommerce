import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/NavBar/Navbar';
import { FaHome, FaShoppingCart, FaWallet } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    return (
        <>
            <Helmet>
                <title>StyleHeaven || Dashboard</title>
            </Helmet>
            <Navbar></Navbar>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center border-2">
                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full border-2 text-base-content">
                        {/* Sidebar content here */}
                        <li><NavLink to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart>My cart</NavLink></li>
                        <li><NavLink  to='/dashboard/payment'><FaWallet></FaWallet>Payment History</NavLink></li>
                        <li><NavLink to='/dashboard/'><FaHome></FaHome>Home </NavLink></li>
                        <div className='divider'></div>
                        <li><NavLink to='/'><FaHome></FaHome>Home </NavLink></li>
                        <li><NavLink to='/'><FaHome></FaHome>Home </NavLink></li>

                    </ul>

                </div>
            </div>
        </>
    );
};

export default Dashboard;