import React from 'react';
import Cover from './Cover';
import Brand from './Brand';
import { Helmet } from 'react-helmet-async';
import Category from './Category/Category';
import NewCollection from './NewCollection';
import WeekendSels from './WeekendSels';
import ClothBrand from './ClothBrand';
import MensCollection from './MensCollection';
import Section1 from './Section1';
import CountDown from './CountDown';
import NewFashion from './Category/NewFashion';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>StyleHeaven</title>
            </Helmet>
            <Cover></Cover>
            <div className='max-w-screen-xl mx-auto' >
                <Brand></Brand>
                <CountDown initialDays={150}></CountDown>
            </div>
            <div className='max-w-screen-xl mx-auto' >
                <Category></Category>
            </div>
            <div className='max-w-screen-xl mx-auto' >
                <NewCollection></NewCollection>
                <WeekendSels></WeekendSels>
                <MensCollection></MensCollection>
                <Section1></Section1>
                <ClothBrand></ClothBrand>
                <NewFashion></NewFashion>
            </div>
        </div>
    );
};

export default Home;