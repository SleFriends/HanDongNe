// App.js
import React, { useState } from "react";
import '../css/Login.css'; // Make sure the CSS file path is correct
import logo from '../image/logo2.png';

function App() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const handleChangeText1 = (event) => {
    setText1(event.target.value);
  };

  const handleChangeText2 = (event) => {
    setText2(event.target.value);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <img src={logo} alt="Logo" />
      </div>
      <div className="writeloc">
        <hr />
        <h1>한동네</h1>
        <p>한동대생들의 동네 친구 찾기</p>
      </div>
      <div className="textboxloc">
        <input
          type="text"
          placeholder="아이디"
          className="textbox"
          value={text1}
          onChange={handleChangeText1}
        />
        <input
          type="text"
          placeholder="비밀번호"
          className="textbox"
          value={text2}
          onChange={handleChangeText2}
        />
      </div>

      <div className="button-container">
        <button className="button">로그인</button>
        <button className="button">회원가입</button>
      </div>
    </div>
   
  );
}

export default App;
