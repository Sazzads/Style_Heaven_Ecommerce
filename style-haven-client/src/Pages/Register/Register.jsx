import React from 'react';
import Lottie from "lottie-react";
import pic from "../../assets/register.json"
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
const Register = () => {
    return (
        <div className='max-w-screen-xl mx-auto bg-slate-100'>
            <Helmet>
                <title>StyleHeaven || Register</title>
            </Helmet>
            <h2 className='text-center text-5xl my-5 pt-10'>Please register</h2>
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
                                <span className="label-text">Picture</span>
                            </label>
                            <input type="file" className="file-input file-input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">Password <FaEye className='cursor-pointer'></FaEye></span> <span className="label-text"> </span>
                            </label>
                            <input type="text" placeholder="password" className="input input-bordered" />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">Confirm Password <FaEye className='cursor-pointer'></FaEye></span> <span className="label-text"> </span>

                            </label>
                            <input type="text" placeholder="Confirm password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div>
                            <p>Don't Have An Account? <Link to="/login" className='text-red-600'>Please Login</Link></p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600 flex items-center bg-black w-1/2 mx-auto">register</button>
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

export default Register;