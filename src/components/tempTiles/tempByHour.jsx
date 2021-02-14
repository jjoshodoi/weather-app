import React from "react";
import TempCard from "./tempcard";

const TempByHour = ({
  oneCallDataFromApi,
  kelvinToCelcius,
  findMainWeatherAttribute,
}) => {
  const currentHour = new Date().getHours();

  const timeDifference =
    oneCallDataFromApi && oneCallDataFromApi.timezone_offset / 3600;

  // var weatherAttributeForCard = findMainWeatherAttribute(oneCallDataFromApi);
  return (
    <div className="temp-tile">
      {oneCallDataFromApi &&
        oneCallDataFromApi.hourly.slice(0, 24).map((
          hour,
          index //How many values are we to display
        ) => (
          <TempCard
            key={index} // Uniquely identify each Card we make
            indexNum={index}
            hour={hour}
            currentHour={currentHour}
            timeDifference={timeDifference}
            oneCallDataFromApi={oneCallDataFromApi}
            kelvinToCelcius={kelvinToCelcius}
          />
        ))}
    </div>
  );
};

export default TempByHour;
