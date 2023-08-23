import React from 'react';
import wekwnd from '../../../../public/brand.json'
const ClothBrand = () => {
    console.log(wekwnd);
    return (
        <div>
            <div className='text-center my-5'>
                
                <h3 className='text-3xl font-semibold'>Brand</h3>
            </div>
            <div className='grid md:grid-cols-4'>
                {
                    wekwnd.map((dress, index) => {
                        return (
                            <div key={dress.id} className='card rounded-none cursor-pointer hover:bg-pink-300 relative'>
                                <img src={dress.img} alt="" />
                                <div className='text-center font-semibold absolute top-1/2 left-10 right-10 '>
                                    {dress.name}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default ClothBrand;