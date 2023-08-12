import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Pages/Shared/NavBar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar1 from '../Pages/Shared/NavBar/Navbar1';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Main = () => {
    const location=useLocation()
    // console.log(location);
    return (
        <div>
            <ToastContainer />
            <Navbar1></Navbar1>
            <Navbar></Navbar>
            <Outlet ></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;