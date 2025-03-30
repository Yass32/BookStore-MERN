/* eslint-disable no-unused-vars */
import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AddBook from './pages/AddBook.jsx'
import DeleteBook from './pages/DeleteBook.jsx';
import EditBook from './pages/EditBook.jsx';
import ShowBook from './pages/ShowBook.jsx';

const App = () => {
  return (
    //Single Page Application Route
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:userId/home" element={<Home />} />
        <Route path="/:userId/add" element={<AddBook />} />
        <Route path="/:userId/read/:id" element={<ShowBook />} />
        <Route path="/:userId/update/:id" element={<EditBook />} />
        <Route path="/:userId/delete/:id" element={<DeleteBook />} />
      </Routes>
    </div>
    
  )
}

export default App