import React from 'react';
import useCart from '../../../../../hooks/useCart';
import useAuth from '../../../../../hooks/useAuth';
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useUserInfo from '../../../../../hooks/useUserInfo';

const SslPayment = ({ price }) => {
    const [cart, refetch] = useCart()
    const { user } = useAuth()
    const [axiosSecure] = useAxiosSecure()
    const [userInfo]=useUserInfo()
    // console.log(cart);
    // cart.map((cart) => {
    //     console.log(cart.email);  
    //     console.log(cart.image);  
    // })
    // console.log(user.email);
    // console.log(price);
    // console.log(email);


    const data = {
        email: user.email,
        price: price,
        date: new Date(),
        quantity: cart.length,
        names: cart.map(item => item.name),
        CartItems: cart.map(item => item._id),
        productItems: cart.map(item => item.itemId),
        delevaryStatus: "Delevary pending",
        billingAddress:userInfo.billingAddress
    }
    // console.log(data);
    const handleSubmit =async () => {
        console.log(data);
        // fetch("http://localhost:5000/order", {
        //     method: "POST",
        //     headers: { "content-type": "application/json" },
        //     body: JSON.stringify(data)
        // })
        //     .then(res => res.json())
        //     .then(result => {
        //         console.log(result);
        //         window.location.replace(result.url)
        //     })
        axiosSecure.post('/order', data)
        .then(res => {
            console.log(res.data);
                // display confirm 
                // refetch()
                console.log(res.data.url);
                window.location.replace(res.data.url)
        })

        //update 

        const updateSoldProduct = async (itemId, newSoldProduct) => {
            try {
                const response = await fetch(`http://localhost:5000/paymentsprductupdate/${itemId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newSoldProduct)
                });

                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error updating soldproduct on the client:', error);
                throw error;
            }
        };

        // Iterate through the cart and update each item's soldproduct
        for (const item of cart) {
            const itemId = item.itemId;
            const newSoldProduct = {
                newSoldProduct: parseInt(item.cartquantity, 10)
            };

            try {
                const result = await updateSoldProduct(itemId, newSoldProduct);
                console.log(`Soldproduct updated for item ${itemId}:`, result);
            } catch (error) {
                console.error(`Error updating soldproduct for item ${itemId}:`, error);
            }
        }
    }


    return (
        <div>
            <button className='btn btn-success' onClick={handleSubmit}>Payment</button>
        </div>
    );
};

export default SslPayment;