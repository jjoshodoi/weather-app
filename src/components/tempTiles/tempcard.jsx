import React from "react";
import { BiCloudSnow } from "react-icons/bi";
import { AiFillCloud } from "react-icons/ai";
import { IoRainy } from "react-icons/io5";
import { TiWeatherSunny } from "react-icons/ti";

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
  var weatherAttributeForCard =
    oneCallDataFromApi && oneCallDataFromApi.hourly[indexNum].weather[0].main;

  return (
    <div>
          {(() => {
            switch (tomorrow) {
              case false:
                return indexNum === 0
                  ? "Now"
                  : currentHour + indexNum + timeDifference > 23
                  ? currentHour + indexNum + timeDifference - 24
                  : currentHour + indexNum + timeDifference;
              case true:
                return currentHour + indexNum + differenceFrom12AM - 24; // Returning 12am onwards
              default:
                return "N/A Times";
            }
          })()}

      <div className={`tile-border${indexNum === 0 ? "-now" : ""}`}>
        <div className="card">
          
          <div className = "center">
            {(() => {
            switch (weatherAttributeForCard) {
              case "Clouds":
                return  <AiFillCloud size={40} className={`icon-temptile${indexNum === 0 ? "-now" : ""}`}/>;   
              case "Rain":
                return  (
                  <div className="padding">
                    <IoRainy size={38} padding="15px" className={`icon-temptile${indexNum === 0 ? "-now" : ""}`}/>
                  </div>
                ); 
              case "Snow":
                return <BiCloudSnow size={40} className={`icon-temptile${indexNum === 0 ? "-now" : ""}`}/>  
              case "Clear":
                return <TiWeatherSunny size={40} className={`icon-temptile${indexNum === 0 ? "-now" : ""}`}/>  
            }
          })()}
          

          </div>
        </div>
        <div className = "center">
          <div className="padding-bottom">
          {`${kelvinToCelcius(
          //Change key to be unique
          hour.temp
        )}°C`}
        </div>
        </div>
      </div>
      </div>
  );
};

export default TempCard;
