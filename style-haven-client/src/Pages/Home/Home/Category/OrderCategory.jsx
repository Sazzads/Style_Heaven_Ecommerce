import React from 'react';
import { useParams } from 'react-router-dom';
import useAllItems from '../../../../hooks/useAllItems';
import CategoryCard from './CategoryCard';

const OrderCategory = () => {
    const { category } = useParams()
    const [allItems] = useAllItems();
    const orderItems = allItems.filter(item => item.category === category)
    console.log(orderItems);

    return (
        <div className='max-w-screen-xl mx-auto' > 
        <h2 className='text-center text-5xl my-5'>{category}</h2>
            <div className='grid md:grid-cols-3 gap-10 mb-5'>
                {
                    orderItems.map(item=><CategoryCard item={item}></CategoryCard>)
                }
                
            </div>
        </div>
    );
};

export default OrderCategory;