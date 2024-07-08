import React from 'react';
import { Home } from './Home';
import { NavLink } from 'react-router-dom';
import backgroundImage from '/images/VARLAB_Logo.png';
import './Home.css';

const HomeComponent = () => {
    const { images, isDrawerOpen, toggleDrawer, handleBackgroundClick } = Home();

    

    return (
        <div className="background" onClick={handleBackgroundClick}>
            <div className="navLinkContainer">
                <img src="/images/VARLAB_Logo.png" alt="VARLAB Logo" />
                <NavLink to="/ar" className="navLink">Start Augmented Reality Experience</NavLink>
                <button onClick={toggleDrawer} className="toggleDrawerButton">About</button>
            </div>
            <div className="background-images">
                {images.map((image) => (
                    <img
                        className="background-image"
                        key={image.id}
                        src={backgroundImage}
                        alt="VARLAB"
                        style={{
                            position: 'absolute',
                            left: `${image.left}px`,
                            top: `${image.top}px`,
                            opacity: image.opacity,
                            zIndex: -1,
                        }}
                    />
                ))}
            </div>
            {isDrawerOpen && <div className="backdrop" />}
            <div className={`drawerContainer ${isDrawerOpen ? 'open' : 'close'}`} onClick={(e) => e.stopPropagation()}>
                <h1>Credits</h1>
                <p>Project Created by: Ahmed Mansour</p>
                <p>Code and Software Design by: Ahmed Mansour</p>
                <p>Mural Design by: Abdul Mannan Mohammed</p>
                <p>Special Thanks: Dr. Ryan McMahan, Dr. Carolina Cruz-Neira, and Ryan Kendrick</p>
            </div>
        </div>
    );
};

export default HomeComponent;
