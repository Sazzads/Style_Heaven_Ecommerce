import React from 'react';
import SellerHeader from './SellerHeader';
import SellerChart from './SellerChart';
import SellerAreaChart from './SellerAreaChart';
import Table from './Table';

const SellerHome = () => {
    return (
        <div className='m-5'>
            {/* head  */}
            <SellerHeader></SellerHeader>
            {/* head  */}
            <div className='grid md:grid-cols-2 '>
                <SellerChart></SellerChart>
                <SellerAreaChart></SellerAreaChart>
            </div>
            <div className='grid md:grid-cols-2'>
                <div className='grid grid-cols-1'>
                    <div className='flex justify-around'>
                        <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{ "--value": 70 }}>70%</div>
                        <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{ "--value": 70 }}>70%</div>
                        <div className="radial-progress bg-primary text-primary-content border-4 border-primary" style={{ "--value": 70 }}>70%</div>
                    </div>
                    <div>
                        <div className="stats stats-vertical lg:stats-horizontal shadow">

                            <div className="stat">
                                <div className="stat-title">Downloads</div>
                                <div className="stat-value">31K</div>
                                <div className="stat-desc">Jan 1st - Feb 1st</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">New Users</div>
                                <div className="stat-value">4,200</div>
                                <div className="stat-desc">↗︎ 400 (22%)</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">New Registers</div>
                                <div className="stat-value">1,200</div>
                                <div className="stat-desc">↘︎ 90 (14%)</div>
                            </div>

                        </div>
                    </div>
                </div>
                <div>
                    <Table></Table>
                </div>
            </div>
        </div>
    );
};

export default SellerHome;