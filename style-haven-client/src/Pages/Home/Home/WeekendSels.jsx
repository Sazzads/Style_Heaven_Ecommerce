import React from 'react';
import wekwnd from '../../../../public/weekendSels.json'
const WeekendSels = () => {
    console.log(wekwnd);
    return (
        <div>
            <div className='text-center my-5'>
                <p className='text-pink-600'>TOP SELLING</p>
                <h3 className='text-3xl font-semibold'>Best Weekend Sellers</h3>
            </div>
            <div className='grid md:grid-cols-4 gap-4 '>
                {
                    wekwnd.map((dress, index) => {
                        return (
                            <div key={dress.id} className='card border-2 cursor-pointer hover:bg-pink-300'>
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