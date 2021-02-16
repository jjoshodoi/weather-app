import React from "react";
import SelectDay from "./components/selectDay";

const Next7DaysView = ({
  cwDataFromApi,
  oneCallDataFromApi,
  setCurrentView,
}) => {
  const d = new Date();
  const today = d.getDay() - 1;
  const days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  return (
    <div>
      <SelectDay setCurrentView={setCurrentView} />
      <div>
        <h1>Next 7 Days</h1>
        {oneCallDataFromApi &&
          oneCallDataFromApi.daily.slice(0, 8).map((day, index) => (
            <div key={index}>
              {index === 0
                ? "Today"
                : index === 1
                ? "Tomorrow"
                : today + index > 6
                ? days[today + index - 7]
                : days[today + index]}{" "}
              {day.weather[0].main} icon{" "}
              {`Highs: ${day.temp.max} Lows: ${day.temp.min}`}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Next7DaysView;
