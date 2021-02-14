import React from "react";
import SelectDay from "./components/selectDay";

const TomorrowLocation = ({
  cwDataFromApi,
  oneCallDataFromApi,
  setCurrentView,
}) => {
  return (
    <div>
      <SelectDay setCurrentView={setCurrentView} />
    </div>
  );
};

export default TomorrowLocation;
