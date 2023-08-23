import React from 'react';
import AdminHeader from './AdminHeader';
import AdminChart from './AdminChart';

const AdminHome = () => {
    return (
        <div className='my-10'>
            {/* head  */}
            <AdminHeader></AdminHeader>
            {/* head  */}
            <AdminChart></AdminChart>
        </div>
    );
};

export default AdminHome;