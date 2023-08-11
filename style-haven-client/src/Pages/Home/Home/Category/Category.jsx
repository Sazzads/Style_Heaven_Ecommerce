import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

import menPic from "../../../../assets/men.png"
import womenPic from "../../../../assets//women.png"
import kidPic from "../../../../assets/kids.png"
import useAllItems from '../../../../hooks/useAllItems';
import OrderTab from './OrderTab';
import { Link } from 'react-router-dom';
const Category = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const [allItems] = useAllItems();

    const soups = allItems.filter(item => item.category === 'soup')
   const  newSoups=soups.slice(0,6)
    const salads = allItems.filter(item => item.category === 'salad')
   const  newSalad=salads.slice(0,6)
   const pizzas = allItems.filter(item => item.category === 'pizza')
   const  newPizzas=pizzas.slice(0,6)

    return (
        <div>

            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className='grid md:grid-cols-3 items-center gap-2 cursor-pointer border-none'>
                    <Tab >
                        <div className='relative'>
                            <img className='rounded-lg w-96' src={menPic} alt="" />
                            <div className='absolute py-60  px-36 left-6 top-1 bg-opacity-20 bg-black'>
                                <h1 className='text-center text-3xl text-white text-bold'>Men</h1>
                            </div>
                        </div>
                    </Tab>
                    <Tab >
                        <div className='relative'>
                            <img className='rounded-lg w-96' src={womenPic} alt="" />
                            <div className='absolute py-60  px-32 left-4  top-1 bg-opacity-20 bg-black'>
                                <h1 className='text-center text-3xl text-white text-bold'>women</h1>
                            </div>
                        </div>
                    </Tab>
                    <Tab >
                        <div className='relative'>
                            <img className='rounded-lg w-96' src={kidPic} alt="" />
                            <div className='absolute py-60  px-36 left-6 top-1 bg-opacity-20 bg-black'>
                                <h1 className='text-center text-3xl text-white text-bold'>Kids</h1>
                            </div>
                        </div>
                    </Tab>
                </TabList>
                <TabPanel>
                    <h2 className="text-4xl text-center py-5 ">Mens</h2>
                    <OrderTab items={newSoups}></OrderTab>
                    <div className='flex items-center flex-col'>
                        <Link className='btn btn-outline border-0 border-b-4 mt-4 bg-pink-600 px-10' to={`/orderCategory/${'soup'}`}> <span className='text-white'>see more</span> </Link>
                    </div>
                </TabPanel>
                <TabPanel>
                    <h2 className="text-4xl text-center py-5">Womens</h2>
                    <OrderTab items={newSalad}></OrderTab>
                    <div className='flex items-center flex-col'>
                        <Link className='btn btn-outline border-0 border-b-4 mt-4 bg-pink-600 px-10' to={`/orderCategory/${'salad'}`}> <span className='text-white'>see more</span> </Link>
                    </div>

                </TabPanel>
                <TabPanel>
                    <h2 className="text-4xl text-center py-5">Kids</h2>
                    <OrderTab items={newPizzas}></OrderTab>
                    <div className='flex items-center flex-col'>
                        <Link className='btn btn-outline border-0 border-b-4 mt-4 bg-pink-600 px-10' to={`/orderCategory/${'pizza'}`}> <span className='text-white'>see more</span> </Link>
                    </div>


                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Category;