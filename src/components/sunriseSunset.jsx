import React from "react";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

const SunriseSunset = ({ oneCallDataFromApi, tomorrow, sidebar }) => {
  const epochToDate = (num) => {
    var d = new Date(num * 1000); // The 0 there is the key, which sets the date to the epoch
    return d;
  };

  const timeDifference =
    oneCallDataFromApi && oneCallDataFromApi.timezone_offset / 3600;
  console.log(timeDifference);
  // todays hours
  var currentSunriseHours =
    oneCallDataFromApi &&
    epochToDate(oneCallDataFromApi.current.sunrise).getHours() + timeDifference;
  var currentSunriseMinutes =
    oneCallDataFromApi &&
    epochToDate(oneCallDataFromApi.current.sunrise).getMinutes() +
      timeDifference;
  var currentSunriseSeconds =
    oneCallDataFromApi &&
    epochToDate(oneCallDataFromApi.current.sunrise).getSeconds() +
      timeDifference;
  var currentSunsetHours =
    oneCallDataFromApi &&
    epochToDate(oneCallDataFromApi.current.sunset).getHours() + timeDifference;
  var currentSunsetMinutes =
    oneCallDataFromApi &&
    epochToDate(oneCallDataFromApi.current.sunset).getMinutes() +
      timeDifference;
  var currentSunsetSeconds =
    oneCallDataFromApi &&
    epochToDate(oneCallDataFromApi.current.sunset).getSeconds() +
      timeDifference;

  //tomorrows hours
  var tomorrowSunriseHours =
    oneCallDataFromApi &&
    epochToDate(oneCallDataFromApi.daily[1].sunrise).getHours() +
      timeDifference;
  var tomorrowSunriseMinutes =
    oneCallDataFromApi &&
    epochToDate(oneCallDataFromApi.daily[1].sunrise).getMinutes() +
      timeDifference;
  var tomorrowSunriseSeconds =
    oneCallDataFromApi &&
    epochToDate(oneCallDataFromApi.daily[1].sunrise).getSeconds() +
      timeDifference;
  var tomorrowSunsetHours =
    oneCallDataFromApi &&
    epochToDate(oneCallDataFromApi.daily[1].sunset).getHours() + timeDifference;
  var tomorrowSunsetMinutes =
    oneCallDataFromApi &&
    epochToDate(oneCallDataFromApi.daily[1].sunset).getMinutes() +
      timeDifference;
  var tomorrowSunsetSeconds =
    oneCallDataFromApi &&
    epochToDate(oneCallDataFromApi.daily[1].sunset).getSeconds() +
      timeDifference;

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

  if (oneCallDataFromApi) {
    for (let index = 0; index < currentListOfHours.length; index++) {
      if (currentListOfHours[index] > 23) {
        currentListOfHours[index] = -24;
      }
      if (currentListOfHours[index] < 0) {
        currentListOfHours[index] = +24;
      }
    }
    for (let index = 0; index < tomorrowListOfHours.length; index++) {
      if (tomorrowListOfHours[index] > 23) {
        tomorrowListOfHours[index] = -24;
      }
      if (tomorrowListOfHours[index] < 0) {
        tomorrowListOfHours[index] = +24;
      }
    }
  }

  return (
    <div>
      {(() => {
        switch (tomorrow) {
          case false:
            return (
              <div
                id={sidebar ? "footer" : "footer-expand"}
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
                  {oneCallDataFromApi && oneCallDataFromApi.current.humidity}%
                </h3>
                <h3 className="column">
                  <WiStrongWind size={30} />
                  Wind:{" "}
                  {oneCallDataFromApi && oneCallDataFromApi.current.wind_speed}
                  mph
                </h3>
              </div>
            );
          default:
            return (
              <div
                id={sidebar ? "footer" : "footer-expand"}
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
                  {oneCallDataFromApi && oneCallDataFromApi.daily[1].humidity}%
                </h3>{" "}
                <h3 className="column">
                  <WiStrongWind size={30} />
                  Wind:{" "}
                  {oneCallDataFromApi && oneCallDataFromApi.daily[1].wind_speed}
                  mph
                </h3>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default SunriseSunset;
