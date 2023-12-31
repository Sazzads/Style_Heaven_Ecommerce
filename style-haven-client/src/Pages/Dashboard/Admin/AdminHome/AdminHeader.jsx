import React from 'react';

const AdminHeader = () => {
    return (
        <div>
            <div className='flex justify-around md:flex-row flex-col'>
                {/* head 1 */}
                <div className="grid md:grid-cols-3">

                    <div className="stat">
                        <div className="stat-figure text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                        </div>
                        <div className="stat-title">Total Likes</div>
                        <div className="stat-value text-primary">25.6K</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <div className="stat-title">Page Views</div>
                        <div className="stat-value text-secondary">2.6M</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                    <div className="stat">
                        <div className="stat-figure text-secondary">
                            <div className="avatar online">
                                <div className="w-16 rounded-full">
                                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                </div>
                            </div>
                        </div>
                        <div className="stat-value">86%</div>
                        <div className="stat-title">Tasks done</div>
                        <div className="stat-desc text-secondary">31 tasks remaining</div>
                    </div>

                </div>
                {/* head 1  */}
                {/* head 2 */}
                <div className="stats bg-primary text-primary-content">

                    <div className="stat">
                        <div className="stat-title">Account balance</div>
                        <div className="stat-value">$89,400</div>
                        <div className="stat-actions">
                            <button className="btn btn-sm btn-success">Add funds</button>
                        </div>
                    </div>

                    <div className="stat">
                        <div className="stat-title">Current balance</div>
                        <div className="stat-value">$89,400</div>
                        <div className="stat-actions">
                            <button className="btn btn-sm">Withdrawal</button>
                            <button className="btn btn-sm">deposit</button>
                        </div>
                    </div>

                </div>
                {/* head 2 */}
            </div>
        </div>
    );
};

export default AdminHeader;