import React from "react";
import SearchBar from "./components/search";
import DisplayDate from "./components/displayDate";
import SelectDay from "./components/selectDay";
import GeoButtons from "./components/geoButtons";
import AdditionalStats from "./components/additionalStats";
import SunriseSunset from "./components/sunriseSunset";
import TempByHour from "./components/tempTiles/tempByHour";

const Location = ({ cwDataFromApi, oneCallDataFromApi }) => {
  // Change from Kelvin to Degrees Celcius
  const kelvinToCelcius = (num) => {
    num = num - 273;
    return Math.round(num);
  };

  const mainWeatherAttribute = [];
  if (oneCallDataFromApi !== undefined && oneCallDataFromApi != null) {
    console.log(oneCallDataFromApi.current);
    oneCallDataFromApi.current.weather.map((item) =>
      mainWeatherAttribute.push(item.main)
    );
  }
  console.log(mainWeatherAttribute);
  if (mainWeatherAttribute.includes("Clear"))  {
    document.body.classList.add("background-warm");
    mainWeatherAttribute.pop();
    } else if (mainWeatherAttribute.includes("Clouds"))  {
    document.body.classList.add("background-cloudy"); // Need to remove hardcoding of London.
    mainWeatherAttribute.length = 0; // Problem where the array doesnt reset itself so background doesnt change.
  }
  return (
    <div className="location">
      {/* <GeoButtons GEOCODING_API_KEY={GEOCODING_API_KEY} /> */}

      <DisplayDate />
      <h1>{`${kelvinToCelcius(
        oneCallDataFromApi && oneCallDataFromApi.current.temp
      )} °C`}</h1>
      <h3>
        {cwDataFromApi && cwDataFromApi.name},{" "}
        {cwDataFromApi && cwDataFromApi.sys.country}
      </h3>
      <SelectDay />
      <TempByHour
        oneCallDataFromApi={oneCallDataFromApi}
        kelvinToCelcius={kelvinToCelcius}
      />

      <div>
        <SunriseSunset oneCallDataFromApi={oneCallDataFromApi} />
        <h3>
          Humidity: {oneCallDataFromApi && oneCallDataFromApi.current.humidity}
        </h3>
      </div>
      <AdditionalStats />
    </div>
  );
};

export default Location;
