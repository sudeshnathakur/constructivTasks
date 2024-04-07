import React, { useState } from 'react';
import './App.css';
import WeatherCard from './WeatherCard'; // Import the WeatherCard component

function Page3({ handleOptionClick, handlePageToggle }) {
  return (
    <div className="mobile-container">
      <div className="mobile-screen">
        <header>
          <img src="whiteLogo.png" alt="Logo" className="logo" />
        </header>
        <main>
          <div className="header-bar">
            <div className="header-option" onClick={() => handlePageToggle('page1')}>
              Home
            </div>
            <div className="header-option" onClick={() => handlePageToggle('page2')}>
              Temperature
            </div>
            <div className="header-option" onClick={() => handlePageToggle('page3')}>
              3D-Effect
            </div>
          </div>
        </main>
        <WeatherCard />
        {/* Render the WeatherCard component */}
       
      </div>
    </div>
  );
}

export default Page3;
