import React from "react";

const SelectDay = ({ setCurrentView }) => {
  return (
    //Should we Reset day back to Today when they search.
    <div>
      <button onClick={() => setCurrentView("Today")}>Today</button>
      <button onClick={() => setCurrentView("TomorrowLocationView")}>
        Tomorrow
      </button>
      <button onClick={() => setCurrentView("Next7DaysView")}>
        Next 7 Days
      </button>
    </div>
  );
};

export default SelectDay;
