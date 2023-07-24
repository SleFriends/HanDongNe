import React from 'react';
import '../css/mypage.css'; // 경로 변경
import bannerImage from '../image/banner.png'; // 경로 변경

const MyPage = () => {
  const handleImageClick = () => {
    // Add your desired response when the image is clicked here
    alert('광고 입니다!');
  };
  return (
    <div className="mypage-container">
      <h>마이페이지</h>
      <div className="rectangle">
        <div className="user-info">
          <h2>내정보</h2>
          <div className="account-info">
            <div>계정</div>
            <div>학교인증 ox</div>
            <div>
              <input type="text" placeholder="아이디" />
              <button>수정하기</button>
            </div>
            <div>
              <input type="password" placeholder="비밀번호" />
              <button>수정하기</button>
            </div>
          <div className="account-email">
            <div>이메일</div>
          </div>
          </div>
          <div className="matching-result">
            <h2>매칭 결과 확인</h2>
            <div>
              {/* Add code here to display matching results and URLs */}
            </div>
            <div className="urls">
              {/* Add code here to display URLs */}
            </div>
            <div className="save-button-container">
              <button className="save-button">저장</button>
            </div>            
          </div>
        </div>
        <img src={bannerImage} alt="Banner" onClick={handleImageClick} />
      </div>    
      <button className="back-button">뒤로가기</button>
    </div>
  );
};

export default MyPage;