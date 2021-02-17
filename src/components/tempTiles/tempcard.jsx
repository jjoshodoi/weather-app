import React from "react";
import { FaSnowflake } from "react-icons/fa";

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
    <div className={`tile-border${indexNum === 0 ? "-now" : ""}`}>
      <div className="card">
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
        <div>
          <FaSnowflake
            className={`icon-temptile${indexNum === 0 ? "-now" : ""}`}
          />
        </div>
      </div>
      <div className="center">{weatherAttributeForCard}</div>
      <div>{`${kelvinToCelcius(
        //Change key to be unique
        hour.temp
      )}°C`}</div>
    </div>
  );
};

export default TempCard;
