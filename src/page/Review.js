import '../css/Review.css';
import { Link } from 'react-router-dom';
import { serverTimestamp, updateDoc , doc, getDoc, setDoc, query, orderBy, onSnapshot} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { auth,dbService, collection, addDoc} from '../fbase';
import { firebase}  from 'firebase/compat/app';
//import { firebase } from 'firebase/app'; // 이 줄을 추가하여 firebase를 'firebase/app'에서 import합니다.
import 'firebase/auth';
import 'firebase/firestore';
import logo2 from '../image/logo2.png';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Review() {
  const [userEmail, setUserEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  // 리뷰를 저장할 Firestore 컬렉션에 대한 참조
  const reviewsCollection = collection(dbService, 'reviews');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
    });

    // Clean up
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      // Firestore에서 리뷰 데이터를 실시간으로 감지합니다.
      const q = query(reviewsCollection, orderBy('timestamp', 'desc'));
      onSnapshot(q, (querySnapshot) => {
        const fetchedReviews = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
        }));
        setReviews(fetchedReviews);
      });
    } catch (error) {
      console.error('리뷰를 불러오는데 오류 발생: ', error);
    }
  };

  const handleReviewChange = (e) => {
    setReviewText(e.target.value);

    // Display the content in the browser's console
    console.log(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (reviewText.trim() !== '') {
      try {
        setUserEmail(auth.currentUser.email);
        // 새로운 리뷰를 Firebase Firestore에 저장합니다.
        const docRef = await addDoc(reviewsCollection, {
          text: reviewText,
          timestamp: serverTimestamp(),
          email: userEmail,
        });

        // 추가된 문서의 ID를 확인합니다
        addReviewToUser(docRef.id);
        console.log("추가된 문서의 ID:", docRef.id);

        // Firebase Firestore에서 업데이트된 리뷰를 다시 불러옵니다.
        fetchReviews();
        setReviewText('');
      } catch (error) {
        console.error('리뷰를 추가하는데 오류 발생: ', error);
      }
    }
  };

  const addReviewToUser = async (review) => {
    try {
      // 해당 사용자의 문서(Document)를 가져옵니다.
      const userDocRef = doc(dbService, 'user', auth.currentUser.email);
      const userDocSnapshot = await getDoc(userDocRef);
  
      // 기존의 reviews 배열과 새로운 리뷰(review)를 합칩니다.
      const existingReviews = userDocSnapshot.data()?.reviews || [];
      const updatedReviews = [...existingReviews, review];
  
      // reviews 필드를 업데이트합니다.
      await setDoc(
        userDocRef,
        {
          reviews: updatedReviews,
        },
        { merge: true } // 기존의 데이터를 덮어쓰지 않고, 새로운 데이터만 업데이트합니다.
      );
      
      console.log('리뷰코드가 유저정보에 성공적으로 추가되었습니다.');
    } catch (error) {
      console.error('리뷰코드를 유저정보에 추가하는데 오류 발생:', error);
    }
  };

  return (
    <div class="reviews-background">
      <div class="heads">
        <div class="reviews-back">
          <button type="button" class="backbutton">
            <Link to="/Home" style={{ textDecoration: "none", color: "black" }}>Back</Link>
          </button>
        </div>
        <img class='headslogo' height={80} src={logo2} ></img>
        <h1 class="firsth1">
          후기 게시판
        </h1>
        <button type="button" class="myposts">
        <Link to="/Myposts" style={{ textDecoration: "none", color: "black" }}>나의 게시물</Link>
        </button>
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
                등록
              </button>
            </form>
          </div>
        </div>

        {reviews.map((review) => (
          <div className="middlebox" key={review.id}>
            <img className="pic" height={80} src={logo2} style={{ marginRight: "px" }}></img>
            <div className="smallbox">
              {review.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;