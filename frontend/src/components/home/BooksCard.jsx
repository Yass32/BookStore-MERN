/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksCard = ({books}) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {books.map((book) => {
                return (
                    <div 
                    className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'
                    key={book._id}
                    >
                        <h2 className='absolute top-1 right-2 px-4 py-1 bg-sky-500 rounded-lg'>
                        {book.publishYear}
                        </h2>
                        <h4 className='my-2 text-gray-500'>{book._id}</h4>
                        <div className='flex justify-start items-center gap-x-2'>
                            <PiBookOpenTextLight/>
                            <h2>{book.title}</h2>
                        </div>
                        <div className='flex justify-start items-center gap-x-2'>
                            <BiUserCircle/>
                            <h2>{book.author}</h2>
                        </div>
                    </div>
                )
                
            })}
        </div>
    )
    
}

export default BooksCard