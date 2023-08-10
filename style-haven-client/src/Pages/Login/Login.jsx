import React from 'react';
import Lottie from "lottie-react";
import pic from "../../assets/register.json"
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';

const Login = () => {
    return (
        <div className='max-w-screen-xl mx-auto bg-slate-100'>
            <Helmet>
                <title>StyleHeaven || Login</title>
            </Helmet>
            <h2 className='text-center text-5xl my-5 pt-10'>Please Login</h2>
            <div className='grid md:grid-cols-2  '>
                <div className='p-16 '>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" className="input input-bordered" />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">Password <FaEye className='cursor-pointer'></FaEye></span> <span className="label-text"> </span>
                            </label>
                            <input type="text" placeholder="password" className="input input-bordered" />

                        </div>

                        <div>
                            <p>Don't Have An Account? <Link to="/register" className='text-red-600'>Please Register</Link></p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn  bg-purple-700">Login</button>
                        </div>
                    </div>
                </div>
                <div className='p-24 '>
                    <Lottie animationData={pic} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default Login;