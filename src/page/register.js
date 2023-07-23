import React, { useState } from 'react';
import '../css/register.css'; // Assuming you create this CSS file and define the styles
import logo2 from '../image/logo2.png';
import glogo from '../image/gmail.png';

const Register = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your signup logic here, e.g., sending data to the server
  };

  return (
    <div>
      <header>
        <img src={logo2} className="logo" alt="Logo" />
        <div className="name">한동네</div>
      </header>
      <div className="dividecolor">
        <div className="background">
          <div className="bigbox">
            <div className="id">
              <div className="idtext">* ID :</div>
              <div className="idtype">
                <textarea
                  value={id}
                  onChange={handleIdChange}
                  placeholder="아이디를 입력하시오."
                ></textarea>
              </div>
              <button type="submit" className="idconfirm">
                중복확인
              </button>
            </div>
            <div className="password">
              <div className="pwtext">* PW :</div>
              <div className="pwtype">
                <textarea
                  className="pwtarea"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="비밀번호."
                ></textarea>
              </div>
              <div className="pwdoublecheck">
                <textarea
                  className="pwcarea"
                  value={passwordConfirmation}
                  onChange={handlePasswordConfirmationChange}
                  placeholder="비밀번호 확인."
                ></textarea>
              </div>
            </div>
            <div className="gmail">
              <div className="gmailgeneral">
                <div className="star">*</div>
                <img src={glogo} className="gmaillogo" alt="Gmail Logo" />
                <button type="submit" className="gmailconnect">
                  학교계정 연동하기
                </button>
                <button type="submit" className="gmailconfirm">
                  이메일 확인 
                </button>
                <button type="submit" className="gmailcheck">
                  연동
                </button>
              </div>
              <div className="mandatorytext">* 표시는 필수 </div>
            </div>
            <div className="buttons">
              <button type="submit" className="signup" onClick={handleSubmit}>
                회원가입하기
              </button>
              <button type="submit" className="back">
                뒤로가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
