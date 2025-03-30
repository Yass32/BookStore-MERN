/* eslint-disable no-unused-vars */
import React, { useState }  from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import axios from 'axios';

const Register = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    

    const handleRegister = () => {
        const user = {
            username,
            password
        }

        setLoading(true);
        axios
            .post(`http://localhost:5555/books/register`, user)
            .then((response) => {                
                setLoading(false);
                const userId = response.data._id;
                console.log(response.data);
                navigate(`/${userId}/home`);
            })
            .catch((error) => {
                console.log(error);
                setMessage(error.response.data);
                setLoading(false);
            })

    }


    

    return (
        <div className='p-4'> 
            <h1 className='text-3xl my-8'>Register</h1>
            {loading ? (
                <Spinner/>
            ) : (
                <div className='flex flex-col border-2 border-blue-950 rounded-xl w-[600px] p-4 mx-auto'>
                    <div className='my-3'>
                        <label className='text-xl text-gray-500'>Username:</label>
                        <input
                        type='text'
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-1 w-full'
                        />
                    </div>
                    <div className='py-3'>
                        <label className='text-xl text-gray-500'>Password:</label>
                        <input
                        type='text'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-1 w-full'
                        />
                    </div>
                    <div className='py-6'>
                    <p className='mb-3 text-red-600'>{message}</p>
                        <button className='mx-28 text-xl text-gray-300 bg-blue-950 rounded-md w-[60%] p-2' onClick={handleRegister}>
                            Sign up
                        </button>
                        <Link to='/' >
                        <p className='flex justify-end text-gray-500 text-xs mt-5 hover:text-sky-600'> Already a bookstore member? Login Here</p>
                        </Link>
                        
                    </div>

                </div>
            )}
        </div>     
    )
}

export default Register