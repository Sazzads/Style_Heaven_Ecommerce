import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { toast } from 'react-toastify';
import useAuth from '../../hooks/useAuth';
import Select from "react-select";
const AddProduct = () => {
    const { user } = useAuth();
    const { email } = user

    const img_Hosting_token = import.meta.env.VITE_IMG_UPLOAD_TOKEN
    // console.log(img_Hosting_token);
    const { control, register, handleSubmit, reset, watch, formState: { errors } } = useForm();
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
                    const saveUser = { name: data.name, email: data.email, photoUrl: data.image, price: data.price, category: data.category.value }
                    console.log(saveUser);
                    //store product info into db 





                }
            })


    };
    return (
        <div>
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
                                <span className="label-text">Category</span>
                            </label>
                            <Controller
                                name="category"
                                render={({ field }) => (
                                    <Select

                                        {...field}
                                        options={[
                                            { value: "mens", label: "Mens" },
                                            { value: "womens", label: "Womens" },
                                            { value: "kids", label: "Kids" },
                                            { value: "tops", label: "Tops" },
                                            { value: "bottoms", label: "Bottoms" },
                                            { value: "accessories", label: "Accessories" },
                                        ]}
                                    />
                                )}
                                control={control}
                                defaultValue=""
                            />
                        </div>


                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Picture</span>
                            </label>
                            <input  {...register("image")} type="file" className="file-input file-input-bordered" />

                        </div>

                    </div>





                    <div onClick={() => toast.success("Registration Successful")} className="form-control mt-6">
                        <input type="submit" value="Register" className="btn btn-outline border-0 border-b-4 mt-4 text-white bg-pink-600 flex items-center bg-black w-1/2 mx-auto" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;