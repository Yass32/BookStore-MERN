/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { Spinner } from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteBook = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { userId, id } = useParams();

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/books/${userId}/${id}`)
            .then(() => {
                setLoading(false);
                navigate(`/${userId}/home`);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }
    

    return (
        <div className='p-4'>
            <BackButton/>    
            <h1 className='text-3xl my-8'>Delete Book</h1>
            {loading ? (
                <Spinner/>
            ) : (
                <div className='flex flex-col border-2 border-blue-950 rounded-xl w-[600px] p-4 mx-auto'>
                    <div className='my-3'>
                        <p className='text-xl text-gray-500 text-center'>Are you sure you want to delete this book?</p>
                    </div>
                    <div className='py-6'>
                        <button className='mx-28 text-xl text-gray-300 bg-red-700 rounded-md w-[60%] p-2' onClick={handleDeleteBook}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>     
    )
}

export default DeleteBook