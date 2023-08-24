import React from 'react';
import newcollectionPic from "../../../assets/Frame34.png"
import { FaArrowRight } from 'react-icons/fa';

const NewCollection = () => {
    return (
        <div className='my-10'>
            <div className='relative '>
                <img  src={newcollectionPic} alt="" />
                <div className='absolute top-1/3 left-20 text-5xl font-semibold'>
                    <h2 >New <span className='text-pink-600'>2023</span></h2>
                    <h2 >Clothes Collection</h2>
                    <button className="btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600 flex items-center bg-black"><span className='me-2'>Shop Now</span> <FaArrowRight></FaArrowRight></button>

                </div>
            </div>
        </div>
    );
};

export default NewCollection;