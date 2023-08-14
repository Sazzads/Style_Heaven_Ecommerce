import React from 'react';
import useAllItems from '../../../hooks/useAllItems';

const ManageSellerProduct = () => {
    const [allItems]=useAllItems()
    console.log(allItems);
    return (
        <div>
           <h2>seller product</h2>
        </div>
    );
};

export default ManageSellerProduct;