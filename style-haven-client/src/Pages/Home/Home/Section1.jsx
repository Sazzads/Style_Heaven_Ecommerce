import React from 'react';
import img1 from "../../../assets/banner8.jpg"
import img2 from "../../../assets/banner9.jpg"
import img3 from "../../../assets/banner10.jpg"
const Section1 = () => {
    return (
        <div className='my-10'>
            <div className='grid md:grid-cols-3 gap-4 '>
                <div className='relative transition duration-300 ease-in-out hover:scale-110'>
                    <img src={img1} alt="" />   
                </div>

                <div className='relative cursor-pointer transition duration-300 ease-in-out hover:scale-110'>
                    <img  src={img2} alt="" />
                </div>

                <div className='relative cursor-pointer transition duration-300 ease-in-out hover:scale-110'>
                    <img  src={img3} alt="" />
                </div>

            </div>
        </div>
    );
};

export default Section1;