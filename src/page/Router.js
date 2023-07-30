import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Home from './page/Home';
import Survey from './page/survey';
import Review from './page/Review';
import Register from './page/register';
import Myposts from './page/myposts'

const Router = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/Myposts" element={<Myposts />} />
        <Route path="/Survey" element={<Survey />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default Router;