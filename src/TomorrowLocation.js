import React from "react";
import SelectDay from "./components/selectDay";
import DisplayDate from "./components/displayDate";

import TempByHour from "./components/tempTiles/tempByHour";
import DisplayTemp from "./components/displayTemp";

const TomorrowLocation = ({
  cwDataFromApi,
  oneCallDataFromApi,
  setCurrentView,
  kelvinToCelcius,
  tomorrow,
  currentView,
}) => {
  return (
    <div className="location">
      {/* <GeoButtons GEOCODING_API_KEY={GEOCODING_API_KEY} /> */}

      <DisplayDate tomorrow={tomorrow} />
      <DisplayTemp
        tomorrow={tomorrow}
        oneCallDataFromApi={oneCallDataFromApi}
        cwDataFromApi={cwDataFromApi}
        kelvinToCelcius={kelvinToCelcius}
      />
      <SelectDay
        currentView={currentView}
        setCurrentView={setCurrentView}
        tomorrow={tomorrow}
      />
      {/* Temp By Hour will be done starting from 0 depending on country. */}
      <TempByHour
        oneCallDataFromApi={oneCallDataFromApi}
        kelvinToCelcius={kelvinToCelcius}
        tomorrow={tomorrow}
      />
    </div>
  );
};

export default TomorrowLocation;
