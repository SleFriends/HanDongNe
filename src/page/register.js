import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../css/register.css';
import logo2 from '../image/logo2.png';
import glogo from '../image/gmail.png';// Register.js
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup } from 'firebase/auth'; // 수정: getAuth 제거, createUserWithEmailAndPassword 추가
import { auth, dbService, collection, addDoc, doc, getDoc, getDocs, updateDoc, setDoc , deleteUser } from '../fbase'; // Firebase 설정 파일 경로를 적절히 수정하세요.
import Login from './Login';

// ... 이하 코드는 이전과 동일 ...

function Register() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [email, setEmail] = useState('');
  const [valuel, setValuel] = useState();
  const [firstStep, setFirstStep] = useState('');
  const [getImformation, setGetImformation] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const [userData, setUserData] = useState("");
  const [init, setInit] = useState(false);
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

  const handleSubmit = () => {
    if (!id || !password || !email || !passwordConfirmation) {
      alert('유효하지 않은 입력 데이터입니다.');
      return;
    }

    if (password !== passwordConfirmation) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (!isConfirmed) {
      alert('이메일 주소가 "handong.ac.kr"로 끝나지 않습니다.');
      return;
    }

    // Firebase 인증 객체를 가져옵니다.
    const auth = getAuth();

    // 이메일과 비밀번호를 사용하여 새로운 사용자를 등록합니다.
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('회원가입 성공:', userCredential.user);
        // 회원가입에 성공하면, 원하는 페이지로 리디렉션하도록 설정합니다.
        // 예를 들면, 로그인 페이지로 리디렉션하는 방법은 다음과 같습니다.
        // window.location.href = "/login";
        StorageUser();
      })
      .catch((error) => {
        alert("회원가입 실패");
        console.error('회원가입 실패:', error);
      });

  };

  const confirmEmail = (email) => {
    const emailSuffix = "handong.ac.kr";

    // 이메일 주소가 ".handong.ac.kr"로 끝나는지 확인
    if (email.endsWith(emailSuffix)) {
      setIsConfirmed(true);
    } else {
      setIsConfirmed(false);
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
  
        // signInWithPopup 함수 처리가 끝난 후에 deleteUser 함수 호출
        deleteUser(auth.currentUser)
          .then(() => {
            console.log("사용자 인증 정보가 성공적으로 삭제되었습니다.");
          })
          .catch((error) => {
            console.error("사용자 인증 정보 삭제에 실패했습니다.", error);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const onLogOutClick = () => {
    auth.signOut();
    console.log('logout');
  };

  // function StorageUser() {  // firebase create 함수 원하는 collection 안에 원하는 doc을 입력할 떄 쓴다.
  //   console.log('create firstStep에 저장 시작');
  //   const docRef = setDoc(doc(dbService, "user", auth.currentUser.email), { // create라는 collection 안에 firstStep이라는 document에 저장하겠다는 뜻
  //       id: auth.currentUser.email,
  //       pw: password,
  //       email: auth.currentUser.email,
  //       school_prove: "true"
  //   });
  //   if (docRef) {
  //     alert("회원가입이 불가합니다. 이미 가입한 아이디 인지 입력하신 값을 잘못 넣으신게 없는지 확인해주세요");
  //     console.log('create firstStep에 저장 성공');
  //   }
  // }
  async function StorageUser() {
    console.log('create firstStep에 저장 시작');
  
    try {
      const docRef = await setDoc(doc(dbService, "user", auth.currentUser.email), {
        id: auth.currentUser.email,
        pw: password,
        email: auth.currentUser.email,
        school_prove: "true"
      });
  
      if (docRef) {
        alert("회원가입이 완료되었습니다.");
        console.log('create firstStep에 저장 성공');
      }
    } catch (error) {
      alert("회원가입이 불가합니다. 이미 가입한 아이디이거나 입력한 값이 잘못되었습니다.");
      console.error('create firstStep에 저장 실패', error);
    }
  }
  


  async function fetchData() { // firebase Update : 함수 원하는 collection 안에 원하는 doc 안에 내용을 읽어올 때 사용한다.
    const docRef = doc(dbService, "ID_ALL", "id");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFirstStep(docSnap.data().create);
    } else {
      console.log("No such document!");
      setFirstStep('정보 없음');
    }
  }

  async function fetchAllData() {  // firebase Update : 함수 원하는 collection 안에 모든 doc을 읽어올 때 사용한다.
    const data = await getDocs(collection(dbService, "create"));
    const newData = data.docs.map(doc => ({ ...doc.data() }));
    setGetImformation(newData);

    console.log(newData);
    console.log("get create doc!");
  }

  useEffect(() => {
    fetchData();
    fetchAllData();
  }, [])



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
              {/* <button type="submit" className="idconfirm">
                중복확인
              </button> */}
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
                <button
                  type="submit"
                  className={isConfirmed ? "gmailconnect confirmed" : "gmailconnect"}
                  onClick={handleGoogleLogin}
                >
                  학교계정 연동하기
                </button>
                <input
                  type="text"
                  placeholder="현재 이메일"
                  value={email}
                  onChange={handleInputChange} // Update email input value
                />
                <button style={{marginLeft:'10px' ,width:'60px'}}
                  type="submit"
                  className={isConfirmed ? "gmailconnect confirmed" : "gmailconnect"}
                  onClick={() => setIsConfirmed(email.endsWith("handong.ac.kr"))} // Check email confirmation
                >
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
              <button
                type="submit"
                className="signup"
                onClick={handleSubmit}
                disabled={!isConfirmed} // Disable the button if email is not confirmed or passwords don't match
              >
                회원가입하기
              </button>
              <button type="submit" className="back">
                <Link to="/Login"style={ {textDecoration: "none", color: "black" }}>뒤로가기</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;