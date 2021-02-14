import React from "react";
import SelectDay from "./components/selectDay";

const Next7DaysView = ({
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

export default Next7DaysView;
