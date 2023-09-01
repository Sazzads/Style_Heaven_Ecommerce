import React from 'react';
import CategoryCard from './CategoryCard';
import { Link } from 'react-router-dom';

const OrderTab = ({ items }) => {
    // console.log(items);
    return (
        <>
            <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-10 mb-5 justify-center'>
                {
                    items.map(item => <CategoryCard key={item._id} item={item}></CategoryCard>)
                }
            </div>
            
        </>
    )
};

export default OrderTab;