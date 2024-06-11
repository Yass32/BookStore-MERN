/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { Spinner } from '../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { userId, id } = useParams();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/books/${userId}/${id}`)
            .then((response) => {
                setTitle(response.data.title);
                setAuthor(response.data.author);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/books/${userId}/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar("Book deleted successfully", { variant: "success"});
                navigate(`/${userId}/home`);
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar("Error", { variant: "error"});
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
                        <p className='text-xl text-gray-500 text-center'>Are you sure you want to delete <i>{title}</i> by <i>{author}</i>?</p>
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