import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import UseAcceptProducts from '../../../../hooks/UseAcceptProducts';

const OrderCategory = () => {
    const { category } = useParams()
    console.log(category);
    const [acceptProducts] = UseAcceptProducts();
    console.log(acceptProducts);
    const orderItems = acceptProducts.filter(item => item.category === category)
    console.log(orderItems);

    return (
        <div className='max-w-screen-xl mx-auto' > 
        <h2 className='text-center text-5xl my-5'>{category}</h2>
            <div className='grid md:grid-cols-3 gap-10 mb-5'>
                {
                    orderItems.map(item=><CategoryCard key={item._id} item={item}></CategoryCard>)
                }
                
            </div>
        </div>
    );
};

export default OrderCategory;