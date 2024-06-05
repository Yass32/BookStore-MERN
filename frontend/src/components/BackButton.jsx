/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = () => {
  return (
    <div>
        <Link to={"/"}>
            <BsArrowLeft className='text-3xl mt-3 ml-3 text-black'/>
        </Link>
    </div>
  )
}

export default BackButton