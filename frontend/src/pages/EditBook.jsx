/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { Spinner } from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const EditBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishedYear, setPublishedYear] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublishedYear(response.data.publishedYear);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);

    

    const handleEditBook = () => {
        const book = {
            title,
            author,
            publishedYear
        }

        setLoading(true);
        axios
            .put(`http://localhost:5555/books/${id}`, book)
            .then((response) => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setPublishedYear(response.data.publishedYear);
                setLoading(false);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })

    }


    

    return (
        <div className='p-4'>
            <BackButton/>    
            <h1 className='text-3xl my-8'>Edit Book</h1>
            {loading ? (
                <Spinner/>
            ) : (
                <div className='flex flex-col border-2 border-blue-950 rounded-xl w-[600px] p-4 mx-auto'>
                    <div className='my-3'>
                        <label className='text-xl text-gray-500'>Title:</label>
                        <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-1 w-full'
                        />
                    </div>
                    <div className='py-3'>
                        <label className='text-xl text-gray-500'>Author:</label>
                        <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-1 w-full'
                        />
                    </div>
                    <div className='py-3'>
                        <label className='text-xl text-gray-500'>Published Year:</label>
                        <input
                        type='number'
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-1 w-full'
                        />
                    </div>
                    <div className='py-6'>
                        <button className='mx-28 text-xl text-gray-300 bg-blue-950 rounded-md w-[60%] p-2' onClick={handleEditBook}>
                            Update
                        </button>
                    </div>

                </div>
            )}
        </div>     
    )
}

export default EditBook