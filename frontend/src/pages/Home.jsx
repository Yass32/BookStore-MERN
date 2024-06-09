/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from '../components/Spinner';
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineAddBox, MdOutlineDelete} from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState("table");

    useEffect(() => {
        setLoading(true);
        axios
            .get( "http://localhost:5555/books")
            .then((response) => {
                setBooks(response.data.data);
                setLoading(false);
                console.log(response.data.data);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);



    return (
    <div className='p-4'>
        <div className='flex justify-center items-center gap-x-4 mr-5'>
            <button 
                className='bg-blue-950 hover:scale-110 px-4 py-1 rounded-lg text-gray-200'
                onClick={() => setShowType("table")}
            >
                Table
            </button>
            <button 
                className='bg-blue-950 hover:scale-110 px-4 py-1 rounded-lg  text-gray-200'
                onClick={() => setShowType("card")}
            >
                Card
            </button>
        </div>
        <div className='flex items-center'>
            <h1 className='text-3xl my-8 mx-auto'>Books Store</h1>
            <Link to='/books/create' className='text-sky-800 text-4xl hover:scale-110'>
                <MdOutlineAddBox className='text-3xl' />
            </Link>
        </div>
        {loading? (<Spinner/>) : (
            showType === "table" ? (
                <BooksTable books={books}/>
            ) : (
                <BooksCard books={books}/>
            )            
        )}
    </div>
    )
}

export default Home;