// mypage.js
import React, { useState, useEffect } from 'react';
import { auth, dbService, collection, addDoc, doc, updateDoc, getDoc, setDoc, getDocs } from '../fbase';
import '../css/mypage.css'; // 경로 변경
import bannerImage from '../image/banner.png'; // 경로 변경

const MyPage = () => {
  
  const [id, reviseId] = useState('');
  const [pw, revisePassword] = useState('');  
  const [email, setEmail] = useState('');
  const [question1, setQuestion1] = useState(''); // 사용자의 답변을 저장할 상태 변수
  const [question2, setQuestion2] = useState(''); // 사용자의 답변을 저장할 상태 변수
  const [question3, setQuestion3] = useState(''); // 사용자의 답변을 저장할 상태 변수
  const [question4, setQuestion4] = useState(''); // 사용자의 답변을 저장할 상태 변수
  const [question5, setQuestion5] = useState(''); // 사용자의 답변을 저장할 상태 변수
  const [Animal, setRoom3] = useState('');
  const [E, setRoom2_1] = useState('');
  const [I, setRoom2_2] = useState('');
  const [RealName, setRoom5] = useState('');
  const [Chungcheong, setRoom1_1] = useState('');
  const [Gangwon, setRoom1_2] = useState('');
  const [Gyeongsang, setRoom1_3] = useState('');
  const [Jeolla, setRoom1_4] = useState('');
  const [SoeulGyeonggi, setRoom1_5] = useState('');
  const [WorkOut, setRoom4] = useState('');
  const [school_prove, prove] = useState('');
  const [isPwEditable, setIsPwEditable] = useState(false);

  useEffect(() => {
    // Fetch user data and matching results from Firebase Firestore
    const fetchUserData = async () => {
      try {
        // const uid = auth.currentUser.email;
        const userDocRef = doc(dbService, 'user', auth.currentUser.email);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          reviseId(userData.id);
          revisePassword(userData.pw);
          setEmail(userData.email);
          prove(userData.school_prove);
          setQuestion1(userData.question1); // 사용자의 답변을 설정
          setQuestion2(userData.question2); // 사용자의 답변을 설정
          setQuestion3(userData.question3); // 사용자의 답변을 설정          
          setQuestion4(userData.question4); // 사용자의 답변을 설정
          setQuestion5(userData.question5); // 사용자의 답변을 설정
        }
        const AnimalDocRef = doc(dbService, 'KakaoTalkLink', 'AnimalTalkRoom');
        const AnimalDocSnapshot = await getDoc(AnimalDocRef);
        if(AnimalDocSnapshot.exists()){
          setRoom3(AnimalDocSnapshot.data().Animal);
        }
        const mbtiDocRef = doc(dbService, 'KakaoTalkLink', 'MBTITalkRoom');
        const mbtiDocSnapshot = await getDoc(mbtiDocRef);
        if(mbtiDocSnapshot.exists()){
          setRoom2_1(mbtiDocSnapshot.data().E);
          setRoom2_2(mbtiDocSnapshot.data().I);
        }
        const stateDocRef = doc(dbService, 'KakaoTalkLink', 'StateTalkRoom');
        const stateDocSnapshot = await getDoc(stateDocRef);
        if(stateDocSnapshot.exists()){
          setRoom1_1(stateDocSnapshot.data().Chungcheong);
          setRoom1_2(stateDocSnapshot.data().Gangwon);
          setRoom1_3(stateDocSnapshot.data().Gyeongsang);
          setRoom1_4(stateDocSnapshot.data().Jeolla);
          setRoom1_5(stateDocSnapshot.data().SoeulGyeonggi);
        }
        const realDocRef = doc(dbService, 'KakaoTalkLink', 'RealNameTalkRoom');
        const realDocSnapshot = await getDoc(realDocRef);
        if(realDocSnapshot.exists()){
          setRoom5(realDocSnapshot.data().RealName);
        }
        const workDocRef = doc(dbService, 'KakaoTalkLink', 'WorkOutTalkRoom');
        const workDocSnapshot = await getDoc(workDocRef);
        if(workDocSnapshot.exists()){
          setRoom4(workDocSnapshot.data().WorkOut);
        }
        // const matchingResultsSnapshot = await dbService.collection('KakaoTalkLink').get();
        // const matchingResultsData = matchingResultsSnapshot.docs.map((doc) => doc.data());
        // setMatchingResults(matchingResultsData);
      } catch (error) {
        console.error('데이터 가져오기 오류:', error);
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordUpdate = async () => {
    try {
      if (pw.length < 4) {
        window.alert('비밀번호는 최소 4자리 이상이어야 합니다.');
        return;
      }
      // const uid = auth.currentUser.email;
      const userDocRef = doc(dbService, 'user', auth.currentUser.email); // dbService의 doc 메서드 사용

      // 사용자 비밀번호 업데이트
      await updateDoc(userDocRef, { pw }); // dbService의 updateDoc 메서드 사용

      console.log('비밀번호가 업데이트되었습니다:', pw);
      window.alert('마이페이지가 저장되었습니다.');
    } catch (error) {
      console.error('비밀번호 업데이트 오류:', error);
      window.alert('비밀번호가 수정되지 않았습니다.');
    }
  };
  const newId = (event) => {
    console.log(event.target.value);
    reviseId(event.target.value);
  };

  const newPassword = (event) => {
    console.log(event.target.value);
    revisePassword(event.target.value);
  };
  const handleImageBanner = () => {
    // Add your desired response when the image is clicked here
    alert('광고 입니다!');
  };

  return (
    <div className="mypage-container">
      <div>마이페이지</div>
      <div className="rectangle">
        <div className="user-info">
          <h2>내정보</h2>
          <div className="account-info"><div>아이디</div>
          <div className = "info-border">{id}</div>
          <div>
            <div>비밀번호</div>
            <textarea
              className="account-info-input"
              type="password"
              value={pw}
              disabled={!isPwEditable} // Disable the textarea if isPwEditable is false
              placeholder="비밀번호"
              onChange={(e) => revisePassword(e.target.value)}
            />
            <button className="edit-button" onClick={() => setIsPwEditable((prev) => !prev)}>
              {isPwEditable ? '수정하기' : '수정하기'}
            </button>
            </div>
          <div className="account-email">
            <div>이메일</div>
            <div className="info-border">{email}</div>
          </div>
          </div>
          <div className="matching-result">
          <div>
          <div>                    
            <h2>매칭 결과 확인</h2>
            {question1 && (
              <div>
                {question1 === 'JL' ? (
                  <p>
                    전라도 <a href={Jeolla} target="_blank" rel="noreferrer">
                      {Jeolla}
                    </a>
                  </p>
                ) : question1 === 'GW' ? (
                  <p>
                    경기도 <a href={SoeulGyeonggi} target="_blank" rel="noreferrer">
                      {SoeulGyeonggi}
                    </a>
                  </p>
                ) : question1 === 'GW' ? (
                  <p>
                    강원도 <a href={Gangwon} target="_blank" rel="noreferrer">
                      {Gangwon}
                    </a>
                  </p>
                ) : question1 === 'CC' ? (
                  <p>
                    충청도 <a href={Chungcheong} target="_blank" rel="noreferrer">
                      {Chungcheong}
                    </a>
                  </p>
                ) : question1 === 'GS' ? (
                  <p>
                    경상도 <a href={Gyeongsang} target="_blank" rel="noreferrer">
                      {Gyeongsang}
                    </a>
                  </p>
                ) : (
                  ""
                )}
              </div>
            )}
        {question2 && (
          <div>
            {question2 === 'extro' ? (
              <p>
                MBTI E <a href={E} target="_blank" rel="noreferrer">
                  {E}
                </a>
              </p>
            ) : question2 === 'intro' ? (
              <p>
                MBTI I <a href={I} target="_blank" rel="noreferrer">
                  {I}
                </a>
              </p>
            ) : (
              ""
            )}
          </div>
        )}
        {question3 && (
          <div>
          {question3 === 'workOut' ? (
            <p>
          운동 <a href={WorkOut} target="Animal" rel="noreferrer">
               {WorkOut}
            </a>
            </p>            
          ) : (
            ""
          )}
          </div>
          )}
        {question4 && (
           <div>
           {question4 === 'animal' ? (
             <p>
           동물 <a href={Animal} target="_blank" rel="noreferrer">
                {Animal}
             </a>
             </p>            
           ) : (
             ""
           )}
           </div>
           )}
        {question5 && (
            <div>
            {question5 === 'meet' ? (
              <p>
            실명방 <a href={RealName} target="_blank" rel="noreferrer">
                  {RealName}
              </a>
              </p>            
            ) : (
              ""
            )}
            </div>
            )}
          <div className="save-button-container">
            <button className="save-button" onClick={handlePasswordUpdate}>저장</button>
          </div>
        </div>
          </div>       
          </div>
        </div>
        <img src={bannerImage} alt="Banner" onClick={handleImageBanner} />
      </div>
      <button className="back-button">뒤로가기</button>
    </div>
  );
};

export default MyPage;
