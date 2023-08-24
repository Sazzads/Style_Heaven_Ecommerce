import React, { useEffect, useState } from 'react';
import CategoryCard from '../Home/Home/Category/CategoryCard';

const Accessories = () => {
    const [accessories, setAccessories] = useState([]);
    useEffect(() => {
        fetch(`https://style-haven-server.vercel.app/category/accessories`)
            .then(res => res.json())
            .then(data => {
                setAccessories(data)
            })
    }, [])
    return (
        <div className='max-w-screen-xl mx-auto my-10'>
            <div className='text-5xl text-center my-5'>
                Accessories
            </div>
            <div className='grid md:grid-cols-4 gap-10 mb-5'>
                {
                    accessories.map((accessories) => {
                        return (
                            <div key={accessories._id}>
                                <CategoryCard item={accessories}></CategoryCard>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Accessories;