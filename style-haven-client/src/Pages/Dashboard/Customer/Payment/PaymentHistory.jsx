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
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString(); // Format the date part
        const formattedTime = date.toLocaleTimeString(); // Format the time part
        return `Date: ${formattedDate} Time:${formattedTime}`;
    };
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
        <div className='mx-10'>
            <div>
                <h3 className="text-3xl text-center my-10">Payment Hisotry</h3>
            </div>
            <div className="overflow-x-clip">
                <table className="table table-zebra w-100 border-2">
                    {/* head */}
                    <thead className=''>
                        <tr>
                            <th >Serial</th>
                            <th >Date</th>
                            <th>Products Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Transiction Id</th>
                            <th>delevary Status</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            histories.map((history, index) => {
                                return (
                                    <tr key={history._id}>
                                        <th >{index + 1}</th>
                                        <td >{formatDate(history.date)}</td>
                                        <td>
                                            {history.names.map((productName, nameIndex) => (
                                                <div key={nameIndex}>{productName}</div>
                                            ))}
                                        </td>
                                        <td>{history.quantity}</td>
                                        <td >{history.price}</td>
                                        <td>{history.trxID}</td>
                                        <td>{history.delevaryStatus}</td>
                                        <td className='text-green-600'>{history?.paidStatus == true && 'Done'}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;