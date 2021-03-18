import React from "react";

const SelectDay = ({ currentView, setCurrentView }) => {
  return (
    //Should we Reset day back to Today when they search?
    <div className="select-day-padding">
      <button
        id={1}
        className={`pageButton${currentView === "Today" ? "-active" : ""}`}
        onClick={() => setCurrentView("Today")}
      >
        Today
      </button>
      <button
        id={2}
        className={`pageButton${
          currentView === "TomorrowLocationView" ? "-active" : ""
        }`}
        onClick={() => setCurrentView("TomorrowLocationView")}
      >
        Tomorrow
      </button>
      <button
        id={3}
        className={`pageButton${
          currentView === "Next7DaysView" ? "-active" : ""
        }`}
        onClick={() => setCurrentView("Next7DaysView")}
      >
        Next 7 Days
      </button>
    </div>
  );
};

export default SelectDay;
