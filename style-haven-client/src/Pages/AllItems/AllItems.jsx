import React from 'react';
import useAllItems from '../../hooks/useAllItems';

const AllItems = () => {
    const [allItems]=useAllItems();
    const popular=allItems.filter(items=>items.category==='popular')
    console.log(popular);
    return (
        <div>
            
        </div>
    );
};

export default AllItems;