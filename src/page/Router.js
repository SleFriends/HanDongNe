import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Survey from './survey';
import Review from './Review';
import Register from './register';
import Myposts from './myposts'
import MyPage from './mypage';

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
        <Route path="/MyPage" element={<MyPage />} />
      </Routes>
    </Router>
  );
};

export default Router;