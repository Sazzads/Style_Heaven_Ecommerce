import React from 'react';
import Cover from './Cover';
import Brand from './Brand';
import { Helmet } from 'react-helmet-async';
import AllItems from '../../AllItems/AllItems';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>StyleHeaven</title>
            </Helmet>
            <Cover></Cover>
            <div className='max-w-screen-xl mx-auto' >
                <Brand></Brand>
            </div>
            <AllItems></AllItems>
        </div>
    );
};

export default Home;