import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/NavBar/Navbar';
import { FaCashRegister, FaDollarSign, FaHome, FaHouseUser, FaShoppingCart, FaTshirt, FaUserAlt, FaUserTie, FaWallet } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import UseCustomer from '../hooks/UseCustomer';
import Footer from '../Pages/Shared/Footer/Footer';
import AdminHome from '../Pages/Dashboard/Admin/AdminHome/AdminHome';
import CustomerDashboard from '../Pages/Dashboard/Customer/CustomerDashboard/CustomerDashboard';

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
                    {/* {isAdmin &&<AdminHome></AdminHome>}
                    {isSeller &&<AdminHome></AdminHome>}
                    {isCustomer&& <CustomerDashboard></CustomerDashboard>} */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full border-2 text-base-content">
                        {/* Sidebar content here */}
                        {
                            isAdmin &&
                            <>
                                <li><NavLink to='/dashboard/home'><FaHouseUser></FaHouseUser>Admin Home </NavLink></li>
                                <li><NavLink to='/dashboard/users'><FaUserAlt></FaUserAlt>Users </NavLink></li>
                                <li><NavLink to='/dashboard/managesellerproduct'><FaTshirt></FaTshirt>Manage Product </NavLink></li>
                                <li><NavLink to='/dashboard/manageorder'><FaCashRegister></FaCashRegister>Manage Order </NavLink></li>
                                <li><NavLink to='/dashboard/allPaymentshistory'><FaDollarSign></FaDollarSign>All Payment History </NavLink></li>
                            </>
                        }
                        {isSeller && <>
                            <li><NavLink to='/dashboard/sellerhome'><FaHouseUser></FaHouseUser>seller Home </NavLink></li>
                            <li><NavLink to='/dashboard/addproduct'><FaTshirt></FaTshirt>Add Product </NavLink></li>
                            <li><NavLink to='/dashboard/managepreoducts'><FaTshirt></FaTshirt>Manage Products </NavLink></li>
                            <li><NavLink to='/dashboard/approvedproducts'><FaTshirt></FaTshirt>Approved Products </NavLink></li>
                            <li><NavLink to='/dashboard/orderedproducts'><FaTshirt></FaTshirt>Orderd Products </NavLink></li>
                        </>}
                        {isCustomer && <>
                            <li><NavLink to='/dashboard/customerhome'><FaHouseUser></FaHouseUser>Customer Home </NavLink></li>
                            <li><NavLink to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart>cart </NavLink></li>
                            <li><NavLink to='/dashboard/paymenthistory'><FaShoppingCart></FaShoppingCart>Payment History</NavLink></li>
                            <li><NavLink to='/allproducts'><FaTshirt></FaTshirt>All Product </NavLink></li>
                        </>}

                        <div className='divider'></div>
                        <li><NavLink to='/'><FaHome></FaHome>Home </NavLink></li>
                        <li><NavLink to='/'><FaHome></FaHome>Blog </NavLink></li>

                    </ul>

                </div>
            </div>
            {/* <Footer></Footer> */}
            <div className='mt-5'>
                
            </div>
        </>
    );
};

export default Dashboard;