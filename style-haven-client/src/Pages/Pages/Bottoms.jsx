import React, { useEffect, useState } from 'react';
import CategoryCard from '../Home/Home/Category/CategoryCard';

const Bottoms = () => {
    const [bottoms, setbottoms] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/category/bottoms`)
            .then(res => res.json())
            .then(data => {
                setbottoms(data);
            })
    }, [])
    return (
        <>
            <div className="max-w-screen-xl mx-auto my-10">
                <div>
                    <h3 className='text-5xl text-center mt-5'>Bottoms</h3>
                </div>
                <div className='grid md:grid-cols-4 gap-10 mb-5'>
                    {
                        bottoms.map((bottom) => {
                            return (
                                <div key={bottom._id}>
                                    <CategoryCard item={bottom}></CategoryCard>

                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </>
    );
};

export default Bottoms;