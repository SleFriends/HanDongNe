// survey.js
import React from "react";
import '../css/survey.css'; // Make sure the CSS file path is correct
import logo from '../image/logo.png';

function Survey() {

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
            1. 어디 거주하는지 ? (거주지역 파악 도별로 ?? ) + 외로우신가요......? 
          </div>
          <div className="option">
            옵션
          </div>
        </div>
        <div className="surveys-smallbox">
          <div className="question">
            2. 본인의 mbti를 골라주세요 . 
          </div>
          <div className="option">
            옵션
          </div>
        </div>
        <div className="surveys-smallbox">
          <div className="question">
            3. 어떤 운동이나 스포츠를 좋아하시나요?
          </div>
          <div className="option">
            옵션
          </div>
        </div>
        <div className="surveys-smallbox">
          <div className="question">
            4. 산책을 좋아하시나요 ?
          </div>
          <div className="option">
            옵션
          </div>
        </div>
        <div className="surveys-smallbox">
          <div className="question">
            5. 동물을 키우거나 좋아하시나요 ?
          </div>
          <div className="option">
            옵션
          </div>
        </div>
        <div className="surveys-smallbox">
          <div className="question">
            6. 만나고 싶은 친구를 만들고 싶으신가요?
          </div>
          <div className="option">
            옵션
          </div>
        </div>
      </div>
    </div>
  );
}

export default Survey;
