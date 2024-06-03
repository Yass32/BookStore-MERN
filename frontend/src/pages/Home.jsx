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
        </div>
        {loading? (<Spinner/>) : (
            <table className='w-full text-left text-gray-500 dark:text-gray-400'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publish Year</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => {
                        return (
                            <tr key={book.id}>
                                <td>{index + 1}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publishedYear}</td>
                                <td className='flex justify-around items-center'>
                                    <Link to={`/books/details/${book.id}`} className='text-green-800 text-4xl hover:scale-110'>
                                        <BsInfoCircle className='text-2xl' />
                                    </Link>
                                    <Link to={`/books/edit/${book.id}`} className='text-yellow-500 text-4xl hover:scale-110'>
                                        <AiOutlineEdit className='text-2xl ' />
                                    </Link>
                                    <Link to={`/books/delete/${book.id}`} className='text-red-700 text-4xl hover:scale-110'>
                                        <MdOutlineDelete className='text-2xl' />
                                    </Link>
                                </td>
                            </tr>
                        )  
                    })}
                </tbody>
            </table>
        )}
    </div>
    )
}

export default Home;