import React from 'react';
import Lottie from "lottie-react";
import pic from "../../assets/register.json"
import { Link } from 'react-router-dom';
const Register = () => {
    return (
        <div className='max-w-screen-xl mx-auto bg-slate-100'>
            <h2 className='text-center text-5xl my-5 pt-10'>Please Register</h2>
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
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input type="text" placeholder="Confirm password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn  bg-purple-700">Register</button>
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