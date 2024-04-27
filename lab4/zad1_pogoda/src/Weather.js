import React, { useState } from 'react';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState({ latitude: '', longitude: '' });

  const fetchData = async () => {
    if (!coords.latitude || !coords.longitude) {
      alert("Proszę wprowadzić poprawne współrzędne.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&hourly=temperature_2m`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  const handleChange = (event) => {
  const { name, value } = event.target;
  if (value === '' || /^-?\d*\.?\d*$/.test(value)) {
    setCoords(prev => ({
      ...prev,
      [name]: value
    }));
  }
};



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Weather Data</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="latitude"
          value={coords.latitude}
          onChange={handleChange}
          placeholder="Szerokość geograficzna"
        />
        <input
          type="text"
          name="longitude"
          value={coords.longitude}
          onChange={handleChange}
          placeholder="Długość geograficzna"
        />
        <button type="submit">Pokaż pogodę</button>
      </form>
      {weather && (
        <div>
          <h2>Temperature Data:</h2>
          {weather.hourly.time.map((time, index) => (
            <div key={index}>
              Czas: {time}, Temperatura: {weather.hourly.temperature_2m[index]} °C
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather;
