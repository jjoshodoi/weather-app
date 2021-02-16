import React from "react";

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
    <div className="tile-border">
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
      </div>
      <div class = "center">{weatherAttributeForCard}</div>
      <div>{`${kelvinToCelcius(
        //Change key to be unique
        hour.temp
      )}°C`}</div>
    </div>
  );
};

export default TempCard;
