import '../css/Review.css'; // Make sure the CSS file path is correct
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import logo2 from '../image/logo2.png';

function Review() {

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim() !== '') {
      setReviews([...reviews, reviewText]);
      setReviewText('');
    }
  };

  return (
    <div class="reviews-background">
      <div class="heads">
        <div class="reviews-back">
          <button type="button" onClick="history.back();"class="backbutton">Back</button>
        </div>
        <img class='headslogo' height={80} src={logo2} ></img>
        <h1 class="firsth1">
          후기 게시판
        </h1>
        <button type="button" onClick="window.open('src/component/myposts.html')"class="myposts">나의 게시물</button>
      </div>

      <div class='reviews-bigbox'>
        <div class='middlebox'>
          <img class='pic' height={80} src={logo2} style={{marginRight:"px"}}></img>
          <div class='smallbox'>
            <form onSubmit={handleSubmit}> 
              <textarea
                className='review-textarea'
                value={reviewText}
                onChange={handleReviewChange}
                placeholder="게시물을 작성해주세요."
              ></textarea>
              <button type="submit" class='registerown'>
                등록하기
              </button>
            </form>
          </div>
        </div>

        <div class='middlebox'>
          <img class='pic' height={80} src={logo2} style={{marginRight:"px"}}></img>
          <div class='smallbox'>
            후기
          </div>
        </div>
      </div>
    </div>
  );
};



export default Review;