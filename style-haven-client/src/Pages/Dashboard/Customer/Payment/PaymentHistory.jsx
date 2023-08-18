import React, { useEffect, useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const [histories, setHistories] = useState([])

    useEffect(() => {
        axiosSecure.get(`/paymenthistory/${user?.email}`)
            .then(res => {
                setHistories(res.data);
            })
    }, [])

    console.log(histories);
    // const { data: data = [], refetch } = useQuery(['paymenthistory'], async () => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/paymenthistory/${user?.email}`);
    //         const data = await response.json();
    //         console.log(data);
    //         return data; // Return the data to the useQuery hook
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         return []; // Return an empty array in case of an error
    //     }
    // });
    return (
        <>
            <div>
                <h3 className="text-3xl text-center my-10">Payment Hisotry</h3>
            </div>
            <div className="overflow-x-clip">
                <table className="table table-zebra w-100 border-2">
                    {/* head */}
                    <thead className=''>
                        <tr>
                            <th>Serial</th>
                            <th>Date</th>
                            <th>Products Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Transiction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            histories.map((history, index) => {

                                return (
                                    <tr key={history._id}>
                                        <th >{index + 1}</th>
                                        <td >{history.date}</td>
                                        <td>
                                            {history.names.map((productName, nameIndex) => (
                                                <div key={nameIndex}>{productName}</div>
                                            ))}
                                        </td>
                                        <td>{history.quantity}</td>
                                        <td >{history.price}</td>
                                        <td>{history.trxID}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PaymentHistory;