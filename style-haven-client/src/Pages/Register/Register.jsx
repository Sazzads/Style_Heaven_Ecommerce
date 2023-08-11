import React, { useContext } from 'react';
import Lottie from "lottie-react";
import pic from "../../assets/register.json"
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../providers/AuthProvider';
const Register = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const img_Hosting_token = import.meta.env.VITE_IMG_UPLOAD_TOKEN
    console.log(img_Hosting_token);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_Hosting_token}`
    const onSubmit = data => {
        const formData = new FormData();
        formData.append("image", data.image[0])
        fetch(img_hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const newdata = data;
                    newdata.image = imgURL
                    createUser(data.email, data.password)
                        .then(result => {
                            const loggedUser = result.user;
                            console.log(loggedUser);
                            updateUserProfile(data.name, data.image)
                                .then(() => {
                                    console.log("user updated");
                                    reset()
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        })
                    // console.log(data);
                }
            })


    };


    return (
        <div className='max-w-screen-xl mx-auto bg-slate-100'>
            <Helmet>
                <title>StyleHeaven || Register</title>
            </Helmet>
            <h2 className='text-center text-5xl my-5 pt-10'>Please register</h2>
            <div className='grid md:grid-cols-2  '>
                <div className='p-16 '>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input  {...register("name", { required: true })} type="text" placeholder="name" className="input input-bordered" />
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
                                <span className="label-text">Picture</span>
                            </label>
                            <input  {...register("image")} type="file" className="file-input file-input-bordered" />

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">Password <FaEye className='cursor-pointer'></FaEye></span> <span className="label-text"> </span>
                            </label>
                            <input {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/ })} type="text" placeholder="password" className="input input-bordered" />
                            {errors.password && <span className='text-red-600'>Password must be At least 6 characters, One capital letter and one special charecters</span>}

                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text flex items-center gap-2">Confirm Password <FaEye className='cursor-pointer'></FaEye></span> <span className="label-text"> </span>

                            </label>
                            <input  {...register("confirmPassword", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/ })} type="text" placeholder="Confirm password" className="input input-bordered" />
                            {errors.confirmPassword && <span className='text-red-600'>Password must be At least 6 characters, One capital letter and one special charecters</span>}
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div>
                            <p>Don't Have An Account? <Link to="/login" className='text-red-600'>Please Login</Link></p>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" value="Register" className="btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600 flex items-center bg-black w-1/2 mx-auto" />
                        </div>
                    </form>
                </div>
                <div className='p-24 '>
                    <Lottie animationData={pic} loop={true} />
                </div>
            </div>
        </div>
    );
};

export default Register;