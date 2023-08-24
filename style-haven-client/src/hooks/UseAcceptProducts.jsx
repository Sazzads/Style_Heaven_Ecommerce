import { useQuery } from '@tanstack/react-query';
import React from 'react';

const UseAcceptProducts = () => {
    const {refetch, data: acceptProducts = [], isLoading: loading } = useQuery({
        queryKey: ['acceptProducts'],
        queryFn: async () => {
            const res = await fetch('https://style-haven-server.vercel.app/productsapproved/approved');
            return res.json();
        }
    })

    return [acceptProducts,refetch, loading]
};

export default UseAcceptProducts; 