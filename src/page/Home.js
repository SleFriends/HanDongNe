import React, { useState } from 'react';
import '../css/home.css'; // CSS
import logo from '../image/logo.png';
import map1 from '../image/1.png';
import map2 from '../image/2.png';
import map3 from '../image/3.png';
import map4 from '../image/4.png';
import map5 from '../image/5.png';

const YourComponent = () => {
  const [imagePositions, setImagePositions] = useState({
    image1: { width: '280px', height: '280px' },
    image2: {width: '280px', height: '280px'},
    image3: { width: '280px', height: '260px'},
    image4: { width: '250px', height: '250px'},
    image5: { wwidth: '280px', height: '150px'},
  });

  const handlePositionChange = (imageId,) => {
    setImagePositions((prevPositions) => ({
      ...prevPositions,
    
    }));
  };

  return (
    <div className="image-container">
        <div className='leftthree'>
      <div //경기도
        onClick={() => handlePositionChange('image3')}
        className="image3"
        style={{ ...imagePositions.image3 ,marginLeft:'50px'}}
      >
        <img src={map3} alt="Image 3" className="image" />
      </div>
      <hr style={{width:'310px', marginRight:'0px',}}></hr>

      <div //충청도
        onClick={() => handlePositionChange('image5')}
        className="image5"
        style={{ ...imagePositions.image5 ,marginTop:'0px',marginLeft:'80px'}}
      >
        <img src={map5} alt="Image 5" className="image"  />
      </div>
      <hr style={{width:'300px', marginRight:'0px'}}></hr>
      <div
        onClick={() => handlePositionChange('image4')}
        className="image4"
        style={{ ...imagePositions.image4 ,marginLeft:'90px',marginTop:'0px' }}
      >
        <img src={map4} alt="Image 4" className="image" />
      </div>


      </div>
    <div className='vertical' style={{backgroundColor:'gray',width:'1px' }} ></div>
    <div className='righttwo'>
      <div
        onClick={() => handlePositionChange('image2')}
        className="image2"
        style={{ ...imagePositions.image2 ,marginLeft:'0px'}}
      >
        <img src={map2} alt="Image 2" className="image" />
      </div>

      <hr style={{width:'300px', marginRight:'0px'}}></hr>

      <div
        onClick={() => handlePositionChange('image1')}
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
        {/* Rest of the content in right-half */}
      </div>
    </div>
  );
};

export default Home;
