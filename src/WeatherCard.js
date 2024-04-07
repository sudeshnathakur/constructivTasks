import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons'; // Example weather icon
import './App.css';

const apiKey = 'd0b7abc2b79441ef8e993054241303';

const WeatherCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverEffect, setHoverEffect] = useState('');
  const [location, setLocation] = useState('Berlin');
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMouseEnter = () => {
    setIsHovered(true);
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
  }

  const toggleHoverEffect = (effect) => {
    setHoverEffect(effect);
  }

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      setError('Bitte geben Sie zuerst eine Stadt ein.');
      return;
    }
    try {
      setIsLoading(true);
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchQuery}&lang=de`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData(data);
      setIsLoading(false);
      setError('');
    } catch (error) {
      console.error('Fehler beim Abrufen der Wetterdaten:', error);
      setIsLoading(false);
      setError('Fehler beim Abrufen der Wetterdaten');
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&lang=de`;
        const response = await fetch(url);
        const data = await response.json();
        setWeatherData(data);
        setIsLoading(false);
        setError('');
      } catch (error) {
        console.error('Fehler beim Abrufen der Wetterdaten:', error);
        setIsLoading(false);
        setError('Fehler beim Abrufen der Wetterdaten');
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30000);

    return () => clearInterval(interval);
  }, [location]);

  return (
    <div className="module">
      <div
        className={`card ${isHovered ? 'hovered' : ''} ${hoverEffect}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => toggleHoverEffect(hoverEffect === '' ? 'left-right' : '')} // Toggle left-right effect on click
      >
        <div className="front-face card-content">
          <span className="weather-text1">Wetter Info</span>
          <div className="weather-search1">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Suche nach Stadt..."
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
              <button type="submit" className='suchenButton'>Suchen</button>
            </form>
          </div>
          <div className="location-dropdown">
            <label htmlFor="locationSelect" className='standortText'>Standort wählen</label>
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
}

export default WeatherCard;
