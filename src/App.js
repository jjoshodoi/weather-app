import "./App.css";
import scriptLoader from "react-async-script-loader";
import { useEffect, useState, useReducer } from "react";
import TodayLocation from "./Locations";
import SearchBar from "./components/search";
import TomorrowLocation from "./TomorrowLocation";
import Next7DaysView from "./Next7Days";
import { MdFavorite } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { GrClear } from "react-icons/gr";
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

  const [nameOfLocation, setNameOfLocation] = useState("");

  // store the address from searchbar
  const [address, setAddress] = useState("");

  // store the favourites list
  const [favourites, setFavourites] = useState(() => {
    const localData = localStorage.getItem("favourites");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    getLocation();
  }, [query]);

  useEffect(() => {
    getUserLocation();
  }, []); // Option?

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addToFav = () => {
    // currentPlace = oneCallDataFromApi.
    if (!favourites.includes(nameOfLocation)) {
      setFavourites([...favourites, nameOfLocation]);
      console.log(`${nameOfLocation} added to favourites`);
    } else {
      alert("Already in favourites");
    }
  };

  // Clear Favourites
  const clearFavourites = () => {
    localStorage.clear();
    setFavourites([]);
  };

  // Update the search bar accordingly
  const handleChange = (value) => {
    setAddress(value);
  };

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
      const data = await response.json();
      setCWDataFromApi(data);
      await callOneCall(data.coord.lon, data.coord.lat);
      setNameOfLocation(`${data.name}, ${data.sys.country}`);
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
      // console.log(tempWeather);
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
    setNameOfLocation(`${data.name}, ${data.sys.country}`);

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

  const handleDropDownClick = (item) => {
    setQuery(item);
  };
  // if (
  //   mainWeatherAttribute.includes("Clear") && //Needs to be redone so instead outputs image, for the background aswell as color.
  //   kelvinToCelcius(oneCallDataFromApi && oneCallDataFromApi.current.temp) > 16
  // ) {
  //   document.body.className = "background-warm";
  //   mainWeatherAttribute.splice(0, mainWeatherAttribute.length);
  // } else if (mainWeatherAttribute.includes("Clouds")) {
  //   document.body.className = "background-cloudy";
  //   mainWeatherAttribute.splice(0, mainWeatherAttribute.length);
  // } else if (mainWeatherAttribute.includes("Clear")) {
  //   document.body.className = "background-clear";
  //   mainWeatherAttribute.splice(0, mainWeatherAttribute.length);
  // } else if (mainWeatherAttribute.includes("Rain")) {
  //   document.body.className = "background-rain";
  //   mainWeatherAttribute.splice(0, mainWeatherAttribute.length);
  // }
  // console.log(document.body.classList);

  if (oneCallDataFromApi && oneCallDataFromApi.current.temp) {
    if (kelvinToCelcius(oneCallDataFromApi.current.temp) >= 10) {
      var lightness = 100 - kelvinToCelcius(oneCallDataFromApi.current.temp);
      document.body.style.backgroundColor = `hsla(20,100%,${lightness}%,0.9)`;
    } else if (kelvinToCelcius(oneCallDataFromApi.current.temp) < 10) {
      lightness = 50 + kelvinToCelcius(oneCallDataFromApi.current.temp);
      document.body.style.backgroundColor = `hsla(180,50%,${lightness}%,0.6)`;
    }
  }
  //`linear-gradient(179.31deg, hsla(${hue},${saturation},${lightness}) 9.28%, #F4AC4E 167.45%)`;
  // console.log(oneCallDataFromApi);

  if (isScriptLoadSucceed && isScriptLoaded) {
    return (
      <div className="App">
        <SearchBar
          getUserLocation={getUserLocation}
          getSearch={getSearch}
          handleChange={handleChange}
          handleSelect={handleSelect}
          address={address}
        />
        <div>
          <MdFavorite onClick={addToFav} />
          <span>Add to Fav</span>
        </div>

        <div>
          <GrClear onClick={clearFavourites} />
          <span>Clear All Favs</span>
        </div>

        <div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              View Favourites
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {favourites.length === 0 ? (
                <Dropdown.Item>
                  <button>Nothing In Favourites</button>
                </Dropdown.Item>
              ) : (
                favourites.map((item) => (
                  <Dropdown.Item>
                    <button onClick={() => handleDropDownClick(item)}>
                      {item}
                    </button>
                  </Dropdown.Item>
                ))
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* switch to select relevant page  */}
        {(() => {
          switch (currentView) {
            case "TomorrowLocationView":
              return (
                <TomorrowLocation
                  cwDataFromApi={cwDataFromApi}
                  oneCallDataFromApi={oneCallDataFromApi}
                  setCurrentView={setCurrentView}
                  currentView={currentView}
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
                  currentView={currentView}
                />
              );
            default:
              return (
                <TodayLocation
                  cwDataFromApi={cwDataFromApi}
                  oneCallDataFromApi={oneCallDataFromApi}
                  setCurrentView={setCurrentView}
                  kelvinToCelcius={kelvinToCelcius}
                  currentView={currentView}
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
