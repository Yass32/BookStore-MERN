/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import BookSingleCard from './BookSingleCard';

const BooksCard = ({books, userId}) => {
    return (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {books.map((book) => {
                return (
                    <BookSingleCard key={book._id} book={book} userId={userId}/>   
                )
            })}
        </div>
    )
    
}

export default BooksCard