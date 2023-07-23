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
            <form action="#">
              <select name="languages" id="lang">
                <option value="select">옵션</option>
                <option value="javascript">경기도</option>
                <option value="php">강원도</option>
                <option value="java">충청도</option>
                <option value="java">경상도</option>
                <option value="java">전라도</option>
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
              <select name="languages" id="lang">
                <option value="select">옵션</option>
                <option value="javascript">I***(내향적)</option>
                <option value="php">E***(외향적)</option>

              </select>
            </form>
          </div>
        </div>
        <div className="surveys-smallbox">
          <div className="question">
            3. 어떤 운동이나 스포츠를 좋아하시나요?
          </div>
          <div className="option">
          <form action="#">
              <select name="languages" id="lang">
                <option value="select">옵션</option>
                <option value="javascript">축구</option>
                <option value="php">농구</option>
                <option value="java">헬스</option>
                <option value="java">해당 없음</option>
              </select>
            </form>
          </div>
        </div>
        <div className="surveys-smallbox">
          <div className="question">
            4. 산책을 좋아하시나요 ?
          </div>
          <div className="option">
          <form action="#">
              <select name="languages" id="lang">
                <option value="select">옵션</option>
                <option value="javascript">O</option>
                <option value="php">X</option>

              </select>
            </form>
          </div>
        </div>
        <div className="surveys-smallbox">
          <div className="question">
            5. 동물을 키우거나 좋아하시나요 ?
          </div>
          <div className="option">
          <form action="#">
              <select name="languages" id="lang">
                <option value="select">옵션</option>
                <option value="javascript">O</option>
                <option value="php">X</option>

              </select>
            </form>
          </div>
        </div>
        <div className="surveys-smallbox">
          <div className="question">
            6. 만나고 싶은 친구를 만들고 싶으신가요?(오픈채팅방 X, 일반카톡방)
          </div>
          <div className="option">
          <form action="#">
              <select name="languages" id="lang">
                <option value="select">옵션</option>
                <option value="javascript">네</option>
                <option value="php">아니오</option>
              </select>
            </form>
          </div>
        </div>
        <div className="back-matching">
          <button type="submit" className="backs">
            Back
          </button>
          <button type="submit" className="matching">
            매칭 시작
          </button>
        </div>
      </div>

    </div>
  );
}

export default Survey;
