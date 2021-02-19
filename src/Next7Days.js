import React from "react";
import SelectDay from "./components/selectDay";
import { BiCloudSnow } from "react-icons/bi";
import { AiFillCloud } from "react-icons/ai";
import { IoRainy } from "react-icons/io5";
import { TiWeatherSunny } from "react-icons/ti";
import { RiMistFill } from "react-icons/ri";
import { GiHeatHaze } from "react-icons/gi";
import DisplayTemp from "./components/displayTemp";

const Next7DaysView = ({
  cwDataFromApi,
  kelvinToCelcius,
  oneCallDataFromApi,
  setCurrentView,
  currentView,
  color,
}) => {
  const d = new Date();
  const today = d.getDay() - 1;
  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  return (
    <div>
      <div className={`main-info-card-7days-${color}`}>
        <h1>Next 7 Days</h1>
        <div>
          <h3>
            {cwDataFromApi && cwDataFromApi.name},{" "}
            {cwDataFromApi && cwDataFromApi.sys.country}
          </h3>
        </div>
        <div className="center">
          <div className="temp-tile">
            {oneCallDataFromApi &&
              oneCallDataFromApi.daily.slice(0, 7).map((day, index) => (
                <div className="tile-border" key={index}>
                  <div className="center">
                    {today + index === today
                      ? "Today"
                      : index === 1
                      ? "Tomorrow"
                      : days[
                          today + index > 6 ? today + index - 7 : today + index
                        ]}{" "}
                  </div>
                  <div className="card">
                    {(() => {
                      switch (day.weather[0].main) {
                        case "Clouds":
                          return <AiFillCloud size={40} color = "#bfc5c7"/>;
                        case "Rain":
                          return (
                            <div className="padding">
                              <IoRainy size={38} color = "#a6d5e3"/>
                            </div>
                          );
                        case "Snow":
                          return <BiCloudSnow size={40} />;
                        case "Clear":
                          return <TiWeatherSunny size={40} color ="#f5bd56"/>;
                        case "Mist":
                          return <RiMistFill size ={40} color ="#d6d5d2"/>;
                        case "Haze":
                          return <GiHeatHaze size = {40} color ="#406d7a"/>;
                        default:
                          return <h3>N/A</h3>;
                      }
                    })()}
                  </div>
                  <h4>{`Highs: ${kelvinToCelcius(
                    day.temp.max
                  )}°C Lows: ${kelvinToCelcius(day.temp.min)}°C`}</h4>
                </div>
              ))}
          </div>
        </div>
      </div>
      <SelectDay setCurrentView={setCurrentView} currentView={currentView} />
    </div>
  );
};
export default Next7DaysView;
