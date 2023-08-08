import React from 'react';
import { FaShoppingCart, FaSearch, FaUserAlt, FaAlignJustify } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
                    <a className="btn btn-ghost normal-case text-xl">Style Heaven</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <FaSearch className='h-5 w-5 me-2 '></FaSearch>
                    <FaShoppingCart className='h-5 w-5 me-2 '></FaShoppingCart>
                    <FaUserAlt className='h-5 w-5 me-2 '></FaUserAlt>
                </div>
            </div>
        </div>
    );
};

export default Navbar;