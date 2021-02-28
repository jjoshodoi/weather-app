import "./App.css";
import "./sidenav.css";
import "./scrollbar.css";
import "./tempcard.css";

import scriptLoader from "react-async-script-loader";
import { useEffect, useState } from "react";

import TodayLocation from "./Locations";
import SunriseSunset from "./components/sunriseSunset";
import SearchBar from "./components/search";
import TomorrowLocation from "./TomorrowLocation";
import Next7DaysView from "./Next7Days";
import SideBar from "./components/sidebar";

import { GiHamburgerMenu } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { GrClear } from "react-icons/gr";

//hide api keys
const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;
const GEOCODING_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

function App({ isScriptLoaded, isScriptLoadSucceed }) {
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

  // Store current name of displayed city
  const [nameOfLocation, setNameOfLocation] = useState("");

  // store the address from searchbar
  const [address, setAddress] = useState("");

  const [sidebar, setSideBar] = useState(false);

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

  // updates favourities when favourites is updated
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Adds to list of favs
  const addToFav = () => {
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
      alert("Enter a valid Location");
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
      setMainWeatherAttribute(tempWeather[0]);
    } else {
      alert("Enter a valid Location");
    }
  };

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

  /*const getBackgroundColor = () => {();
  };*/
  if (oneCallDataFromApi && oneCallDataFromApi.current.temp) {
    if (kelvinToCelcius(oneCallDataFromApi.current.temp) >= 10) {
      var lightness = 90 - kelvinToCelcius(oneCallDataFromApi.current.temp);
      document.body.style.background = `linear-gradient(hsla(20,100%,${lightness}%,0.9),  hsla(360,50%,100%,0.9))`; //Warm
      var color = "red";
    } else if (
      kelvinToCelcius(oneCallDataFromApi.current.temp) > 0 &&
      kelvinToCelcius(oneCallDataFromApi.current.temp) < 10
    ) {
      lightness = 60 + kelvinToCelcius(oneCallDataFromApi.current.temp);
      document.body.style.background = `linear-gradient(hsla(200,50%,${lightness}%,0.8),  hsla(360,50%,100%,0.8))`; //Cold below 10degrees
      color = "blue";
    } else if (kelvinToCelcius(oneCallDataFromApi.current.temp) <= 0) {
      lightness = 40 + kelvinToCelcius(oneCallDataFromApi.current.temp);
      document.body.style.background = `linear-gradient(hsla(180,50%,${lightness}%,0.8),  hsla(360,50%,100%,0.8))`; //Freezing
      color = "lightskyblue";
    }
  }

  if (isScriptLoadSucceed && isScriptLoaded) {
    return (
      <div className="App">
        {/* <SideBar
          sidebar={sidebar}
          setSideBar={setSideBar}
          favourties={favourites}
          handleDropDownClick={handleDropDownClick}
          addToFav={addToFav}
          clearFavourites={clearFavourites}
        /> */}
        <div className={sidebar ? "sidenav" : "sidenav-inactive"}>
          <ul>
            <li>
              <button id="goBack" onClick={() => setSideBar(!sidebar)}>
                {<GrClear />} Close
              </button>
              <button id="title">Favourites</button>
            </li>
            {favourites.map((item) => (
              <li>
                <button onClick={() => handleDropDownClick(item)}>
                  {item}
                </button>
              </li>
            ))}
            <li>
              <button id="addCity" onClick={addToFav}>
                Add Current City
                <br />
                <MdFavorite className="white-icon" />
              </button>
            </li>
            <li>
              <button id="clearAll" onClick={clearFavourites}>
                Clear All <br />
                <GrClear className="white-icon" />
              </button>
            </li>
          </ul>
        </div>
        <div className={sidebar ? "content" : "content-expand"}>
          <GiHamburgerMenu
            size={35}
            className="top-left"
            onClick={() => setSideBar(!sidebar)}
          />
          <SearchBar
            getUserLocation={getUserLocation}
            getSearch={getSearch}
            handleChange={handleChange}
            handleSelect={handleSelect}
            address={address}
          />

          {(() => {
            switch (currentView) {
              case "TomorrowLocationView":
                return (
                  <div>
                    <TomorrowLocation
                      cwDataFromApi={cwDataFromApi}
                      oneCallDataFromApi={oneCallDataFromApi}
                      setCurrentView={setCurrentView}
                      currentView={currentView}
                      kelvinToCelcius={kelvinToCelcius}
                      tomorrow={true} // Use this value to see if we are looking for tomorrows data or not
                      color={color} // calls in color variable for border
                    />
                    <div>
                      <SunriseSunset
                        oneCallDataFromApi={oneCallDataFromApi}
                        tomorrow={true}
                        sidebar={sidebar}
                      />
                    </div>
                  </div>
                );
              case "Next7DaysView":
                return (
                  <Next7DaysView
                    cwDataFromApi={cwDataFromApi}
                    oneCallDataFromApi={oneCallDataFromApi}
                    setCurrentView={setCurrentView}
                    kelvinToCelcius={kelvinToCelcius}
                    currentView={currentView}
                    color={color}
                  />
                );
              default:
                return (
                  <div>
                    <TodayLocation
                      cwDataFromApi={cwDataFromApi}
                      oneCallDataFromApi={oneCallDataFromApi}
                      setCurrentView={setCurrentView}
                      kelvinToCelcius={kelvinToCelcius}
                      currentView={currentView}
                      tomorrow={false}
                      color={color}
                    />
                    <div className="location">
                      <SunriseSunset
                        oneCallDataFromApi={oneCallDataFromApi}
                        tomorrow={false}
                        sidebar={sidebar}
                      />
                    </div>
                  </div>
                );
            }
          })()}
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default scriptLoader([
  `https://maps.googleapis.com/maps/api/js?key=${GEOCODING_API_KEY}&libraries=places`,
])(App);
