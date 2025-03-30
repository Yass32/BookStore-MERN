/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ userId }) => {
  return (
    <div>
        <Link to={`/${userId}/home`}>
            <BsArrowLeft className='text-3xl mt-3 ml-3 text-white bg-blue-950 w-[6%] rounded-md'/>
        </Link>
    </div>
  )
}

export default BackButton