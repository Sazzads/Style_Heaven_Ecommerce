import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
const AddProduct = () => {
    const { user } = useAuth();
    const { email } = user
    const [axiosSecure] = useAxiosSecure()
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
                    const status = "pending";
                    const saveProduct = { name: data.name, email: data.email, photoUrl: data.image, price: parseFloat(data.price), category: data.category, quantity:data.quantity, details: data.details, status }
                    // console.log(saveProduct);
                    //store product info into db 
                    axiosSecure.post('/product', saveProduct)
                        .then(data => {
                            // console.log('after posing item', data.data);
                            if (data.data.insertedId) {
                                // reset() //TODO-uncomment reset()
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Your work has been saved',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }

                        })



                }
            })


    };
    return (
        <div>
            <Helmet>
                <title>StyleHeaven || Add product</title>
            </Helmet>
            <h2 className='text-center text-3xl mt-10'>Add a New Product</h2>
            <div className='p-10 '>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className='grid md:grid-cols-2 gap-10'>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input  {...register("name", { required: true })} type="text" placeholder="name" className="input input-bordered" />
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
                            <input  {...register("price", { required: true })} type="text" placeholder="price" className="input input-bordered" />
                            {errors.name && <span className='text-red-600'>This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Details</span>
                            </label>
                            <input  {...register("details", { required: true })} type="text" placeholder="Detail" className="input input-bordered" />
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
                                <span className="label-text">product Quantity</span>
                            </label>
                            <input  {...register("quantity", { required: true })} type="text" placeholder="product Quantity" className="input input-bordered" />
                            {errors.name && <span className='text-red-600'>This field is required</span>}
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Picture</span>
                            </label>
                            <input  {...register("image")} type="file" className="file-input file-input-bordered" />

                        </div>

                    </div>





                    <div className="form-control mt-6">
                        <input type="submit" value="Add to Product" className="btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600 flex items-center bg-black w-1/2 mx-auto" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;