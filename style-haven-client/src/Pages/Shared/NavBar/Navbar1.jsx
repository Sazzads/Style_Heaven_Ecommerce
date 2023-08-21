import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa";

const Navbar1 = () => {
    return (
        <div className=''>
            <div className='h-[50px] bg-[#2d3436] flex items-center justify-around text-white'>
                <div>Support +88 01 733 4398 12</div>
                <div>Free US shipping an all orders $100+ Learn more</div>
                <div className=''>
                    <Link className='me-2'>Shipping</Link>
                    <Link className='me-2'>FAQ</Link>
                    <Link className='me-2'>Contact</Link>
                    <div className="dropdown dropdown-hover">
                        <label tabIndex={0} className=" flex items-center"><span className='me-1'>Eng | S </span><FaAngleDown></FaAngleDown></label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu  shadow bg-purple-500 rounded-box ">
                            <li><a>Spanish</a></li>
                            <li><a>Bangla</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar1;