import React, { useEffect, useState } from 'react';
import CategoryCard from '../Home/Home/Category/CategoryCard';

const Tops = () => {
    const [tops, setTops] = useState([])
    useEffect(() => {
        fetch(`https://style-haven-server.vercel.app/category/tops`)
            .then(res => res.json())
            .then(data => {
                setTops(data);
            })
    }, [])
    return (
        <div className='max-w-screen-xl mx-auto my-10'>
            <div>
                <h3 className="text-5xl text-center my-5">Tops</h3>
            </div>
            <div className='grid md:grid-cols-4 gap-10 mb-5 justify-center'>
                {
                    tops.map((top) => {
                        return (
                            <div key={top._id}>
                                <CategoryCard item={top}></CategoryCard>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    );
};

export default Tops;