import React from "react";

const TempByHour = ({ oneCallDataFromApi, kelvinToCelcius }) => {
  const currentHour = new Date().getHours();
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
                : currentHour + index > 23
                ? currentHour + index - 24
                : currentHour + index}
            </div>
            <div>icon</div>
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
