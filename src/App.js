import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const API_KEY = "a33e014e75b0261963e1c6981f48ea3e";
  //var city_name = document.getElementById("city_name").value; //Empty need to initialise to User input from Search Bar
  const [locations, setLocations] = useState([]);

useEffect(async () => {
  getLocation()
}, []);

const getLocation = async () => {
  const reponse = await fetch(`api.openweathermap.org/data/2.5/weather?q={London}&appid=${API_KEY}`) //Calls current Weather API
  const data = await reponse.json();
  console.log(data);
  // Calls the API key and allows you call certain data. 
}

  return (
    <div className="App">
      <form className="Search-form">
        <input className="Search-bar" type= "text" id="city_name"/>
        <button className= "Search-button" type = "submit">
          Search
          </button>
      </form>
    </div>
  );
}

export default App;
