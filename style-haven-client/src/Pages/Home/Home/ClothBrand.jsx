import React from 'react';
import wekwnd from '../../../../public/brand.json'
const ClothBrand = () => {
    console.log(wekwnd);
    return (
        <div>

            <div className='text-center my-5'>
                <p className='text-pink-600'>Brands</p>
                <h2 className='text-4xl uppercase '><span className='border-b-4  text-black'>Top Brand</span></h2>
            </div>
            <div className='grid md:grid-cols-4'>
                {
                    wekwnd.map((dress, index) => {
                        return (
                            <div key={dress.id} className='card rounded-none cursor-pointer hover:bg-pink-300 relative transition duration-300 ease-in-out hover:scale-110'>
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