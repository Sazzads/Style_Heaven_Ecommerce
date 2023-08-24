import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

import menPic from "../../../../assets/men.png"
import womenPic from "../../../../assets//women.png"
import kidPic from "../../../../assets/kids.png"
import OrderTab from './OrderTab';
import { Link } from 'react-router-dom';
import UseAcceptProducts from '../../../../hooks/UseAcceptProducts';
const Category = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const [acceptProducts] = UseAcceptProducts();
    // console.log(acceptProducts);
    const mens = acceptProducts.filter(item => item.category === 'mens')
    const newMens = mens.slice(0, 8)
    const womens = acceptProducts.filter(item => item.category === 'womens')
    const newWomens = womens.slice(0, 8)
    const kids = acceptProducts.filter(item => item.category === 'kids')
    const newKids = kids.slice(0, 8)

    return (
        <div>

            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className='grid md:grid-cols-3 items-center gap-2 cursor-pointer border-none'>
                    <Tab >
                        <div className='relative'>
                            <img className='rounded-lg w-96' src={menPic} alt="" />
                            <div className='absolute top-0 left-0 right-0 bottom-0 py-52 bg-opacity-20 bg-black'>
                                <h1 className='text-center text-3xl text-white text-bold'>Men</h1>
                            </div>
                        </div>
                    </Tab>
                    <Tab >
                        <div className='relative'>
                            <img className='rounded-lg w-96' src={womenPic} alt="" />
                            <div className='absolute top-0 left-0 right-0 bottom-0 py-52 bg-opacity-20 bg-black'>
                                <h1 className='text-center text-3xl text-white text-bold'>women</h1>
                            </div>
                        </div>
                    </Tab>
                    <Tab >
                        <div className='relative'>
                            <img className='rounded-lg w-96' src={kidPic} alt="" />
                            <div className='absolute top-0 left-0 right-0 bottom-0 py-52 bg-opacity-20 bg-black'>
                                <h1 className='text-center text-3xl text-white text-bold'>Kids</h1>
                            </div>
                        </div>
                    </Tab>
                </TabList>
                <TabPanel>
                    <h2 className="text-4xl text-center py-5 ">Mens</h2>
                    <OrderTab items={newMens}></OrderTab>
                    <div className='flex items-center flex-col'>
                        <Link className='btn btn-outline border-0 border-b-4 mt-4 bg-pink-600 px-10' to={`/orderCategory/${'mens'}`}> <span className='text-white'>see more</span> </Link>
                    </div>
                </TabPanel>
                <TabPanel>
                    <h2 className="text-4xl text-center py-5">Womens</h2>
                    <OrderTab items={newWomens}></OrderTab>
                    <div className='flex items-center flex-col'>
                        <Link className='btn btn-outline border-0 border-b-4 mt-4 bg-pink-600 px-10' to={`/orderCategory/${'womens'}`}> <span className='text-white'>see more</span> </Link>
                    </div>

                </TabPanel>
                <TabPanel>
                    <h2 className="text-4xl text-center py-5">Kids</h2>
                    <OrderTab items={newKids}></OrderTab>
                    <div className='flex items-center flex-col'>
                        <Link className='btn btn-outline border-0 border-b-4 mt-4 bg-pink-600 px-10' to={`/orderCategory/${'kids'}`}> <span className='text-white'>see more</span> </Link>
                    </div>


                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Category;