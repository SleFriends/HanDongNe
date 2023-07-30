import React from 'react';
import { useHistory } from 'react-router-dom';
import '../css/Review.css';
import { Link } from 'react-router-dom';

const Myposts = () => {
  return (
    <div className="backgroundmyposts">
      <div className="heads">
        <div className="back">
          <button type="button" className="mypostsbackbutton">
            <Link to="/Home" style={{ textDecoration: "none", color: "black" }}>Back</Link>
          </button>
        </div>
        <h1 className="secondh1">나의 게시물</h1>
      </div>

      <div className="bigboxmyposts">
        <div className="middleboxmyposts">
          <div className="smallbox">
            <div className="dividetext">
              <div className="register-text">후기 표시</div>
              <div className="buttonflex">
                <button type="submit" className="fix">
                  수정하기
                </button>
                <button type="submit" className="remove">
                  삭제하기
                </button>
              </div>
            </div>
          </div>

          <div className="smallbox">
            <div className="dividetext">
              <div className="register-text">후기 표시</div>
              <div className="buttonflex">
                <button type="submit" className="fix">
                  수정하기
                </button>
                <button type="submit" className="remove">
                  삭제하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myposts;
