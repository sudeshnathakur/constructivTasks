// App.js
import React, { useState } from 'react';
import './App.css';
import Page1 from './Page1'; 
import Page2 from './Page2'; 
import Page3 from './Page3'; 

function App() {
  const [selectedPage, setSelectedPage] = useState('page1'); 
  const [selectedOption, setSelectedOption] = useState('option1');

  // Function to handle page navigation
  const handlePageToggle = (page) => {
    setSelectedPage(page);
  };

  // Function to handle option click and navigation
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === 'option1') {
      setSelectedPage('page1');
    } else if (option === 'option2') {
      setSelectedPage('page2');
    } else if (option === 'option3') {
      setSelectedPage('page3');
    }
  };

  // Render the appropriate page based on selectedPage state
  const renderPage = () => {
    if (selectedPage === 'page1') {
      return <Page1 handlePageToggle={handlePageToggle} />;
    } else if (selectedPage === 'page2') {
      return <Page2 selectedOption={selectedOption} handleOptionClick={handleOptionClick} handlePageToggle={handlePageToggle}/>;
    } else if (selectedPage === 'page3') {
      return <Page3 handleOptionClick={handleOptionClick} handlePageToggle={handlePageToggle}/>;
    }
  };

  return (
    <div>
      {renderPage()}
      <div className="footer">
        <div className="toggle-pages">
          <span className={selectedPage === 'page1' ? 'active' : ''} onClick={() => handlePageToggle('page1')}>1 of 3</span>
          <span className={selectedPage === 'page2' ? 'active' : ''} onClick={() => handlePageToggle('page2')}>2 of 3</span>
          <span className={selectedPage === 'page3' ? 'active' : ''} onClick={() => handlePageToggle('page3')}>3 of 3</span>
        </div>
      </div>
    </div>
  );
}

export default App;
