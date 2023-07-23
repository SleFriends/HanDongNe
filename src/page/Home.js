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
    image1: { top: '300px', left: '400px', width: '350px', height: '350px' },
    image2: { top: '0px', left: '370px' , width: '350px', height: '350px'},
    image3: { top: '400px', left: '800px', width: '350px', height: '350px'},
    image4: { top: '550px', left: '100px' , width: '350px', height: '350px'},
    image5: { top: '700px', left: '500px', width: '350px', height: '350px'}
  });

  const handlePositionChange = (imageId, top, left, width, height) => {
    setImagePositions(prevPositions => ({
      ...prevPositions,
      [imageId]: { top, left }
    }));
  };

  return (
    <div className="image-container">
      <div
        onClick={() => handlePositionChange('image3', '400px', '800px', '350px', '350px')}
        className="image-button"
        style={{ ...imagePositions.image3, gridArea: 'image3' }}
      >
        <img src={map3} alt="Image 3" className="image" />
      </div>

      <div
        onClick={() => handlePositionChange('image5', '700px', '500px', '350px', '350px')}
        className="image-button"
        style={{ ...imagePositions.image5, gridArea: 'image5' }}
      >
        <img src={map5} alt="Image 5" className="image" />
      </div>

      <div
        onClick={() => handlePositionChange('image4', '550px', '100px', '350px', '350px')}
        className="image-button"
        style={{ ...imagePositions.image4, gridArea: 'image4' }}
      >
        <img src={map4} alt="Image 4" className="image" />
      </div>

      <div
        onClick={() => handlePositionChange('image2', '0px', '370px', '350px', '350px')}
        className="image-button"
        style={{ ...imagePositions.image2, gridArea: 'image2' }}
      >
        <img src={map2} alt="Image 2" className="image" />
      </div>

      <div
        onClick={() => handlePositionChange('image1', '300px', '400px', '350px', '350px')}
        className="image-button"
        style={{ ...imagePositions.image1, gridArea: 'image1' }}
      >
        <img src={map1} alt="Image 1" className="image" />
      </div>

    </div>
  );
};

const Home = () => {
  return (
  <div className="home-page">
    <div className="home-container">
      <div className="left-half">
        <YourComponent />
      </div>
      <div className="right-half">
        <div className="drawline">
          <div className="sky-line"></div>
          <div className="home-container">
            <img src={logo} alt="Logo" className="home-logo" />
            <p className="text">한동네</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Home;
