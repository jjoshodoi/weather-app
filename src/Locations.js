import React from "react";
import DisplayDate from "./components/displayDate";
import SelectDay from "./components/selectDay";
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

  var weatherAttributeIcon = 
  oneCallDataFromApi && oneCallDataFromApi.current.weather[0].main;

  return (
    <div>
     
      <div className={`main-info-card-${color}`}>
        <DisplayDate tomorrow={tomorrow} />
        <div className = "iconformat">
      {(() => {
                  switch (weatherAttributeIcon) {
                    case "Clouds":
                      return (
                        <AiFillCloud 
                        size={700} color= "rgba(255, 255, 255, 0.219)"/>                
                      );
                    case "Rain":
                      return (
                        <IoRainy
                        size={700} color= "rgba(255, 255, 255, 0.219)"
                        />
                      );
                    case "Snow":
                      return (
                        <BiCloudSnow
                        size={700} color= "rgba(255, 255, 255, 0.219)"
                        />
                      );
                    case "Clear":
                      return (
                        <TiWeatherSunny
                        size={700} color= "rgba(255, 255, 255, 0.219)"
                        />
                      );
                      case "Mist":
                        return (
                        <RiMistFill 
                        size={700} color= "rgba(255, 255, 255, 0.219)"
                        />
                      );
                      case "Haze":
                        return (
                        <GiHeatHaze  
                        size={700} color= "rgba(255, 255, 255, 0.219)"
                        />
                      ); 
                    default:
                      return <div></div>;
                  }
                })()}
      </div>          

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
