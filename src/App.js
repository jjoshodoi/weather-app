import "./App.css";
import { useEffect, useState } from "react";
import Location from "./Locations";
import SearchBar from "./components/search";
import DisplayDate from "./components/displayDate";
import SelectDay from "./components/selectDay";
import GeoButtons from "./components/geoButtons";
import AdditionalStats from "./components/additionalStats";

function App() {
  //hide api keys
  const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;
  const GEOCODING_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  const [longnitude, setLongnitude] = useState(["-0.1257"]);
  const [latitude, setLatitude] = useState(["51.5085"]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("London");
  // store our data from api in this
  const [cwDataFromApi, setCWDataFromApi] = useState(null);
  const [oneCallDataFromApi, setOneCallDataFromApi] = useState(null);

  /// SEARCH CODE
  useEffect(() => {
    getLocation(); //Need to add weather for next 7 days,
  }, [query]);

  const getLocation = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${WEATHER_API_KEY}`
    );
    // Check here if the response is valid
    if (response.ok) {
      const data = await response.json();
      await setLongnitude(data.coord.lon);
      await setLatitude(data.coord.lat);
      await setCWDataFromApi(data);
      callOneCall();
    } else {
      alert("Enter a valid Location");
    }
  };

  const callOneCall = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longnitude}&exclude=daily,minutely&appid=${WEATHER_API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setOneCallDataFromApi(data);
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

  // Gets current position of user and calls showPosition
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Didn't work");
    }
  };

  // Fetches Location given a longnitude and latitude
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
    setCWDataFromApi(data);
  };

  // Errors for when the Location fails. Gets called getUserLocation
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
      <Location
        cwDataFromApi={cwDataFromApi}
        oneCallDataFromApi={oneCallDataFromApi}
      />
    </div>
  );
}

export default App;
