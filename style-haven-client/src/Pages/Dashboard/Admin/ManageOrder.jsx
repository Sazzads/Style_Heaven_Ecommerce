import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageOrder = () => {
    const [histories, setHistories] = useState([])
    const [axiosSecure] = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get('/allpaymenthistory')
            .then(res => {
                setHistories(res.data);
            })
    }, [])
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString(); // Format the date part
        const formattedTime = date.toLocaleTimeString(); // Format the time part
        return `Date: ${formattedDate} Time:${formattedTime}`;
    };
    return (
        <div className='mx-[2%] border-2'>
        <div>
            <h3 className="text-3xl text-center my-10">Manage Order</h3>
        </div>
        <div className="overflow-x-auto w-[100%] ">
            <table className="table scroll-x table-zebra border-2 ">
                {/* head */}
                <thead className=''>
                    <tr>
                        <th >Serial</th>
                        <th >Date</th>
                        <th >email</th>
                        <th>Products Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Transiction Id</th>
                        <th>delevary Status</th>
                        <th>Payment Status</th>
                        <th className='w-1'>Billing Address</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        histories.map((history, index) => {
                            return (
                                <tr key={history._id}>
                                    <th >{index + 1}</th>
                                    <th >{history.email}</th>
                                    <td >{formatDate(history.date)}</td>
                                    <td>
                                        {history.names.map((productName, nameIndex) => (
                                            <div key={nameIndex}>{productName}</div>
                                        ))}
                                    </td>
                                    <td>{history.quantity}</td>
                                    <td >{history.price}</td>
                                    <td className='w-1'>{history.trxID}</td>
                                    <td ><small>{history.delevaryStatus}</small></td>
                                    <td className='text-green-600'>{history?.paidStatus == true && 'Done'}</td>
                                    <td className='p-0'><small>{history?.billingAddress}</small></td>

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

export default ManageOrder;