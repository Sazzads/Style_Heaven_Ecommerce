import { useQuery } from '@tanstack/react-query';
import React from 'react';

const UseAcceptProducts = () => {
    const {refetch, data: acceptProducts = [], isLoading: loading } = useQuery({
        queryKey: ['acceptProducts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/productsapproved/approved');
            return res.json();
        }
    })

    return [acceptProducts,refetch, loading]
};

export default UseAcceptProducts;