import React, { useContext } from 'react';
import { AuthContext } from '../../../../providers/AuthProvider';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import useCart from '../../../../hooks/useCart';

const CategoryCard = ({ item }) => {
    const { name, photoUrl: image, price, recipe, _id, quantity, details, soldproduct } = item
    // console.log(item);

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
            const cartItem = { itemId: _id, name, image, price, quantity, email: user.email, soldproduct }
            fetch('http://localhost:5000/carts', {
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
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className='absolute right-0 mr-4 mt-4 bg-black bg-opacity-40 rounded-md text-white'>Price:${price}</p>
                <div className="card-body ">
                    <h2 className="card-title">{name}</h2>
                    <h2 className="">Details:{details}</h2>

                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button
                            onClick={() => handleAddTocart(item)}
                            className="btn btn-outline border-0 border-b-4 mt-4 bg-pink-600"
                            disabled={soldproduct >= quantity} // Disable if soldproduct >= quantity
                        >
                            <span className='text-white'>
                                {soldproduct >= quantity ? 'Out of Stock' : 'Add to Cart'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryCard;