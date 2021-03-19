import "./App.css";
import "./components/sidebar/sidebar.css";
import "./scrollbar.css";
import "./tempcard.css";

import { connect } from "react-redux";

import { increment, toggle } from "./redux/reducers/sidebar/actions";
import { updateAddress } from "./redux/reducers/search/actions";
import { updateCWData, updateOneCallData } from "./redux/reducers/api/actions";

import { useEffect, useState } from "react";

import { getCurrentWeatherData, getCurrentForecast } from "./api/weather";

import TodayLocation from "./screens/Today";
import SunriseSunset from "./components/sunriseSunset";
import SearchBar from "./components/search";
import TomorrowLocation from "./screens/TomorrowLocation";
import Next7DaysView from "./screens/Next7Days";
import SideBar from "./components/sidebar/sidebar";

import { GiHamburgerMenu } from "react-icons/gi";

//hide api keys
const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

function App(props) {
  const [mainWeatherAttribute, setMainWeatherAttribute] = useState([]);
  const [nameOfLocation, setNameOfLocation] = useState("");

  // const numberVariable = 3;
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

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const handleAddToFavourite = () => {
    if (!favourites.includes(nameOfLocation)) {
      setFavourites([...favourites, nameOfLocation]);
      console.log(`${nameOfLocation} added to favourites`);
    } else {
      alert("Already in favourites");
    }
  };

  const handleClearFavourites = () => {
    localStorage.clear();
    setFavourites([]);
  };

  const getLocation = async () => {
    try {
      const currentWeatherData = await getCurrentWeatherData(props.address);
      props.dispatch(updateCWData(currentWeatherData));
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
      props.dispatch(updateOneCallData(currentForecast));
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
    props.dispatch(updateCWData(data));
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
    props.dispatch(updateAddress(favourite));
  };

  if (props.oneCallData && props.oneCallData.current.temp) {
    if (kelvinToCelcius(props.oneCallData.current.temp) >= 10) {
      var lightness = 90 - kelvinToCelcius(props.oneCallData.current.temp);
      document.body.style.background = `linear-gradient(hsla(20,100%,${lightness}%,0.9),  hsla(360,50%,100%,0.9))`; //Warm
      var color = "red";
    } else if (
      kelvinToCelcius(props.oneCallData.current.temp) > 0 &&
      kelvinToCelcius(props.oneCallData.current.temp) < 10
    ) {
      lightness = 60 + kelvinToCelcius(props.oneCallData.current.temp);
      document.body.style.background = `linear-gradient(hsla(200,50%,${lightness}%,0.8),  hsla(360,50%,100%,0.8))`; //Cold below 10degrees
      color = "blue";
    } else if (kelvinToCelcius(props.oneCallData.current.temp) <= 0) {
      lightness = 40 + kelvinToCelcius(props.oneCallData.current.temp);
      document.body.style.background = `linear-gradient(hsla(180,50%,${lightness}%,0.8),  hsla(360,50%,100%,0.8))`; //Freezing
      color = "lightskyblue";
    }
  }

  return (
    <div className="App">
      {/* <h5>{props.count}</h5> */}
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
          switch (props.view) {
            case "tomorrow":
              return (
                <div>
                  <TomorrowLocation
                    cwDataFromApi={props.cwData}
                    oneCallDataFromApi={props.oneCallData}
                    kelvinToCelcius={kelvinToCelcius}
                    tomorrow={true} // Use this value to see if we are looking for tomorrows data or not
                    color={color} // calls in color variable for border
                  />
                  <div>
                    <SunriseSunset
                      oneCallDataFromApi={props.oneCallData}
                      tomorrow={true}
                      sidebar={props.isSideOpen}
                    />
                  </div>
                </div>
              );
            case "week":
              return (
                <Next7DaysView
                  cwDataFromApi={props.cwData}
                  oneCallDataFromApi={props.oneCallData}
                  kelvinToCelcius={kelvinToCelcius}
                  color={color}
                />
              );
            default:
              return (
                <div>
                  <TodayLocation
                    cwDataFromApi={props.cwData}
                    oneCallDataFromApi={props.oneCallData}
                    kelvinToCelcius={kelvinToCelcius}
                    tomorrow={false}
                    color={color}
                  />
                  <div className="location">
                    <SunriseSunset
                      tomorrow={false}
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
    view: state.viewReducer.currentView,
    cwData: state.apiReducer.cwData,
    oneCallData: state.apiReducer.oneCallData,
  };
};

export default connect(mapStateToProps)(App);
