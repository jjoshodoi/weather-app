import React from "react";

const TempByHour = ({
  oneCallDataFromApi,
  kelvinToCelcius,
  findMainWeatherAttribute,
}) => {
  const currentHour = new Date().getHours();

  const timeDifference =
    oneCallDataFromApi && oneCallDataFromApi.timezone_offset / 3600;

  console.log(timeDifference);
  return (
    <div className="temp-tile">
      {oneCallDataFromApi &&
        oneCallDataFromApi.hourly.slice(0, 24).map((
          hour,
          index //How many values are we to display
        ) => (
          <div className="tile-border">
            <div className="card">
              {index === 0
                ? "Now"
                : currentHour + index + timeDifference > 23
                ? currentHour + index + timeDifference - 24
                : currentHour + index + timeDifference}
            </div>
            <div>{findMainWeatherAttribute(oneCallDataFromApi)}</div>
            <div>{`${kelvinToCelcius(
              //Change key to be unique
              hour.temp
            )}°C`}</div>
          </div>
        ))}
    </div>
  );
};

export default TempByHour;
