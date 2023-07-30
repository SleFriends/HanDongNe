import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../css/Login.css';
import logo from '../image/logo2.png';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import Home from './Home';
import Survey from './survey';
import Review from './Review';
import Register from './register';
import Myposts from './myposts'
import MyPage from './mypage';

function Login() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const handleChangeText1 = (event) => {
    setText1(event.target.value);
  };

  const handleChangeText2 = (event) => {
    setText2(event.target.value);
  };

  const handleLogin = () => {
    const email = text1;
    const password = text2;

    // Firebase에서 인증 객체를 가져옵니다.
    const auth = getAuth();

    // 이메일과 비밀번호를 사용하여 로그인을 시도합니다.
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('로그인 성공:', userCredential.user);
        // 로그인에 성공하면, 사용자를 /Home 페이지로 리디렉션합니다.
        alert("로그인 되셨습니다~");
        // Programmatic navigation to Home page after successful login
        console.log(auth.currentUser.email);
        window.location.href = "/Home";
      })
      .catch((error) => {
        alert("아이디 또는 비밀번호를 확인해주세요~");
        console.error('로그인 실패:', error);
      });
  };

  return (
    <Router>
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
            type="password"
            placeholder="비밀번호"
            className="textbox"
            value={text2}
            onChange={handleChangeText2}
          />
        </div>

        <div className="button-container">
          <button className="login-button" onClick={handleLogin}>로그인</button>
          <button className="login-button">
            <Link to="/register" style={{ textDecoration: "none", color: "white" }}>회원가입</Link>
          </button>
        </div>
      </div>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Review" element={<Review />} />
        <Route path="/Myposts" element={<Myposts />} />
        <Route path="/Survey" element={<Survey />} />
        <Route path="/MyPage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}


export default Login;