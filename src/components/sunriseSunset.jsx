import React from "react";

import { connect } from "react-redux";

import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

const SunriseSunset = (props) => {
  const epochToDate = (num) => {
    var d = new Date(num * 1000); // The 0 there is the key, which sets the date to the epoch
    return d;
  };

  var timeDifference = 0;
  var currentSunriseHours = 0;
  var currentSunriseMinutes = 0;
  var currentSunriseSeconds = 0;
  var currentSunsetHours = 0;
  var currentSunsetMinutes = 0;
  var currentSunsetSeconds = 0;

  var tomorrowSunriseHours = 0;
  var tomorrowSunriseMinutes = 0;
  var tomorrowSunriseSeconds = 0;
  var tomorrowSunsetHours = 0;
  var tomorrowSunsetMinutes = 0;
  var tomorrowSunsetSeconds = 0;

  if (props.oneCallData) {
    timeDifference = props.cwData && props.cwData.timezone / 3600;
    const currentSunrise = epochToDate(props.oneCallData.current.sunrise);
    const currentSunset = epochToDate(props.oneCallData.current.sunset);
    const tomorrowSunrise = epochToDate(props.oneCallData.daily[1].sunrise);
    const tomorrowSunset = epochToDate(props.oneCallData.daily[1].sunset);

    // Today's Info
    currentSunriseHours = currentSunrise.getHours() + timeDifference;
    if (currentSunriseHours > 23) {
      currentSunriseHours -= 24;
    }
    if (currentSunriseHours < 0) {
      currentSunriseHours += 24;
    }
    currentSunriseMinutes = currentSunrise.getMinutes() + timeDifference;
    currentSunriseSeconds = currentSunrise.getSeconds() + timeDifference;
    currentSunsetHours = currentSunset.getHours() + timeDifference;
    if (currentSunsetHours > 23) {
      currentSunsetHours -= 24;
    }
    if (currentSunsetHours < 0) {
      currentSunsetHours += 24;
    }
    currentSunsetMinutes = currentSunset.getMinutes() + timeDifference;
    currentSunsetSeconds = currentSunset.getSeconds() + timeDifference;
    // Tomorrow's Info
    tomorrowSunriseHours = tomorrowSunrise.getHours() + timeDifference;
    if (tomorrowSunriseHours > 23) {
      tomorrowSunriseHours -= 24;
    }
    if (tomorrowSunriseHours < 0) {
      tomorrowSunriseHours += 24;
    }
    tomorrowSunriseMinutes = tomorrowSunrise.getMinutes() + timeDifference;
    tomorrowSunriseSeconds = tomorrowSunrise.getSeconds() + timeDifference;
    tomorrowSunsetHours = tomorrowSunset.getHours() + timeDifference;
    if (tomorrowSunsetHours > 23) {
      tomorrowSunsetHours -= 24;
    }
    if (tomorrowSunsetHours < 0) {
      tomorrowSunsetHours += 24;
    }
    tomorrowSunsetMinutes = tomorrowSunset.getMinutes() + timeDifference;
    tomorrowSunsetSeconds = tomorrowSunset.getSeconds() + timeDifference;
  }

  var currentListOfHours = [
    currentSunriseHours,
    currentSunriseMinutes,
    currentSunriseSeconds,
    currentSunsetHours,
    currentSunsetMinutes,
    currentSunsetSeconds,
  ];
  var tomorrowListOfHours = [
    tomorrowSunriseHours,
    tomorrowSunriseMinutes,
    tomorrowSunriseSeconds,
    tomorrowSunsetHours,
    tomorrowSunsetMinutes,
    tomorrowSunsetSeconds,
  ];
  console.log(timeDifference);
  console.log(currentListOfHours);

  return (
    <div>
      {(() => {
        switch (props.tomorrow) {
          case false:
            return (
              <div
                id={props.isSideOpen ? "footer" : "footer-expand"}
                className="row center"
              >
                <h3 className="column">
                  <FiSunrise size={25} /> Sunrise:{" "}
                  {`0${currentListOfHours[0]}`.slice(-2)}:
                  {`0${currentListOfHours[1]}`.slice(-2)}:
                  {`0${currentListOfHours[2]}`.slice(-2)}
                </h3>
                <h3 className="column">
                  <FiSunset size={25} /> Sunset:{" "}
                  {`0${currentListOfHours[3]}`.slice(-2)}:
                  {`0${currentListOfHours[4]}`.slice(-2)}:
                  {`0${currentListOfHours[5]}`.slice(-2)}
                </h3>
                <h3 className="column">
                  <WiHumidity size={30} /> Humidity:{" "}
                  {props.oneCallData && props.oneCallData.current.humidity}%
                </h3>
                <h3 className="column">
                  <WiStrongWind size={30} />
                  Wind:{" "}
                  {props.oneCallData && props.oneCallData.current.wind_speed}
                  mph
                </h3>
              </div>
            );
          default:
            return (
              <div
                id={props.isSideOpen ? "footer" : "footer-expand"}
                className="row center"
              >
                <h3 className="column">
                  <FiSunrise size={25} /> Sunrise:{" "}
                  {`0${tomorrowListOfHours[0]}`.slice(-2)}:
                  {`0${tomorrowListOfHours[1]}`.slice(-2)}:
                  {`0${tomorrowListOfHours[2]}`.slice(-2)}
                </h3>
                <h3 className="column">
                  <FiSunset size={25} /> Sunset:{" "}
                  {`0${tomorrowListOfHours[3]}`.slice(-2)}:
                  {`0${tomorrowListOfHours[4]}`.slice(-2)}:
                  {`0${tomorrowListOfHours[5]}`.slice(-2)}
                </h3>
                <h3 className="column">
                  <WiHumidity size={30} />
                  Humidity:{" "}
                  {props.oneCallData && props.oneCallData.daily[1].humidity}%
                </h3>{" "}
                <h3 className="column">
                  <WiStrongWind size={30} />
                  Wind:{" "}
                  {props.oneCallData && props.oneCallData.daily[1].wind_speed}
                  mph
                </h3>
              </div>
            );
        }
      })()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cwData: state.apiReducer.cwData,
    oneCallData: state.apiReducer.oneCallData,
    isSideOpen: state.sidebarReducer.isSideOpen,
  };
};

export default connect(mapStateToProps)(SunriseSunset);
