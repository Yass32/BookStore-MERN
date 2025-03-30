/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsInfoCircle} from 'react-icons/bs';
import {MdOutlineDelete} from 'react-icons/md';


const BooksTable = ({ books, userId }) => {
    return (
        <table className='w-full text-gray-500 border-separate border-spacing-2'>
            <thead>
                <tr>
                    <th className='bg-blue-950 text-white rounded-md'>No</th>
                    <th className='bg-blue-950 text-white rounded-md'>Title</th>
                    <th className='bg-blue-950 text-white rounded-md max-md:hidden'>Author</th>
                    <th className='bg-blue-950 text-white rounded-md max-md:hidden'>Publish Year</th>
                    <th className='bg-blue-950 text-white rounded-md'>Operations</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index) => {
                    return (
                        <tr key={book._id} className='h-8 text-center'>
                            <td className='bg-blue-950 text-white rounded-md '>
                                {index + 1}
                            </td>
                            <td className='bg-blue-950 text-white rounded-md'>
                                {book.title}
                            </td>
                            <td className='bg-blue-950 text-white rounded-md max-md:hidden'>
                                {book.author}
                            </td>
                            <td className='bg-blue-950 text-white rounded-md max-md:hidden'>
                                {book.publishedYear}
                            </td>
                            <td className='bg-blue-950 text-white rounded-md'>
                                <div className='flex justify-evenly'>
                                    <Link to={`/${userId}/read/${book._id}`}>
                                        <BsInfoCircle className='text-2xl text-green-800 hover:scale-110' />
                                    </Link>
                                    <Link to={`/${userId}/update/${book._id}`}>
                                        <AiOutlineEdit className='text-2xl text-yellow-500 hover:scale-110 ' />
                                    </Link>
                                    <Link to={`/${userId}/delete/${book._id}`}>
                                        <MdOutlineDelete className='text-2xl text-red-700 hover:scale-110' />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    )  
                })}
            </tbody>
        </table>
    )
}

export default BooksTable