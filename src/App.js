import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  const API_KEY = "a33e014e75b0261963e1c6981f48ea3e";
  const city_name = " "; //Empty need to initialise to User input from Search Bar
  const example = `api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;


useEffect(async () => {
  getLocation()
}, []);
const getLocation = async () => {
  const reponse = await fetch(`api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`)
  const data = reponse.json();

  // Calls the API key and allows you call certain data. 
  // Add parameters we need to call such as temp, day, sunny/rainy
}
  return (
    <div className="App">
      <form className="Search-form">
        <input className="Search-Bar" type= "text"/>
        <button className= "Search-button" type = "submit">
          Search
          </button>
      </form>
    </div>
  );
}

export default App;
