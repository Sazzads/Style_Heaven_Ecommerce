import React from 'react';
import CategoryCard from './CategoryCard';
import { Link } from 'react-router-dom';

const OrderTab = ({ items }) => {
    // console.log(items);
    return (
        <>
            <div className='grid md:grid-cols-3 gap-10 mb-5'>
                {
                    items.map(item => <CategoryCard key={item._id} item={item}></CategoryCard>)
                }
            </div>
            
        </>
    )
};

export default OrderTab;