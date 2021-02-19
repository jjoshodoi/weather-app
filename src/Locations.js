import React from "react";
import DisplayDate from "./components/displayDate";
import SelectDay from "./components/selectDay";
import SunriseSunset from "./components/sunriseSunset";
import TempByHour from "./components/tempTiles/tempByHour";
import DisplayTemp from "./components/displayTemp";
import { BiCloudSnow } from "react-icons/bi";
import { AiFillCloud } from "react-icons/ai";
import { IoRainy } from "react-icons/io5";
import { TiWeatherSunny } from "react-icons/ti";
import { RiMistFill } from "react-icons/ri";
import { GiHeatHaze } from "react-icons/gi";

const TodayLocation = ({
  cwDataFromApi,
  oneCallDataFromApi,
  setCurrentView,
  kelvinToCelcius,
  tomorrow,
  currentView,
  color,
}) => {
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
    <div>
      <div className={`main-info-card-${color}`}>
        <DisplayDate tomorrow={tomorrow} />
        {(() => {
                      switch (listMainWeatherAttribute[0].main) {
                        case "Clouds":
                          return <AiFillCloud size={40} />;
                        case "Rain":
                          return (
                            <div className="padding">
                              <IoRainy size={38} />
                            </div>
                          );
                        case "Snow":
                          return <BiCloudSnow size={40} />;
                        case "Clear":
                          return <TiWeatherSunny size={40} />;
                        case "Mist":
                          return <RiMistFill size ={40}/>;
                        case "Haze":
                          return <GiHeatHaze size = {40}/>;
                        default:
                          return <h3>N/A</h3>;
                      }
                    })()}
        <DisplayTemp
          oneCallDataFromApi={oneCallDataFromApi}
          cwDataFromApi={cwDataFromApi}
          kelvinToCelcius={kelvinToCelcius}
          tomorrow={tomorrow}
        />
      </div>
      <SelectDay setCurrentView={setCurrentView} currentView={currentView} />
      <TempByHour
        findMainWeatherAttribute={findMainWeatherAttribute}
        oneCallDataFromApi={oneCallDataFromApi}
        kelvinToCelcius={kelvinToCelcius}
        tomorrow={tomorrow}
      />
    </div>
  );
};

export default TodayLocation;
