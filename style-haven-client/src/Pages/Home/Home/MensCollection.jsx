import React from 'react';
import img1 from "../../../assets//banner11.jpg"
import img2 from "../../../assets//banner12.jpg"

const MensCollection = () => {
    return (
        <div className='my-10'>
            <div className='text-center my-5'>
                <p className='text-pink-600'>New Collection</p>
                <h2 className='text-4xl uppercase '><span className='border-b-4  text-black'>Mens Collection</span></h2>
            </div>
            <div className='grid md:grid-cols-2 gap-4 '>
                <div className='relative transition duration-300 ease-in-out hover:scale-110'>
                    <img src={img1} alt="" />
                    <div className='absolute top-1/3 left-10 text-white text-center'>
                        <h2 className='text-4xl'>Handbag</h2>
                        <h2 className='text-4xl'>Men’s Collection</h2>
                        <span className='border-b-2'>Discover Now</span>
                    </div>
                </div>

                <div className='relative cursor-pointer transition duration-300 ease-in-out hover:scale-110'>
                    <img  src={img2} alt="" />
                    <div className='absolute top-1/3 left-10 text-white text-center '>
                        <h2 className='text-4xl'>Sneaker</h2>
                        <h2 className='text-4xl'>Men’s Collection</h2>
                        <span className='border-b-2'>Discover Now</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MensCollection;