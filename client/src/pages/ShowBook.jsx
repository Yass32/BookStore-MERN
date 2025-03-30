/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { Spinner } from '../components/Spinner';
import { useSnackbar } from 'notistack';
import backgroundImage from '../assets/background3.webp';
import { API_URL } from "../config";

const ShowBook = () => {
    const [books, setBooks] = useState({});
    const [loading, setLoading] = useState(false);
    const { userId, id } = useParams();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`${API_URL}/books/${userId}/${id}`)
            .then((response) => {
                setBooks(response.data);
                setLoading(false);
                console.log(books);
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar("Error", { variant: "error"});
                setLoading(false);
            })
    }, []);

    return (
        <div className='p-4 bg-cover bg-center h-screen' style={{ backgroundImage: `url(${backgroundImage})` }}>  
            <BackButton userId={userId}/>    
            <h1 className='text-3xl my-8 text-white'>Book Details</h1>
            {loading ? (
                <Spinner/>
            ) : (
                <div className='flex flex-col mx-auto bg-blue-950 w-fit p-4 text-white rounded-md'>
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