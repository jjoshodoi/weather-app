import React from "react";
import DisplayDate from "./components/displayDate";
import SelectDay from "./components/selectDay";
// import GeoButtons from "./components/geoButtons";
import AdditionalStats from "./components/additionalStats";
import SunriseSunset from "./components/sunriseSunset";
import TempByHour from "./components/tempTiles/tempByHour";
import DisplayTemp from "./components/displayTemp";

const TodayLocation = ({
  cwDataFromApi,
  oneCallDataFromApi,
  setCurrentView,
  kelvinToCelcius,
  tomorrow,
}) => {
  const mainWeatherAttribute = [];
  if (oneCallDataFromApi !== undefined && oneCallDataFromApi != null) {
    oneCallDataFromApi.current.weather.map((item) =>
      mainWeatherAttribute.push(item.main)
    );
  }
  console.log(`Main Weather Attributes: ${mainWeatherAttribute}`);

  const findMainWeatherAttribute = (apiData) => {
    const listMainWeatherAttribute = [];
    if (apiData !== undefined && apiData != null) {
      apiData.current.weather.map((item) =>
        listMainWeatherAttribute.push(item.main)
      );
    } else {
      console.log("Failed to find main weather attribute");
    }
    return listMainWeatherAttribute;
  };

  return (
    <div className="location">
      {/* <GeoButtons GEOCODING_API_KEY={GEOCODING_API_KEY} /> */}

      <DisplayDate tomorrow={tomorrow} />
      <DisplayTemp
        oneCallDataFromApi={oneCallDataFromApi}
        cwDataFromApi={cwDataFromApi}
        kelvinToCelcius={kelvinToCelcius}
        tomorrow={tomorrow}
      />
      <SelectDay setCurrentView={setCurrentView} />
      <TempByHour
        findMainWeatherAttribute={findMainWeatherAttribute}
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

export default TodayLocation;
