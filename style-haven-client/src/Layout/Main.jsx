import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/NavBar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar1 from '../Pages/Shared/NavBar/Navbar1';

const Main = () => {
    return (
        <div>
            <Navbar1></Navbar1>
            <Navbar></Navbar>
            <Outlet ></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;