import React, { useState } from 'react';
import './App.css';

function Page1({ handlePageToggle  }) {

  return (
    <div className="mobile-container page1">
      <div className="mobile-screen1">
        <header>
          <img src="consLogo.png" alt="Logo" className="logo1" />
        </header>
        <main>
          <div className="buttons-container">
          <a href="#11" className="mobile-button" onClick={() => handlePageToggle('page3')}>Mobile</a>
            <a href="#12" className="desktop-button" onClick={() => handlePageToggle('page2')}>Desktop</a>
          </div>
        </main>
        <footer>
          <p className="footer-text1">Diese Seite dient nur zur Orientierung und soll nicht umgesetzt werden</p>
        </footer>
      </div>
    </div>
  );
}

export default Page1;
