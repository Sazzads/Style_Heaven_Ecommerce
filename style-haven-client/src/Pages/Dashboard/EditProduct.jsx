import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const EditProduct = () => {
    const navigate = useNavigate()
    //--------------------
    //get specific product ------
    //-----------------------------
    const { id } = useParams()
    const [axiosSecure] = useAxiosSecure()
    const { data: data = [], refetch } = useQuery(['product'], async () => {
        try {
            const response = await fetch(`http://localhost:5000/product/${id}`);
            const data = await response.json();
            return data; // Return the data to the useQuery hook
        } catch (error) {
            console.error('Error fetching data:', error);
            return []; // Return an empty array in case of an error
        }
    });

    //------------------------
    //update product----------------
    //------------------------
    const { user } = useAuth()
    const { email } = user
    const img_Hosting_token = import.meta.env.VITE_IMG_UPLOAD_TOKEN
    // console.log(img_Hosting_token);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_Hosting_token}`
    const onSubmit = data => {
        // alert(JSON.stringify(data.iceCreamType.value));
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
                    const saveProduct = { name: data.name, email: data.email, photoUrl: data.image, price: parseFloat(data.price), category: data.category, details: data.details }

                    //store product info into db 
                    console.log(saveProduct);
                    fetch(`http://localhost:5000/product/${id}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(saveProduct)
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data);
                            if (data.modifiedCount) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Your Product has been updated',
                                    showConfirmButton: false,
                                    timer: 1500
                                })

                            }
                            navigate("/dashboard/managepreoducts")
                        })
                    //------------------------------------


                }
            })


    };
    return (
        <div>
            <Helmet>
                <title>StyleHeaven || Update product</title>
            </Helmet>
            <h2 className='text-center text-3xl mt-10'>Add a New Product</h2>
            <div className=''>
                <div className=" border-2 mx-16 my-10 px-16 py-10 shadow-2xl">
                    <div className="flex justify-around items-center">
                        <img src={data[0]?.photoUrl} className="w-[25%] h-[25%] rounded-lg shadow-2xl" />
                        <div>
                            <h1 className="text-3xl font-bold">Product Name: {data[0]?.name}</h1>
                            <p className="py-1 text-lg"> Product Details: {data[0]?.details}</p>
                            <p className="py-1 text-lg">Product Category: {data[0]?.category}</p>
                            <p className="py-1 text-lg">Product Price: ${data[0]?.price}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-10 '>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body shadow-xl">
                    <div className='grid md:grid-cols-2 gap-10'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input  {...register("name", { required: true })} type="text" placeholder={data[0]?.name} className="input input-bordered" />
                            {errors.name && <span className='text-red-600'>This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" {...register("email")} defaultValue={email} placeholder="Type here" className="input input-bordered w-full " />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input  {...register("price", { required: true })} type="text" placeholder={data[0]?.price} className="input input-bordered" />
                            {errors.name && <span className='text-red-600'>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Details</span>
                            </label>
                            <input  {...register("details", { required: true })} type="text" placeholder={data[0]?.details} className="input input-bordered" />
                            {errors.name && <span className='text-red-600'>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select {...register("category", { required: true })} className="input input-bordered">
                                <option disabled>Pick One</option>
                                <option>mens</option>
                                <option>womens</option>
                                <option>kids</option>
                                <option>tops</option>
                                <option>bottoms</option>
                                <option>accessories</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Picture</span>
                            </label>
                            <input  {...register("image")} type="file" className="file-input file-input-bordered" />
                        </div>
                    </div>

                    <div className="form-control mt-6">
                        <input type="submit" value="Update Product" className="shadow-xl btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600 flex items-center bg-black w-1/2 mx-auto" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;