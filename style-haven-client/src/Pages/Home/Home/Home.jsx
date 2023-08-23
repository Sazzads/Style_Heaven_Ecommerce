import React from 'react';
import Cover from './Cover';
import Brand from './Brand';
import { Helmet } from 'react-helmet-async';
import Category from './Category/Category';
import NewCollection from './NewCollection';
import WeekendSels from './WeekendSels';
import ClothBrand from './ClothBrand';


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
            <div className='max-w-screen-xl mx-auto' >
                <NewCollection></NewCollection>
                <WeekendSels></WeekendSels>
                <ClothBrand></ClothBrand>
            </div>

        </div>
    );
};

export default Home;