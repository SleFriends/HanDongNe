import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, dbService } from '../fbase';
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, arrayRemove } from 'firebase/firestore';
import '../css/Review.css';
import { Link } from 'react-router-dom';

const Myposts = () => {
  const history = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [reviews, setReviews] = useState([]);
  const [editableReviewId, setEditableReviewId] = useState(null);
  const [isEditing, setIsEditing] = useState(null);
  useEffect(() => {
    fetchUserDataAndReviews();
  }, []);

  const fetchUserDataAndReviews = async () => {
    try {
      const authUser = auth.currentUser;
      if (authUser) {
        setUserEmail(authUser.email);
        const userReviews = await fetchReviews(authUser.email);
        setReviews(userReviews);
      } else {
        history('/login');
      }
    } catch (error) {
      console.error('사용자 정보 및 리뷰를 불러오는데 오류 발생: ', error);
    }
  };

  const fetchReviews = async (userEmail) => {
    const reviewsCollection = collection(dbService, 'reviews');
    const q = query(reviewsCollection, where('email', '==', userEmail));
    const querySnapshot = await getDocs(q);

    const userReviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      text: doc.data().text,
      // You can add other review properties if needed
    }));

    return userReviews;
  };

  // 수정 가능한 상태를 관리하는 state 변수 추가

  const updateReviewText = async (reviewId, newText) => {
    try {
      const reviewRef = doc(dbService, 'reviews', reviewId);
      await updateDoc(reviewRef, {
        text: newText,
      });
      console.log('리뷰 업데이트 성공!');
      setEditableReviewId(null); // 입력창을 닫습니다.
    } catch (error) {
      console.error('리뷰를 업데이트하는데 오류 발생: ', error);
    }
  };

  const handleEditClick = (reviewId) => {
    if (isEditing) {
      alert('수정을 완료해주세요.'); // 수정 중인 리뷰가 있을 때 경고 문구를 표시합니다.
      return;
    }

    setEditableReviewId(reviewId);
    setIsEditing(true); // 수정 중인 상태로 설정합니다.
  };
  const handleSaveClick = (reviewId) => {
    const reviewToUpdate = reviews.find((review) => review.id === reviewId);
    if (reviewToUpdate) {
      updateReviewText(reviewId, reviewToUpdate.text);
    }
    setIsEditing(false); // 수정 완료되었으므로 수정 중인 상태를 해제합니다.
  };
  const handleDeleteClick = async (reviewId) => {
    try {
      // 리뷰를 삭제하는 함수
      const reviewRef = doc(dbService, 'reviews', reviewId);
      await deleteDoc(reviewRef);
      // Remove the reviewId from the user's "reviews" field in the "user" collection
      const userDocRef = doc(dbService, 'user', userEmail);
      await updateDoc(userDocRef, {
        reviews: arrayRemove(reviewId),
      });
      // 삭제 후 리뷰 목록을 갱신합니다.
      setReviews((prevReviews) => prevReviews.filter((review) => review.id !== reviewId));
      console.log('리뷰 삭제 성공!');
    } catch (error) {
      console.error('리뷰를 삭제하는데 오류 발생: ', error);
    }
  };
  return (
    <div className="backgroundmyposts">
      <div className="heads">
        <div className="back">
          <button type="button" className="mypostsbackbutton">
            <Link to="/Home" style={{ textDecoration: "none", color: "black" }}>
              Back
            </Link>
          </button>
        </div>
        <h1 className="secondh1">나의 게시물</h1>
      </div>

      <div className="bigboxmyposts">
        {reviews.map((review) => (
          <div className="middleboxmyposts" key={review.id}>
            <div className="smallbox">
              <div className="dividetext">
                {editableReviewId === review.id ? (
                  <textarea
                    className="review-text-editable"
                    value={review.text}
                    onChange={(e) =>
                      setReviews((prevReviews) =>
                        prevReviews.map((prevReview) => {
                          if (prevReview.id === review.id) {
                            return { ...prevReview, text: e.target.value };
                          }
                          return prevReview;
                        })
                      )
                    }
                  />
                ) : (
                  <div className="register-text">{review.text}</div>
                )}
                <div className="buttonflex">
                  {editableReviewId === review.id ? (
                    <button type="submit" className="save" onClick={() => handleSaveClick(review.id)}>
                      저장하기
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="edit"
                      onClick={() => handleEditClick(review.id)}                     
                    >
                      수정하기
                    </button>
                  )}
                  <button
                    type="submit"
                    className="remove"
                    onClick={() => handleDeleteClick(review.id)}
                    disabled={isEditing} // 수정 중인 경우 비활성화
                  > 삭제하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Myposts;
