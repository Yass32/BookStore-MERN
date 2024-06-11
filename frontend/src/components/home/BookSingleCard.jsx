/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BookSingleCard = ({book, userId}) => {
    return (
        <div className='border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl'
        key={book._id}
        >
            <h2 className='absolute top-1 right-2 px-4 py-1 bg-sky-500 rounded-lg'>
            {book.publishedYear}
            </h2>
            <h4 className='my-2 text-gray-500'>{book._id}</h4>
            <div className='flex justify-start items-center gap-x-2'>
                <PiBookOpenTextLight className='text-sky-400 text-2xl'/>
                <h2 className='my-1'>{book.title}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2'>
                <BiUserCircle className='text-sky-400 text-2xl'/>
                <h2 className='my-1'>{book.author}</h2>
            </div>
            <div className='flex justify-between items-center gap-x-2 mt-4 p-4'>
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
        </div>
    )
}

export default BookSingleCard