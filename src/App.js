import "./App.css";
import { useEffect, useState } from "react";
import SearchBar from "./components/search";
import DisplayDate from "./components/displayDate";
import SelectDay from "./components/selectDay";
import GeoButtons from "./components/geoButtons";
import AdditionalStats from "./components/additionalStats";

function App() {
  //hide api keys
  const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;
  const GEOCODING_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("London");
  // store our data from api in this
  const [dataFromApi, setDataFromApi] = useState(null);

  // Change from Kelvin to Degrees Celcius
  const kelvinToCelcius = (num) => {
    num = num - 273;
    // return Math.round(num * 100) / 100; // TODO(jjoshodoi): We can chose to use either 1dp or 2dp
    return Math.round(num * 10) / 10;
  };

  /// SEARCH CODE
  useEffect(() => {
    getLocation();
  }, [query]);

  const getLocation = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${WEATHER_API_KEY}`
    );
    // Check here if the response is valid
    if (response.ok) {
      const data = await response.json();
      setLocations(data.hits);
      setDataFromApi(data);
    } else {
      alert("Enter a valid Location");
    }
  };

  const update = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("Didn't work");
    }
  };

  const showPosition = async (position) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${WEATHER_API_KEY}`
    );
    const data = await response.json();
    console.log(
      "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude
    );
    setDataFromApi(data);
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("error occured");
    }
  };

  return (
    <div className="App">
      <SearchBar
        WEATHER_API_KEY={WEATHER_API_KEY}
        getLocation={getLocation}
        update={update}
        getUserLocation={getUserLocation}
        getSearch={getSearch}
      />
      <GeoButtons GEOCODING_API_KEY={GEOCODING_API_KEY} />

      <DisplayDate />
      <h1>{`${kelvinToCelcius(dataFromApi && dataFromApi.main.temp)} °C`}</h1>
      <h3>
        {dataFromApi && dataFromApi.name},{" "}
        {dataFromApi && dataFromApi.sys.country}
      </h3>
      <SelectDay />
      <div>
        <h3>Sunrise: {dataFromApi && dataFromApi.sys.sunrise}</h3>
        <h3>Sunset: {dataFromApi && dataFromApi.sys.sunset}</h3>
        <h3>Precipitation: {dataFromApi && dataFromApi.main.humidity}</h3>
        <h3>Humidity: {dataFromApi && dataFromApi.weather.main}</h3>
      </div>
      <AdditionalStats />
    </div>
  );
}

export default App;
