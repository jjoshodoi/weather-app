import React from "react";

const DisplayTemp = ({
  kelvinToCelcius,
  oneCallDataFromApi,
  cwDataFromApi,
}) => {
  return (
    <div>
      <h1>{`${kelvinToCelcius(
        oneCallDataFromApi && oneCallDataFromApi.current.temp
      )} °C`}</h1>
      <h3>
        {cwDataFromApi && cwDataFromApi.name},{" "}
        {cwDataFromApi && cwDataFromApi.sys.country}
      </h3>
    </div>
  );
};

export default DisplayTemp;
