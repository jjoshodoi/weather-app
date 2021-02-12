import React from "react";
import SearchBar from "./components/search";
import DisplayDate from "./components/displayDate";
import SelectDay from "./components/selectDay";
import GeoButtons from "./components/geoButtons";
import AdditionalStats from "./components/additionalStats";

const Location = ({ dataFromApi }) => {
  // Change from Kelvin to Degrees Celcius
  const kelvinToCelcius = (num) => {
    num = num - 273;
    return Math.round(num);
  };

  return (
    <div className="location">
      {/* <GeoButtons GEOCODING_API_KEY={GEOCODING_API_KEY} /> */}

      <DisplayDate />
      <h1>{`${kelvinToCelcius(dataFromApi && dataFromApi.main.temp)} °C`}</h1>
      <h3>
        {dataFromApi && dataFromApi.name},{" "}
        {dataFromApi && dataFromApi.sys.country}
      </h3>
      <SelectDay />
      <div>
        <h3>Sunrise: {dataFromApi && dataFromApi.sys.sunrise}</h3>
        <h3>Sunset: {dataFromApi && dataFromApi.sys.sunset}</h3>
        <h3>Precipitation: {dataFromApi && dataFromApi.main.humidity}</h3>
        <h3>Humidity: {dataFromApi && dataFromApi.weather.main}</h3>
      </div>
      <AdditionalStats />
    </div>
  );
};

export default Location;
