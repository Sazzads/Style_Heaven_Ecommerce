import React from 'react';
import Cover from './Cover';
import Brand from './Brand';
import { Helmet } from 'react-helmet-async';
import Category from './Category/Category';


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
            <div className='max-w-screen-xl mx-auto' >
                <Category></Category>
            </div>

        </div>
    );
};

export default Home;