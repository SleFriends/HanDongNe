import React, { useState } from 'react';
import '../css/home.css'; // CSS
import logo from '../image/logo.png';
import map1 from '../image/1.png';
import map2 from '../image/2.png';
import map3 from '../image/3.png';
import map4 from '../image/4.png';
import map5 from '../image/5.png';
import { BrowserRouter as Routes, Route, Link } from 'react-router-dom';
import MyPage from './mypage';
import Survey from './survey';
import Review from './Review';
import { doc, getDoc } from 'firebase/firestore';
import { auth, dbService } from '../fbase';

const YourComponent = () => {
  const [imagePositions, setImagePositions] = useState({
    image1: { width: '280px', height: '280px' },
    image2: {width: '280px', height: '280px'},
    image3: { width: '280px', height: '260px'},
    image4: { width: '250px', height: '250px'},
    image5: { wwidth: '280px', height: '150px'},
  });

  const alertStateNumber = async (State) => {
    try {
      const docRef = doc(dbService, "forMap", "State");
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
  
        let number;
        let stateString;
        switch (State) {
          case "GG":
            number = data.GG;
            stateString = "경기도";
            break;
          case "CC":
            number = data.CC;
            stateString = "충청도";
            break;
          case "GS":
            number = data.GS;
            stateString = "경상도";
            break;
          case "JL":
            number = data.JL;
            stateString = "전라도";
            break;
          case "GW":
            number = data.GW;
            stateString = "강원도";
            break;
          default:
            alert("해당 State의 number 값을 찾을 수 없습니다.");
            return;
        }
  
        alert(`${stateString}에는 한동네 친구가 ${number}명 있습니다!`);
      } else {
        alert("forMap/State 문서가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("State의 number 값을 가져오는데 오류 발생:", error);
      alert("State의 number 값을 가져오는데 오류가 발생했습니다.");
    }
  };

  return (
    <div className="image-container">
        <div className='leftthree'>
          <div //경기도
            onClick={() => alertStateNumber('GG')}
            className="image3"
            style={{ ...imagePositions.image3 ,marginLeft:'50px'}}
          >
            <img src={map3} alt="Image 3" className="image" />
          </div>

          <hr style={{width:'310px', marginRight:'0px',}}></hr>

          <div //충청도
            onClick={() => alertStateNumber('CC')}
            className="image5"
            style={{ ...imagePositions.image5 ,marginTop:'0px',marginLeft:'80px'}}
          >
            <img src={map5} alt="Image 5" className="image"  />
          </div>

          <hr style={{width:'300px', marginRight:'0px'}}></hr>
      
          <div //전라도
            onClick={() => alertStateNumber('JL')}
            className="image4"
            style={{ ...imagePositions.image4 ,marginLeft:'90px',marginTop:'0px' }}
          >
            <img src={map4} alt="Image 4" className="image" />
          </div>
        </div>

        <div className='vertical' style={{backgroundColor:'gray',width:'1px' }} ></div>

        <div className='righttwo'>
          <div //강원도
            onClick={() => alertStateNumber('GW')}
            className="image2"
            style={{ ...imagePositions.image2 ,marginLeft:'0px'}}
          >
            <img src={map2} alt="Image 2" className="image" />
          </div>

          <hr style={{width:'300px', marginRight:'0px'}}></hr>

          <div //경상도
            onClick={() => alertStateNumber('GS')}
            className="image1"
            style={{ ...imagePositions.image1 }}
          >
            <img src={map1} alt="Image 1" className="image" />
          </div>
        </div>

    </div>
  );
};

const Home = () => {


  return (
    <div className="home-background">
      <div className="home-body">
        <div className="left-half">
          <YourComponent />
        </div>
        <div className='right-half'>
          <div className='rightmiddle'>
            <div className='firstline'></div>
            <div className='logocontain'>
              <img src={logo} alt="logo" className="bluelogo"  /> 
              <div className='texts'>
                한동네
              </div>
            </div>
            <div className='secondline'></div>
            <button type="submit" class='mypage'>
            <Link to="/MyPage" style={{ textDecoration: "none", color: "white" }}>마이페이지</Link>
            </button>
            <button type="submit" class='surveyNmatching'>
            <Link to="/Survey" style={{ textDecoration: "none", color: "white" }}>설문조사 & 매칭</Link>
            </button>
            <button type="submit" class='surveydashboard'>
            <Link to="/Review" style={{ textDecoration: "none", color: "white" }}>후기 게시판</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Home;
