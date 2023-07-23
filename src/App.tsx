import React from 'react';
import './App.css';
import Location from './component/Location';
import Weather from './component/Weather';

function App() {

  return (
    <div className="App">
      <h1>天気予報</h1>
      <Location />
      <Weather />
    </div>
  );
}

export default App;
