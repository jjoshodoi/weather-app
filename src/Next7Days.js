import React from "react";
import SelectDay from "./components/selectDay";
import { BiCloudSnow } from "react-icons/bi";
import { AiFillCloud } from "react-icons/ai";
import { IoRainy } from "react-icons/io5";
import { TiWeatherSunny } from "react-icons/ti";

const Next7DaysView = ({
  cwDataFromApi,
  kelvinToCelcius,
  oneCallDataFromApi,
  setCurrentView,
  currentView,
}) => {
  const d = new Date();
  const today = d.getDay() - 1;
  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  return (
    <div>
      <h1>Next 7 Days</h1>
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
                        return <AiFillCloud size="1x" />;
                      case "Rain":
                        return <IoRainy size="1x" />;
                      case "Snow":
                        return <BiCloudSnow size="1x" />;
                      case "Clear":
                        return <TiWeatherSunny size="1x" />;
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
      <SelectDay setCurrentView={setCurrentView} currentView={currentView} />
    </div>
  );
};

export default Next7DaysView;
