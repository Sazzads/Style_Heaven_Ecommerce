import React from 'react';
import pic1 from '../../../assets/pic-1.jpeg';
import pic2 from '../../../assets/pic-2.jpeg';
import pic3 from '../../../assets/pic-3.jpeg';
import pic4 from '../../../assets/pic-4.jpeg';
import { FaArrowRight } from 'react-icons/fa';

const Cover = () => {
    return (
        <div className=''>
            <div className="carousel w-full h-[900px] ">
                <div id="item1" className="carousel-item w-full relative">
                    <img src={pic1} className="w-full" />
                    <div className='absolute py-48 md:py-64 flex justify-between transform -translate-y-1/2  top-1/2 bg-opacity-40 bg-black text-white px-16'>
                        <div className='text-white space-y-7 w-1/2 '>
                            <h2 className='text-xl md:text-6xl'>Shop the Latest Trends</h2>
                            <p>Discover a curated collection of the season's hottest styles and must-have fashion essentials. Explore our wide range of clothing, accessories, and footwear designed to keep you on-trend and confident.</p>
                            <button className="btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600 flex items-center bg-black"><span className='me-2'>Shop Now</span> <FaArrowRight></FaArrowRight></button>
                        
                        </div>
                    </div>
                </div>
                <div id="item2" className="carousel-item w-full relative">
                    <img src={pic2} className="w-full" />
                    <div className='absolute py-48 md:py-64 flex justify-between transform -translate-y-1/2   top-1/2 bg-opacity-40 bg-black text-white px-16'>
                        <div className='text-white space-y-7 w-1/2 '>
                            <h2 className='text-xl md:text-6xl'>Shop the Latest Trends</h2>
                            <p>Discover a curated collection of the season's hottest styles and must-have fashion essentials. Explore our wide range of clothing, accessories, and footwear designed to keep you on-trend and confident.</p>
                            <button className="btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600 flex items-center bg-black"><span className='me-2'>Shop Now</span> <FaArrowRight></FaArrowRight></button>

                        </div>
                    </div>
                </div>
                <div id="item3" className="carousel-item w-full relative">
                    <img src={pic3} className="w-full" />
                    <div className='absolute py-48 md:py-64 flex justify-between transform -translate-y-1/2   top-1/2 bg-opacity-40 bg-black text-white px-16'>
                        <div className='text-white space-y-7 w-1/2 '>
                            <h2 className='text-xl md:text-6xl text-pur'>Shop the Latest Trends</h2>
                            <p>Discover a curated collection of the season's hottest styles and must-have fashion essentials. Explore our wide range of clothing, accessories, and footwear designed to keep you on-trend and confident.</p>
                            <button className="btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600 flex items-center bg-black"><span className='me-2'>Shop Now</span> <FaArrowRight></FaArrowRight></button>

                        </div>
                    </div>
                </div>
                <div id="item4" className="carousel-item w-full relative">
                    <img src={pic4} className="w-full" />
                    <div className='absolute py-48 md:py-64 flex justify-between transform -translate-y-1/2   top-1/2 bg-opacity-40 bg-black text-white px-16'>
                        <div className='text-white space-y-7 w-1/2 '>
                            <h2 className='text-xl md:text-6xl'>Shop the Latest Trends</h2>
                            <p>Discover a curated collection of the season's hottest styles and must-have fashion essentials. Explore our wide range of clothing, accessories, and footwear designed to keep you on-trend and confident.</p>
                            <button className="btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600 flex items-center bg-black"><span className='me-2'>Shop Now</span> <FaArrowRight></FaArrowRight></button>

                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center w-full py-2 gap-2">
                <a href="#item1" className="btn btn-xs bg-pink-600">1</a>
                <a href="#item2" className="btn btn-xs bg-pink-600">2</a>
                <a href="#item3" className="btn btn-xs bg-pink-600">3</a>
                <a href="#item4" className="btn btn-xs bg-pink-600">4</a>
            </div>
        </div>
    );
};

export default Cover;