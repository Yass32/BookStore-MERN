/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Spinner } from '../components/Spinner';
import { Link, useParams } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import {MdOutlineAddBox} from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';
import backgroundImage from '../assets/background3.webp';
import { VITE_API_URL } from "../config";

const Home = () => {
    const [count, setCount] = useState("0");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState("table");

    const { userId } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get( `${VITE_API_URL}/books/${userId}`)
            .then((response) => {
                setBooks(response.data.data);
                setCount(response.data.count);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);



    return (
    <div className='p-4 bg-cover bg-center h-screen' style={{ backgroundImage: `url(${backgroundImage})` }}> 
        <div>
            <Link to={`/`}>
                <CiLogout className='text-3xl mt-3 ml-3 text-blue-950 w-[6%] rounded-md'/> 
            </Link>
        </div>
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
            <h1 className='text-3xl my-8 mx-auto text-white'>Books Store</h1>
            <Link to={`/${userId}/add `}  className='text-white bg-blue-950 rounded-md text-4xl hover:scale-110'>
                <MdOutlineAddBox className='text-3xl' />
            </Link>
        </div>
        {loading? (<Spinner/>) : (
            showType === "table" ? (
                <div>
                    <p className='text-white'>Books rented: {count}</p>
                    <BooksTable books={books} userId={userId}/>

                </div>
                
            ) : (
                <div>
                    <p className='text-white'>Books rented: {count}</p>
                    <BooksCard books={books} userId={userId}/>
                </div>
                
            )            
        )}
    </div>
    )
}

export default Home;