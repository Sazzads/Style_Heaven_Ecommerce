import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../../../hooks/useCart';
import LazyLoad from 'react-lazy-load';

const CategoryCard = ({ item }) => {
    const { name, photoUrl: image, price, recipe, _id, quantity, details, soldproduct } = item
    // console.log(item);
    const [isHovered, setIsHovered] = useState(false);

    const { user } = useContext(AuthContext)
    const [cart, refetch] = useCart()
    const location = useLocation()
    const navigate = useNavigate()
    const handleAddTocart = item => {
        // console.log(item);
        // Item is already in the cart, show an alert
        const itemInCart = cart.find(cartItem => cartItem.itemId === _id);
        const cartquantity = 1
        if (itemInCart) {

            toast.warning("Item is already in the cart");
        }

        else if (user && user.email) {
            const cartItem = { itemId: _id, name, image, price, quantity, cartquantity, email: user.email, soldproduct }
            fetch('https://style-haven-server.vercel.app/carts', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch()
                        toast.success("items Added to the cart")
                    }
                })

        }
        else {
            toast.error("Please Login")
            navigate("/login", { state: { from: location } })
        }
    }
    return (
        <>
            <div
                className="card w-80 bg-base-100 shadow-xl relative transition duration-300 ease-in-out hover:scale-110"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <LazyLoad offset={50} threshold={0.95}>

                <figure>
                    <img src={image} alt="loading" loading="lazy" />
                </figure>
                </LazyLoad>
                {isHovered && (
                    <div className='absolute bg-black bg-opacity-40 text-white text-center top-0 bottom-0 left-0 right-0 rounded-2xl '>
                        <div className='mt-60'>
                            <h2 className="text-2xl uppercase mt-10">{name}</h2>
                            <p className='mt-5'>Price:${price}</p>
                            <h2 className="mt-5 px-5">Details:{details}</h2>
                        </div>
                    </div>
                )}
                <div className="absolute -bottom-5 left-1/3">
                    <button
                        onClick={() => handleAddTocart(item)}
                        className="btn btn-outline border-0 border-b-4 mt-4 bg-pink-600"
                        disabled={soldproduct >= quantity}
                    >
                        <span className='text-white'>
                            {soldproduct >= quantity ? 'Out of Stock' : 'Add to Cart'}
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default CategoryCard;