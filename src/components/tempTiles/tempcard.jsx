import React from "react";
import { BiCloudSnow } from "react-icons/bi";
import { AiFillCloud } from "react-icons/ai";
import { IoRainy } from "react-icons/io5";
import { TiWeatherSunny } from "react-icons/ti";
import { RiMistFill } from "react-icons/ri";
import { GiHeatHaze } from "react-icons/gi";

const TempCard = ({
  indexNum,
  hour,
  timeDifference,
  currentHour,
  oneCallDataFromApi,
  kelvinToCelcius,
  differenceFrom12AM,
  tomorrow,
}) => {
  // map every weather attribute in api

  if (indexNum === 0) {
    var weatherAttributeForCard =
      oneCallDataFromApi && oneCallDataFromApi.current.weather[0].main;
  } else {
    weatherAttributeForCard =
      oneCallDataFromApi && oneCallDataFromApi.hourly[indexNum].weather[0].main;
  }

  return (
    <div>
      {(() => {
        switch (tomorrow) {
          case false:
            if (currentHour + indexNum + timeDifference > 23) {
              currentHour = currentHour + indexNum + timeDifference - 24;
            } else if (currentHour + indexNum + timeDifference < 0) {
              currentHour = currentHour + indexNum + timeDifference + 24;
            } else {
              currentHour = currentHour + indexNum;
            }
            return indexNum === 0 ? <b>Now</b> : <b>{currentHour}</b>;
          case true:
            return <b>{currentHour + indexNum + differenceFrom12AM - 24}</b>; // Returning 12am onwards
          default:
            return "N/A Times";
        }
      })()}

      <div className={`tile-border${indexNum === 0 ? "-now" : ""}`}>
        <div className="card">
          <div className="center">
            {(() => {
              switch (weatherAttributeForCard) {
                case "Clouds":
                  return (
                    <div className="padding-bottom">
                      <AiFillCloud
                        color = "#bfc5c7"
                        size={40}
                        className={`icon-temptile${
                          indexNum === 0 ? "-now" : ""
                        }`}
                      />
                    </div>
                  );
                case "Rain":
                  return (
                    <div className="padding">
                      <IoRainy
                        color = "#a6d5e3"
                        size={38}
                        padding="15px"
                        className={`icon-temptile${
                          indexNum === 0 ? "-now" : ""
                        }`}
                      />
                    </div>
                  );
                case "Snow":
                  return (
                    <div className="padding-bottom">
                      <BiCloudSnow
                        size={40}
                        className={`icon-temptile${
                          indexNum === 0 ? "-now" : ""
                        }`}
                      />
                    </div>
                  );
                case "Clear":
                  return (
                    <div className="padding-bottom">
                      <TiWeatherSunny
                        color = "#f5bd56"
                        size={40}
                        className={`icon-temptile${
                          indexNum === 0 ? "-now" : ""
                        }`}
                      />
                    </div>
                  );
                case "Mist":
                  return (
                    <div className="padding-bottom">
                      <RiMistFill
                        color ="#d6d5d2"
                        size={40}
                        className={`icon-temptile${
                          indexNum === 0 ? "-now" : ""
                        }`}
                      />
                    </div>
                  );
                case "Haze":
                  return (
                    <div className="padding-bottom">
                      <GiHeatHaze
                        color ="#406d7a"
                        size={40}
                        className={`icon-temptile${
                          indexNum === 0 ? "-now" : ""
                        }`}
                      />
                    </div>
                  );
                default:
                  return <h4>{weatherAttributeForCard}</h4>;
              }
            })()}
          </div>
        </div>
        <div className="center">
          <b>
            {`${kelvinToCelcius(
              //Change key to be unique
              hour.temp
            )}°C`}
          </b>
        </div>
      </div>
    </div>
  );
};

export default TempCard;
