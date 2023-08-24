import React from 'react';
import pic from '../../../../assets/cta.jpg'
import { FaArrowRight } from 'react-icons/fa';

const NewFashion = () => {
    return (
        <div className='my-10'>
            <div className='text-center my-5'>
                <p className='text-pink-600 uppercase'>TOP Fashion</p>
                <h2 className='text-center text-4xl uppercase '><span className='border-b-4  text-black'>Top fashion of this week</span></h2>
            </div>
            <div className='relative'>
                <img src={pic} alt="" />
                <div className='absolute top-1/3 left-32 right-32 text-white'>
                    <div className='text-center space-y-3'>
                        <h6 className='text-pink-300'>T&nbsp; R&nbsp; E&nbsp; N&nbsp; D&nbsp; I&nbsp; N&nbsp; G</h6>
                        <h2 className='text-4xl'>New Fashion</h2>
                        <p>Discover the future of fashion with our handpicked collection of the <br />  latest trends. Embrace innovation, style,
                            and individuality .</p>
                        <button className="btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600  bg-black"><span className='me-2'>Shop Now</span> <FaArrowRight></FaArrowRight></button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewFashion;