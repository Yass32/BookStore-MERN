/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { Spinner } from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import backgroundImage from '../assets/background3.webp';

const CreateBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishedYear, setPublishedYear] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { userId } = useParams();

    const { enqueueSnackbar } = useSnackbar();

    

    const handleSaveBook = () => {
        const book = {
            title,
            author,
            publishedYear
        }

        setLoading(true);
        axios
            .post( `http://localhost:5555/books/${userId}`, book)
            .then(() => {                
                setLoading(false);
                enqueueSnackbar("Book added successfully", { variant: "success"});
                navigate(`/${userId}/home`);
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar("Error", { variant: "error"});
                setLoading(false);
            })

    }


    

    return (
        <div className='p-4 bg-cover bg-center h-screen' style={{ backgroundImage: `url(${backgroundImage})` }}> 
            <BackButton userId={userId}/>    
            <h1 className='text-3xl my-8 text-white'>Add Book</h1>
            {loading ? (
                <Spinner/>
            ) : (
                <div className='flex flex-col rounded-xl w-[600px] p-4 mx-auto'>
                    <div>
                        <label className='text-xl text-white'>Title:</label>
                        <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-1 w-full'
                        />
                    </div>
                    <div className='py-3'>
                        <label className='text-xl text-white'>Author:</label>
                        <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-1 w-full'
                        />
                    </div>
                    <div className='py-3'>
                        <label className='text-xl text-white'>Published Year:</label>
                        <input
                        type='number'
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-1 w-full'
                        />
                    </div>
                    <div className='py-6'>
                        <button className='mx-28 text-xl text-white bg-blue-950 rounded-md w-[60%] p-2' onClick={handleSaveBook}>
                            Add
                        </button>
                    </div>

                </div>
            )}
        </div>     
    )
}

export default CreateBook