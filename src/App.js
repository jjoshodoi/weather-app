import "./App.css";
import scriptLoader from "react-async-script-loader";
import { useEffect, useState } from "react";
import TodayLocation from "./Locations";
import SearchBar from "./components/search";
import TomorrowLocation from "./TomorrowLocation";
import Next7DaysView from "./Next7Days";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function App({ isScriptLoaded, isScriptLoadSucceed }) {
  //hide api keys
  const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;
  const GEOCODING_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  // const [search, setSearch] = useState("");
  const [query, setQuery] = useState("London, UK");

  // Select relevant Page View
  const [currentView, setCurrentView] = useState("Today");

  // store our data from api in this
  const [cwDataFromApi, setCWDataFromApi] = useState(null);

  // store data from one call api
  const [oneCallDataFromApi, setOneCallDataFromApi] = useState(null);

  // store the main weather attribute
  const [mainWeatherAttribute, setMainWeatherAttribute] = useState([]);

  // store the address from searchbar
  const [address, setAddress] = useState("");

  // store the current contents of history locations
  // const [historyLocations, setHistoryLocations] = useState([]);

  // store an updated list of history locations
  // const [updatedHistoryLocations, setUpdatedHistoryLocations] = useState(() => [
  //   localStorage.getItem("history"),
  // ]);

  // store list of favourites
  const [favourites, setFavourites] = useState(() => [
    localStorage.getItem("favourites"),
  ]);

  useEffect(() => {
    getLocation();
  }, [query]);

  useEffect(() => {
    getUserLocation();
  }, []); // Option?

  // useEffect(() => {
  //   getHistory();
  // }, []);

  // useEffect(() => {
  //   writeHistory();
  // }, [updatedHistoryLocations]);

  useEffect(() => {
    readFavourites();
  }, []);

  useEffect(() => {
    writeIntoFavourites
  })

  // Clear History
  const clearFavourites = () => {
    localStorage.clear();
  };

  // localStorage - Read
  const readFavourites = () => {
    setFavourites(localStorage.getItem("favourites"));
  };

  // localStorage - Writes
  const writeIntoFavourites = () => {
    if (!favourites.includes(query)) {
      setFavourites((currentFavs) => [...currentFavs, query]);
    }
  };

  console.log("Favourites: ", favourites);

  // clearFavourites();

  // Update the search bar accordingly
  const handleChange = (value) => {
    setAddress(value);
  };

  // Get current history
  // const getHistory = () => {
  //   if (localStorage.getItem("history") != null) {
  //     setHistoryLocations(localStorage.getItem("history"));
  //   }
  //   console.log("Can't Read Favourites if Empty");
  // };

  // write into history
  // const writeHistory = () => {
  //   console.log(historyLocations, updatedHistoryLocations);
  //   localStorage.setItem("history", updatedHistoryLocations);
  //   setHistoryLocations(updatedHistoryLocations);
  // };

  // Set address and Set Query, set address to empty after making it equal to query
  const handleSelect = async (value) => {
    setAddress(value);
    setQuery(value);
    setAddress("");
  };
  // Call the Weather API
  const getLocation = async () => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${WEATHER_API_KEY}`
    );
    // Check here if the response is valid
    if (response.ok) {
      // if (!updatedHistoryLocations.includes(query)) {
      //   setUpdatedHistoryLocations((historyLocations) => [
      //     ...historyLocations,
      //     query,
      //   ]);
      // }
      const data = await response.json();
      setCWDataFromApi(data);
      await callOneCall(data.coord.lon, data.coord.lat);
    } else {
      alert("Enter a valid Location 2");
    }
  };
  // Call the One Call API
  const callOneCall = async (lon, lat) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${WEATHER_API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      setOneCallDataFromApi(data);
      const tempWeather = [];
      data.current.weather.map((item) => tempWeather.push(item.main));
      console.log(tempWeather);
      setMainWeatherAttribute(tempWeather);
    } else {
      alert("Enter a valid Location");
    }
  };
  // Updates search variable with value in search bar
  // const update = (e) => {
  //   setSearch(e.target.value);
  // };
  // Runs onSubmit to get the value of search, then resets value
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(address);
    setAddress("");
  };

  // Gets current position of user and calls showPosition
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Failed to GeoLocate");
    }
  };

  // Fetches Location given a longnitude and latitude
  const showPosition = async (position) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${WEATHER_API_KEY}`
    );
    const data = await response.json();
    await callOneCall(data.coord.lon, data.coord.lat);
    // console.log(
    //   "Latitude: " +
    //     position.coords.latitude +
    //     "<br>Longitude: " +
    //     position.coords.longitude
    // );
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

  // Change Kelvin to Celcius
  const kelvinToCelcius = (num) => {
    num = num - 273;
    return Math.round(num);
  };

  if (
    mainWeatherAttribute.includes("Clear") &&
    kelvinToCelcius(oneCallDataFromApi && oneCallDataFromApi.current.temp) > 16
  ) {
    document.body.className = "background-warm";
    mainWeatherAttribute.splice(0, mainWeatherAttribute.length);
  } else if (mainWeatherAttribute.includes("Clouds")) {
    document.body.className = "background-cloudy";
    mainWeatherAttribute.splice(0, mainWeatherAttribute.length);
  } else if (mainWeatherAttribute.includes("Clear")) {
    document.body.className = "background-clear";
    mainWeatherAttribute.splice(0, mainWeatherAttribute.length);
  } else if (mainWeatherAttribute.includes("Rain")) {
    document.body.className = "background-rain";
    mainWeatherAttribute.splice(0, mainWeatherAttribute.length);
  }
  console.log(document.body.classList);

  if (isScriptLoadSucceed && isScriptLoaded) {
    return (
      <div className="App">
        <SearchBar
          // WEATHER_API_KEY={WEATHER_API_KEY}
          // getLocation={getLocation}
          // update={update}
          getUserLocation={getUserLocation}
          getSearch={getSearch}
          handleChange={handleChange}
          handleSelect={handleSelect}
          address={address}
        />
        <button onClick={writeIntoFavourites}>Add To Favourites</button>

        {/* <DropdownButton
          id="dropdown-split-variants-primary"
          title="Favourite Locations"
        >
          <div>
            {favourites.map((item) => (
              <Dropdown.Item>{item}</Dropdown.Item>
            ))}
          </div>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </DropdownButton> */}

        {/* switch to select relevant page  */}
        {(() => {
          switch (currentView) {
            case "TomorrowLocationView":
              return (
                <TomorrowLocation
                  cwDataFromApi={cwDataFromApi}
                  oneCallDataFromApi={oneCallDataFromApi}
                  setCurrentView={setCurrentView}
                  kelvinToCelcius={kelvinToCelcius}
                  tomorrow={true} // Use this value to see if we are looking for tomorrows data or not
                />
              );
            case "Next7DaysView":
              return (
                <Next7DaysView
                  cwDataFromApi={cwDataFromApi}
                  oneCallDataFromApi={oneCallDataFromApi}
                  setCurrentView={setCurrentView}
                  kelvinToCelcius={kelvinToCelcius}
                />
              );
            default:
              return (
                <TodayLocation
                  cwDataFromApi={cwDataFromApi}
                  oneCallDataFromApi={oneCallDataFromApi}
                  setCurrentView={setCurrentView}
                  kelvinToCelcius={kelvinToCelcius}
                  tomorrow={false}
                />
              );
          }
        })()}
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
])(App);
