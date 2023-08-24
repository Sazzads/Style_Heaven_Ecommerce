import React from 'react';
import wekwnd from '../../../../public/weekendSels.json'
const WeekendSels = () => {
    console.log(wekwnd);
    return (
        <div>
            <div className='text-center my-5'>
                <p className='text-pink-600'>TOP SELLING</p>
                <h2 className='text-center text-4xl uppercase '><span className='border-b-4  text-black'>Best Weekend Sellers</span></h2>
            </div>
         
        
            <div className='grid md:grid-cols-4 gap-4 '>
                {
                    wekwnd.map((dress, index) => {
                        return (
                            <div key={dress.id} className='card border-2 cursor-pointer hover:bg-pink-300 transition duration-300 ease-in-out hover:scale-110'>
                                <img src={dress.img} alt="" />
                                <div className='text-center font-semibold my-3 '>

                                <p>{dress.name}</p>
                                <p className='text-pink-600'>$ {dress.price}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default WeekendSels;