import React, { useContext } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';
import { AuthContext } from '../../../providers/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser);
                const saveUser = { name: loggedUser.displayName, email: loggedUser.email, photoUrl: loggedUser.photoURL, role: 'customer' }

                fetch(`https://style-haven-server.vercel.app/users`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true })

                    })
            })
    }
    return (
        <>
            <div className='divider'></div>
            <div className='w-full text-center border-4 p-3'>
                <button className="btn btn-circle btn-outline me-2">
                    <FaGoogle onClick={handleGoogleSignIn} className='text-3xl text-red-600'></FaGoogle>
                </button>
                <button className="btn btn-circle btn-outline ">
                    <FaFacebook className='text-3xl text-blue-600'></FaFacebook>
                </button>
            </div>
        </>
    );
};

export default SocialLogin;