import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import SearchText from "./search";

function App() {
  const API_KEY = "a33e014e75b0261963e1c6981f48ea3e";
  var city_name = " "; //Empty need to initialise to User input from Search Bar
  console.log(city_name);
  const example = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;
  // const example = `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;

  const [searchText, setSearchText] = useState(() => " ");
  
  useEffect(() => {
    getLocation();
  }, [city_name]);

  const getLocation = async (searchText) => {
    console.log(searchText);
    const reponse = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${API_KEY}`
    );
    const data = reponse.json();
    console.log(data);

    // Calls the API key and allows you call certain data.
    // Add parameters we need to call such as temp, day, sunny/rainy
  };

  const handleChanged = (e) => {
    // Handle Changed Code
    setSearchText(e.target.value);
    // console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    // Submit code
    e.preventDefault();
    city_name = searchText;
    // console.log(city_name);
    getLocation();
  };

  return (
    <div className="App">
      <form className="Search-form" onSubmit={handleSubmit}>
        <input
          className="Search-Bar"
          type="text"
          value={searchText}
          onChange={handleChanged}
          placeholder="Enter City ... e.g. London, Birmingham, Moscow"
        />
        <button onClick={handleSubmit} className="Search-button" type="submit">
          Search
        </button>
      </form>
      <SearchText getLocation={getLocation}/>
    </div>
  );
}

export default App;
