import React, { useState } from 'react';
import { useEffect } from 'react';
import '../css/register.css';
import logo2 from '../image/logo2.png';
import glogo from '../image/gmail.png';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, dbService, collection, addDoc } from '../fbase'; // Import Firestore-related objects and functions



function Register() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState(false);
  const [email, setEmail] = useState('');
  const [valuel, setValuel] = useState();
  const [firstStep, setFirstStep] = useState('');
  const [getImformation, setGetImformation] = useState();
  const [imageUpload, setImageUpload] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [userData, setUserData] = useState("");
  const [init, setInit] = useState(false);
  const [logFirst, setLogFirst] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);



  useEffect(() => {
    if (password === passwordConfirmation) {
      setIsConfirmed(true); // 비밀번호와 비밀번호 확인이 일치하면 isConfirmed를 true로 설정
    } else {
      setIsConfirmed(false); // 비밀번호와 비밀번호 확인이 일치하지 않으면 isConfirmed를 false로 설정
    }
  }, [password, passwordConfirmation]);

  const handleInputChange = (event) => {
    setEmail(event.target.value);
  };

  
  const handleIdChange = (event) => {
    setId(event.target.value);
    console.log(id);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
    console.log(passwordConfirmation);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!id || !password || !email || !passwordConfirmation) {
      console.log('유효하지 않은 입력 데이터입니다.');
      return;
    }

    if (password !== passwordConfirmation) {
      console.log('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    // Firestore 컬렉션에 문서를 추가합니다.
    try {
      const docData = {
        id: id,
        pw: password,
        email: email,
        schoolprove: passwordConfirmation
      };

      addDoc(collection(dbService, "user"), docData)
        .then((docRef) => {
          setValuel();
          console.log('create 성공');
        })
        .catch((error) => {
          console.log('문서 추가 오류:', error);
        });
    } catch (error) {
      console.log('문서 추가 오류:', error);
    }
  };

  const confirmEmail = (email) => {
    const emailSuffix = "handong.ac.kr";
    
    // 이메일 주소가 ".handong.ac.kr"로 끝나는지 확인
    if (email.endsWith(emailSuffix)) {
      setPasswordConfirmation(true);
    } else {
      setPasswordConfirmation(false);
    }
  };

  
  

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((data) => {
        setInit(true);
        setUserData(data.user);
        console.log(data.user); // Use 'data.user' here, as 'userData' will not be updated immediately.
        const personName = auth.currentUser.displayName;
        const personUid = auth.currentUser.uid;
        const personEmail = auth.currentUser.email;
        // handleOnSubmitWithdocUserid(personUid, personEmail, personName); // handleOnSubmitWithdocUserid is not defined. Define or remove this function.
        setEmail(auth.currentUser.email);
        confirmEmail(email);
       
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function Logincheck() {
    if (logFirst) {
      return false;
    } else {
      return true;
    }
  }

  const onLogOutClick = () => {
    auth.signOut();
    console.log('logout');
  };

  function onReadUserData(user) {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        return true;
      } else {
        console.log(user);
        return false;
      }
    });
  }


  return (
    <div>
      <header className='register-header'>
        <img src={logo2} className="register-logo" alt="Logo" />
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
                <button type="submit" className={isConfirmed ? "gmailconnect confirmed" : "gmailconnect"} onClick={handleGoogleLogin}>
        학교계정 연동하기
      </button>
      <input
        type="text"
        placeholder="현재 이메일"
        value={email}
      />
      <button type="submit" className={isConfirmed ? "gmailconnect confirmed" : "gmailconnect"} onClick={() => confirmEmail(email)}>
        연동
      </button>
                <p>
        {passwordConfirmation
          ? "이메일 주소가 'handong.ac.kr'로 끝납니다." 
          : "이메일 주소가 'handong.ac.kr'로 끝나지 않습니다."}
      </p>
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
}

export default Register;