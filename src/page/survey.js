// survey.js
import React, { useState } from "react";
import '../css/survey.css'; // Make sure the CSS file path is correct
import logo from '../image/logo.png';
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, dbService } from "../fbase"; // 파이어베이스 앱 초기화 및 데이터베이스 연결 설정을 한 파일

function Survey() {

  // 옵션들을 저장하는 상태(State) 선언
  const [selectedOptions, setSelectedOptions] = useState({
    question1: "select",
    question2: "select",
    question3: "select",
    question4: "select",
    question5: "select",
  });

  // 옵션 선택시 호출되는 함수
  const handleOptionChange = (question, value) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [question]: value,
    }));
  };

  const checkFieldExistence = async (fieldName) => {
    try {
      const docRef = doc(dbService, "user", /*auth.currentUser.uid*/'w2bvjO5Eq5vDomiDFx37'); // 문서의 참조를 가져옵니다.
      const docSnap = await getDoc(docRef); // 문서의 스냅샷을 가져옵니다.
      const docData = docSnap.data(); // 문서의 데이터를 가져옵니다.
  
      if (docData && docData[fieldName] !== undefined) {
        // 해당 필드가 존재하는 경우
        console.log(`문서에 ${fieldName} 필드가 존재합니다.`);
        console.log(`필드 값: ${docData[fieldName]}`);
        return(true);
      } else {
        // 해당 필드가 존재하지 않는 경우
        console.log(`문서에 ${fieldName} 필드가 존재하지 않습니다.`);
        return(false);
      }
    } catch (error) {
      console.error("필드 확인 오류:", error);
    }
  
  };

  // 설문 조사가 처음인지 여부를 검사하고 필드 값을 업데이트하는 함수
  const updateDocument = async (selectedOptions) => {
    try {
      // 해당 유저의 문서를 가져옵니다.
      const userDocRef = doc(dbService, "user", /*auth.currentUser.uid*/ 'w2bvjO5Eq5vDomiDFx37');
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();
      
      //forMap데이터를 가져옵니다.
      let docRef = doc(dbService, "forMap", "State"); // 컬렉션 이름(forMap)과 문서 이름(State)으로 문서의 참조를 만듭니다.
      let docSnap = await getDoc(docRef); // 문서의 스냅샷을 가져옵니다.
      let docData = docSnap.data();

      // 만약 이미 설문 조사를 했으면
      if (checkFieldExistence('question1')) {

        //기존 값을 1씩 감소시킵니다
        const decreaseField = userData.question1;
        const updatedValue = docData[decreaseField] - 1;
        updateDoc(docRef, {
          ...userData.forMap,
          [decreaseField]: updatedValue,
          }
        );
        updateDoc(userDocRef, selectedOptions); // 문서를 업데이트합니다.
        console.log("문서 업데이트 성공");
      
        //업데이트된 값으로 재참조합니다.
        docRef = doc(dbService, "forMap", "State"); 
        docSnap = await getDoc(docRef); 
        docData = docSnap.data();

        // 새로운 값을 1씩 증가시킵니다.
        const increaseField = selectedOptions.question1;
        if (increaseField) {
          const updatedValue = docData[increaseField] + 1;
           updateDoc(docRef, {
              ...userData.forMap,
              [increaseField]: updatedValue,
            }
          );
        }
      }
    } catch (error) {
      console.error("문서 업데이트 오류:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(auth.currentUser.displayName);
    console.log(auth.currentUser.uid);
    updateDocument(selectedOptions);
  };
  


  return (
    <div className="survey-container">
      <div className="surveys-heads">
        <img src={logo} alt="Logo" className='surveys-logo' />
        <div className="surveys-name">
          한동네
        </div>
        <div className="surveys">
          설문조사&매칭
        </div>
      </div>
      <div className="surveys-background">
        <div className="surveys-smallbox">
        <div className="question">
          1. 어느 지역에 살고 계신가요?
        </div>
        <div className="option">
          <form action="#">
            <select
              name="languages"
              id="lang"
              value={selectedOptions.question1} // 선택된 옵션
              onChange={(e) => handleOptionChange("question1", e.target.value)} // 옵션 선택시 상태 업데이트
            >
              <option value="select">옵션</option>
              <option value="GG">경기도</option>
              <option value="GW">강원도</option>
              <option value="CC">충청도</option>
              <option value="GS">경상도</option>
              <option value="JL">전라도</option>
            </select>
          </form>
        </div>
      </div>
        <div className="surveys-smallbox">
          <div className="question">
            2. 본인의 mbti를 골라주세요 . 
          </div>
          <div className="option">
          <form action="#">
            <select
              name="languages"
              id="lang"
              value={selectedOptions.question2} // 선택된 옵션
              onChange={(e) => handleOptionChange("question2", e.target.value)} // 옵션 선택시 상태 업데이트
            >
                <option value="select">옵션</option>
                <option value="intro">I***(내향적)</option>
                <option value="extro">E***(외향적)</option>
              </select>
            </form>
          </div>
        </div>
        <div className="surveys-smallbox">
          <div className="question">
            3. 운동이나 스포츠를 좋아하시나요?
          </div>
          <div className="option">
          <form action="#">
            <select
              name="languages"
              id="lang"
              value={selectedOptions.question3} // 선택된 옵션
              onChange={(e) => handleOptionChange("question3", e.target.value)} // 옵션 선택시 상태 업데이트
            >
                <option value="select">옵션</option>
                <option value="workOut">예</option>
                <option value="noWorkOut">아니요</option>
              </select>
            </form>
          </div>
        </div>
        <div className="surveys-smallbox">
          <div className="question">
            4. 동물을 키우거나 좋아하시나요 ?
          </div>
          <div className="option">
          <form action="#">
            <select
              name="languages"
              id="lang"
              value={selectedOptions.question4} // 선택된 옵션
              onChange={(e) => handleOptionChange("question4", e.target.value)} // 옵션 선택시 상태 업데이트
            >
                <option value="select">옵션</option>
                <option value="animal">예</option>
                <option value="noAnimal">아니요</option>

              </select>
            </form>
          </div>
        </div>
        <div className="surveys-smallbox">
          <div className="question">
            5. 실제로 만나고 싶은 친구를 만들고 싶으신가요?
          </div>
          <div className="option">
          <form action="#">
            <select
              name="languages"
              id="lang"
              value={selectedOptions.question5} // 선택된 옵션
              onChange={(e) => handleOptionChange("question5", e.target.value)} // 옵션 선택시 상태 업데이트
            >
                <option value="select">옵션</option>
                <option value="meet">예</option>
                <option value="noMeet">아니오</option>
              </select>
            </form>
          </div>
        </div>
        <div className="back-matching">
        <button type="submit" className="backs">
          Back
        </button>
        <button type="submit" className="matching" onClick={handleSubmit}>
          매칭 시작
        </button>
      </div>
    </div>

    </div>
  );
}

export default Survey;
