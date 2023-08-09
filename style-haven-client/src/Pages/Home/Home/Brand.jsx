import React from 'react';
import logo1 from "../../../assets/addidas.png"
import logo2 from "../../../assets/puma.png"
import logo3 from "../../../assets/lacoste.png"

const Brand = () => {
    return (
        <div className='my-5'>
            <div className='grid md:grid-cols-3 items-center gap-2 '>
                <div className=' w-28 mx-auto transition duration-500 hover:scale-125'>
                    <img src={logo1} alt="" />
                </div>
                <div className=' w-28 mx-auto transition duration-500 hover:scale-125'>
                    <img src={logo2} alt="" />
                </div>
                <div className=' w-28 mx-auto transition duration-500 hover:scale-125'>
                    <img src={logo3} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Brand;