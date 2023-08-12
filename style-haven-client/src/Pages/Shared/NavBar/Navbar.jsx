import React, { useContext } from 'react';
import { FaSearch, FaAlignJustify, FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import { toast } from 'react-toastify';
import useCart from '../../../hooks/useCart';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext)
    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const navOptions = <>
        <li><Link className='me-1'>New</Link></li>
        <li><Link>Tops</Link></li>
        <li><Link>Bottoms</Link></li>
        <li><Link>Kids</Link></li>
        <li><Link>Accessories</Link></li>
        <li><Link>Collections</Link></li>
        <li><Link>Sale</Link></li>
    </>
    return (
        <div className='max-w-screen-xl mx-auto'>
            <div className="navbar bg-base-100 ">
                <div className="navbar-start">
                    <div className="dropdown ">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <FaAlignJustify></FaAlignJustify>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-hover  dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to="/" className="btn btn-ghost normal-case text-xl">Style Heaven</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <FaSearch className='h-5 w-5 me-2 '></FaSearch>
                    {/* Cart  */}
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item bg-pink-200 bg-opacity-20">+{cart.length || 0}</span>
                            </div>
                        </label>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-36 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">{cart.length || 0} Items</span>
                                <span className="text-info">Subtotal: $999</span>
                                <div className="card-actions">
                                    <Link to='/dashboard/mycart' className="px-5 py-2 bg-purple-800 rounded-lg flex items-center hover:bg-purple-500">View cart</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* profile pic  */}
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {user ? <img referrerPolicy='no-referrer' src={user?.photoURL} /> : <div className='text-3xl p-1'><FaUserAlt></FaUserAlt></div>}
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-36">
                            {
                                user ? <><li><Link to="/dashboard">Profile</Link></li><li onClick={handleLogOut}><a onClick={() => toast.success("Logout Successful")}>Logout</a></li></> : <li><Link to="/login">Login</Link></li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;