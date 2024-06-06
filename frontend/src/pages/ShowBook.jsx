/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { Spinner } from '../components/Spinner';

const ShowBook = () => {
    const [books, setBooks] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    console.log(id);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setBooks(response.data);
                
                setLoading(false);
                console.log(books);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);

    return (
        <div className='p-4'>
            <BackButton/>    
            <h1 className='text-3xl my-8'>Book Details</h1>
            {loading ? (
                <Spinner/>
            ) : (
                <div className='flex flex-col border-2 border-blue-950 w-fit p-4'>
                    <div className='py-3'>
                        <span className='font-semibold mr-28'>ID</span>
                        <span>{books._id}</span>
                    </div>
                    <div className='py-3'>
                        <span className='font-semibold mr-24'>Title</span>
                        <span>{books.title}</span>
                    </div>
                    <div className='py-3'>
                        <span className='font-semibold mr-16'>Author</span>
                        <span className='ml-3'>{books.author}</span>
                    </div>
                    <div className='py-3'>
                        <span className='font-semibold mr-10'>Publish Year</span>
                        <span>{books.publishedYear}</span>
                    </div>
                    <div className='py-3'>
                        <span className='font-semibold mr-10'>Create Time</span>
                        <span>{new Date(books.createdAt).toLocaleString()}</span>
                    </div>
                    <div className='py-3'>
                        <span className='font-semibold mr-6'>Updated Time</span>
                        <span>{new Date(books.updatedAt).toLocaleString()}</span>
                    </div>
                </div>
            )}
        </div>     
    )
}

export default ShowBook