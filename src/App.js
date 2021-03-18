import "./App.css";
import "./sidenav.css";
import "./scrollbar.css";
import "./tempcard.css";

import { increment, toggle } from "./redux/reducers/sidebar/actions";
import * as actions from "./redux/actionTypes";

// import scriptLoader from "react-async-script-loader";
import { useEffect, useState } from "react";

import { getCurrentWeatherData, getCurrentForecast } from "./api/weather";
import TodayLocation from "./Locations";
import SunriseSunset from "./components/sunriseSunset";
import SearchBar from "./components/search";
import TomorrowLocation from "./TomorrowLocation";
import Next7DaysView from "./Next7Days";
import SideBar from "./components/sidebar/sidebar";

import { GiHamburgerMenu } from "react-icons/gi";
import { connect } from "react-redux";

//hide api keys
const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

function App(props) {
  // const [search, setSearch] = useState("");
  const [query, setQuery] = useState("London, UK");
  const [currentView, setCurrentView] = useState("Today");
  const [cwDataFromApi, setCWDataFromApi] = useState(null);
  const [oneCallDataFromApi, setOneCallDataFromApi] = useState(null);
  const [mainWeatherAttribute, setMainWeatherAttribute] = useState([]);
  const [nameOfLocation, setNameOfLocation] = useState("");
  const [address, setAddress] = useState("");
  // const [sidebar, setSideBar] = useState(false);

  const numberVariable = 3;

  // console.log(increment(3));

  const toggleSidebar = () => {
    // props.dispatch(increment(numberVariable));
    props.dispatch(toggle());
  };

  // store the favourites list
  const [favourites, setFavourites] = useState(() => {
    const localData = localStorage.getItem("favourites");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    getLocation();
  }, [props.address]);

  // useEffect(() => {
  //   getUserLocation();
  // }, []); // Option?

  // updates favourities when favourites is updated
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  // Adds to list of favs
  const handleAddToFavourite = () => {
    if (!favourites.includes(nameOfLocation)) {
      setFavourites([...favourites, nameOfLocation]);
      console.log(`${nameOfLocation} added to favourites`);
    } else {
      alert("Already in favourites");
    }
  };

  // Clear Favourites
  const handleClearFavourites = () => {
    localStorage.clear();
    setFavourites([]);
  };

  // Call the Weather API
  const getLocation = async () => {
    try {
      const currentWeatherData = await getCurrentWeatherData(props.address);
      setCWDataFromApi(currentWeatherData);
      setNameOfLocation(
        `${currentWeatherData.name}, ${currentWeatherData.sys.country}`
      );
      callOneCall(currentWeatherData.coord.lat, currentWeatherData.coord.lon);
    } catch (error) {
      alert("Enter a valid Location");
    }
  };

  // Call the One Call API
  const callOneCall = async (lat, lon) => {
    try {
      const currentForecast = await getCurrentForecast(lat, lon);
      setOneCallDataFromApi(currentForecast);
      setMainWeatherAttribute(currentForecast.current.weather[0].main);
    } catch (error) {
      alert("Enter a valid Location");
    }
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
    await callOneCall(data.coord.lat, data.coord.lon);
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

  const handleFavouriteClick = (favourite) => {
    setQuery(favourite);
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

  return (
    <div className="App">
      <h5>{props.count}</h5>
      <SideBar
        favourites={favourites}
        onAddToFavouriteClick={handleAddToFavourite}
        onClearFavourites={handleClearFavourites}
        onFavouriteClick={(favourite) => handleFavouriteClick(favourite)}
      />
      <div className={props.isSideOpen ? "content" : "content-expand"}>
        <GiHamburgerMenu
          size={35}
          className="top-left"
          onClick={toggleSidebar}
        />
        <SearchBar getUserLocation={getUserLocation} />

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
                      sidebar={props.isSideOpen}
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
                      sidebar={props.sideBarOpen}
                    />
                  </div>
                </div>
              );
          }
        })()}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isSideOpen: state.sidebarReducer.isSideOpen,
    count: state.counterReducer.count,
    favourites: state.sidebarReducer.localData,
    address: state.searchReducer.address,
  };
};

export default connect(mapStateToProps)(App);
