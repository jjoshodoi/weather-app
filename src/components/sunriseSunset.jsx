import React from "react";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";

const SunriseSunset = ({ oneCallDataFromApi, tomorrow }) => {
  const epochToDate = (num) => {
    var d = new Date(num * 1000); // The 0 there is the key, which sets the date to the epoch
    return d;
  };

  //   console.log(
  //     oneCallDataFromApi && epochToDate(oneCallDataFromApi.current.sunrise)
  //   );

  return (
    <div>
      {(() => {
        switch (tomorrow) {
          case false:
            return (
              <div id="footer" className="row center">
                <h3 className="column">
                <FiSunrise size = {25}/> Sunrise:{" "}
                  {oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.current.sunrise).getHours()}
                  :
                  {oneCallDataFromApi &&
                    epochToDate(
                      oneCallDataFromApi.current.sunrise
                    ).getMinutes()}
                  :
                  {oneCallDataFromApi &&
                    epochToDate(
                      oneCallDataFromApi.current.sunrise
                    ).getSeconds()}
                </h3>
                <h3 className="column">
                <FiSunset size = {25}/> Sunset:{" "}
                  {oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.current.sunset).getHours()}
                  :
                  {oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.current.sunset).getMinutes()}
                  :
                  {oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.current.sunset).getSeconds()}
                </h3>
                <h3 className="column">
                <WiHumidity size = {30}/>  Humidity:{" "}
                  {oneCallDataFromApi && oneCallDataFromApi.current.humidity}%
                </h3>
              </div>
            );
          default:
            return (
              <div id="footer" className="row center">
                <h3 className="column">
                <FiSunrise size = {25}/> Sunrise:{" "}
                  {oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.daily[1].sunrise).getHours()}
                  :
                  {oneCallDataFromApi &&
                    epochToDate(
                      oneCallDataFromApi.daily[1].sunrise
                    ).getMinutes()}
                  :
                  {oneCallDataFromApi &&
                    epochToDate(
                      oneCallDataFromApi.daily[1].sunrise
                    ).getSeconds()}
                </h3>
                <h3 className="column">
                  <FiSunset size = {25}/> Sunset:{" "}
                  {oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.daily[1].sunset).getHours()}
                  :
                  {oneCallDataFromApi &&
                    epochToDate(
                      oneCallDataFromApi.daily[1].sunset
                    ).getMinutes()}
                  :
                  {oneCallDataFromApi &&
                    epochToDate(
                      oneCallDataFromApi.daily[1].sunset
                    ).getSeconds()}
                </h3>
                <h3 className="column">
                <WiHumidity size = {30}/> 
                Humidity:{" "}
                  {oneCallDataFromApi && oneCallDataFromApi.daily[1].humidity}%
                </h3>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default SunriseSunset;
