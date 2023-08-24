import React, { useEffect, useState } from 'react';
import CategoryCard from '../Home/Home/Category/CategoryCard';

const Kids = () => {
    const [kids, setKids] = useState([]);
    useEffect(() => {
        fetch(`https://style-haven-server.vercel.app/category/kids`)
            .then(res => res.json())
            .then(data => {
                setKids(data);
            })
    }, [])
    return (
        <>
            <div className='max-w-screen-xl mx-auto my-10'>
                <div className='text-5xl text-center my-5'>
                    Kids
                </div>
                <div className='grid md:grid-cols-4 my-5 gap-10'>
                    {
                        kids.map((kid) => {
                            return (
                                <div key={kid._id}>
                                    <CategoryCard item={kid}></CategoryCard>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </>
    );
};

export default Kids;