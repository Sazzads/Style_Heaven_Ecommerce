import React, { useContext } from 'react';
import Lottie from "lottie-react";
import pic from "../../assets/register.json"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { AuthContext } from '../../providers/AuthProvider';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
const Login = () => {
    const { signIn } = useContext(AuthContext)
    const navigate=useNavigate()
    const location=useLocation()
    const from=location.state?.from?.pathname || "/";
  

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
            })
        console.log(data)
        navigate(from,{replace:true})
    };
    // const notify = () => toast("Login Successful");
    return (
        <div className='max-w-screen-xl mx-auto bg-slate-100'>
            <Helmet>
                <title>StyleHeaven || Login</title>
            </Helmet>
            <h2 className='text-center text-5xl my-5 pt-10'>Please Login</h2>
            <div className='grid md:grid-cols-2  '>
                <div className='p-16 '>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input {...register("name", { required: true })} type="text" placeholder="name" className="input input-bordered" />
                            {errors.name && <span className='text-red-600'>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input  {...register("email", { required: true })} type="text" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className='text-red-600'>This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">Password <FaEye className='cursor-pointer'></FaEye></span> <span className="label-text"> </span>
                            </label>
                            <input {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/ })} type="text" placeholder="password" className="input input-bordered" />
                            {errors.password && <span className='text-red-600'>Password must be At least 6 characters, One capital letter and one special charecters</span>}


                        </div>

                        <div>
                            <p>Don't Have An Account? <Link to="/register" className='text-red-600'>Please Register</Link></p>
                        </div>
                        <div onClick={ () => toast("Login Successful")} className="form-control mt-6">
                        <input type="submit" value="Login" className="btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600 flex items-center bg-black w-1/2 mx-auto" />

                        </div>
                    </form>
                    <SocialLogin></SocialLogin>
                </div>
                <div className='p-24 '>
                    <Lottie animationData={pic} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default Login;