import '../css/Review.css'; // Make sure the CSS file path is correct
import React from 'react';
import { Link } from 'react-router-dom';


const review = () => {
  return (
    <div>
      <h1>review</h1>
      <p>review page</p>
      <Link to="/"><li>homepage로 이동</li></Link> //ȭ�� �̵� �±�
    </div>
  );
};



export default review;