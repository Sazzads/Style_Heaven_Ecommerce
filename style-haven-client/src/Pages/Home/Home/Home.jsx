import React from 'react';
import Cover from './Cover';
import Brand from './Brand';

const Home = () => {
    return (
        <div>
            <Cover></Cover>
            <div className='className=' max-w-screen-xl mx-auto>
                <Brand></Brand>
            </div>
        </div>
    );
};

export default Home;