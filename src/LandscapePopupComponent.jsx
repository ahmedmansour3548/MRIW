import React from 'react';
import './LandscapePopup.css';

const LandscapePopupComponent = () => {
  return (
    <div className="landscape-popup">
        <img src='/images/Landscape.png'></img>
      <p>Please rotate your device to landscape mode for the best viewing experience</p>
    </div>
  );
};

export default LandscapePopupComponent;
