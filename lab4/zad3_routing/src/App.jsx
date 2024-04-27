import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Weather from './Weather';
import RegistrationForm from './RegistrationForm';

function App() {
  return (
    <div className="App">
      <h1>Strona główna</h1>
      <nav>
        <Link to="/weather">Pogoda</Link>
        <Link to="/register">Formularz</Link>
      </nav>
      <Routes>
        <Route path="/weather" element={<Weather />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </div>
  );
}

export default App;
