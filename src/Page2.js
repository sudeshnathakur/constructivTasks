import React, { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';
import './WeatherCard.css';


const apiKey = 'd0b7abc2b79441ef8e993054241303';

function Page2({ selectedOption, handleOptionClick, handlePageToggle}) {

  const [location, setLocation] = useState('Berlin');
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&lang=de`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Fehler beim Abrufen der Wetterdaten:', error);
        setIsLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30000);

    return () => clearInterval(interval);
  }, [location]);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setError('Bitte geben Sie zuerst eine Stadt ein.');
      return;
    }
    setLocation(searchQuery);
    setSearchQuery('');
    setError('');
  };
  return (
    <div className="mobile-page-2">
    <header>
      <img src="whiteLogo@3x.png" alt="Logo" className="logo" />
    </header>
    <main>
      <div className="header-bar1">
        <div className={`header-option ${selectedOption === 'option1' ? 'active' : ''}`}  onClick={() => handlePageToggle('page1')}>
          Home
        </div>
        <div className={`header-option ${selectedOption === 'option2' ? 'active' : ''}`} onClick={() => handlePageToggle('page2')}>
          Temperature
        </div>
        <div className={`header-option ${selectedOption === 'option3' ? 'active' : ''}`} onClick={() => handlePageToggle('page3')}>
          3D-Effect
        </div>
      </div>
    </main>
    <div className="scrollable-content">
      <div className="purple-rectangle">
        <div className="text-container">
          <span className="first-style">Lorem ipsum dolor sit amet,</span>
          <span className="second-style">consetetur sadipscing elitr.</span>
        </div>
        <span className="third-style">PLEASE SCROLL DOWN FOR TASK 2 WEATHER INFO.</span>
      </div>
      <div className="image-container">
        <img src="temperature.png" alt="RandomImage" />
      </div>
      <div className="new-container">
        <div className="text-container1">
          <span className="first-style1">Lorem ipsum dolor sit amet,</span>
          <br />
          <span className="second-style1">consetetur sadipscing elitr.</span>
        </div>
        <div className="additional-text">
          <p className="additional-text-style">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
          </p>
        </div>
      </div>
      {/* Left container */}
      <div className="left-container">
        <div className="left-text-container">
          <span className="left-text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.</span>
        </div>
      </div>
      {/* Right container */}
      <div className="right-container">
        <div className="form-container">
          <h2 className="form-title">Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</h2>
          <div className="form-fields">
            <input type="text" placeholder="Name" className="form-input" />
            <input type="text" placeholder="Email-Address" className="form-input" />
            <input type="text" placeholder="Nachricht" className="form-input" />
          </div>
          <div className="form-checkbox">
            <input type="checkbox" id="data-processing" />
            <label htmlFor="data-processing">Einwilligung zur Datenverarbeitung*</label>
          </div>
          <button className="submit-button">Jetzt absenden!</button>
        </div>
      </div>

    <div className='weather-container'>
      <span className="weather-text">Wetter Info</span>
      <div className='weather-search'>
      <form onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          placeholder="Suche nach Stadt..." 
          value={searchQuery} 
          onChange={handleSearchQueryChange} 
        />
        <button type="submit">Suchen</button>
      </form>
      </div>
      <div className="location-dropdown1">
        <label htmlFor="locationSelect" className='standortText1'>Standort wählen:</label>
        <select id="locationSelect" value={location} onChange={handleLocationChange}>
          <option value="Berlin">Berlin</option>
          <option value="München">München</option>
          <option value="Hamburg">Hamburg</option>
        </select>
      </div>
    <div className="weather-info">
      {isLoading ? (
        <p>Laden...</p>
      ) : weatherData ? (
        <>
          <p className="temperature">Temperatur: {weatherData.current.temp_c}°C</p>
          <p className="condition">Wetterbedingung: {weatherData.current.condition.text}</p>
        </>
      ) : (
        error ? (
          <p className="error">{error}</p>
        ) : (
          <p>Keine Daten verfügbar</p>
        )
      )}
    </div>

    </div>
    </div>
  </div>
  );
};

export default Page2;