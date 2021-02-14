import React from "react";

const TempCard = ({
  indexNum,
  hour,
  timeDifference,
  currentHour,
  oneCallDataFromApi,
  kelvinToCelcius,
}) => {
  // map every weather attribute in api
  var weatherAttributeForCard =
    oneCallDataFromApi && oneCallDataFromApi.hourly[indexNum].weather[0].main;

  return (
    <div className="tile-border">
      <div className="card">
        {indexNum === 0
          ? "Now"
          : currentHour + indexNum + timeDifference > 23
          ? currentHour + indexNum + timeDifference - 24
          : currentHour + indexNum + timeDifference}
      </div>
      <div>{weatherAttributeForCard}</div>
      <div>{`${kelvinToCelcius(
        //Change key to be unique
        hour.temp
      )}°C`}</div>
    </div>
  );
};

export default TempCard;
