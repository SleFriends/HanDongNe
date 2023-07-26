// survey.js
import React, { useState } from "react";
import '../css/survey.css'; // Make sure the CSS file path is correct
import logo from '../image/logo.png';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // 선택한 옵션들을 출력해보기 (나중에 이부분을 서버로 보내서 저장할 수 있습니다)
    console.log(selectedOptions);
  };



  return (
    <div>
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
                <option value="meet">네</option>
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
