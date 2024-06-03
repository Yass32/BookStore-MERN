/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from '../components/Spinner';
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get( "http://localhost:5555/books")
            .then((response) => {
                setBooks(response.data.data);
                console.log(books);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);



    return (
    <div className='p-4'>
        <div className='flex items-center'>
            <h1 className='text-3xl my-8 mx-auto'>Books List</h1>
            <Link to='/books/create' className='text-sky-800 text-4xl hover:scale-110'>
                <MdOutlineAddBox className='text-3xl' />
            </Link>
            {loading? <Spinner/> : 
            <table className='w-full text-left text-gray-500 dark:text-gray-400'>
                <thead>
                    <th></th>
                </thead>
                <tbody>
                    <tr>
                        <tr></tr>
                    </tr>
                </tbody>
            </table>
            }
        </div>
    </div>
    )
}

export default Home;