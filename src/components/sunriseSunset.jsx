import React from "react";

const SunriseSunset = ({ oneCallDataFromApi }) => {
  const epochToDate = (num) => {
    var d = new Date(num * 1000); // The 0 there is the key, which sets the date to the epoch
    return d;
  };

  //   console.log(
  //     oneCallDataFromApi && epochToDate(oneCallDataFromApi.current.sunrise)
  //   );

  return (
    <div>
      <h3>
        Sunrise:
        {oneCallDataFromApi &&
          epochToDate(oneCallDataFromApi.current.sunrise).getHours()}
        :
        {oneCallDataFromApi &&
          epochToDate(oneCallDataFromApi.current.sunrise).getMinutes()}
        :
        {oneCallDataFromApi &&
          epochToDate(oneCallDataFromApi.current.sunrise).getSeconds()}
      </h3>
      <h3>
        Sunset:
        {oneCallDataFromApi &&
          epochToDate(oneCallDataFromApi.current.sunset).getHours()}
        :
        {oneCallDataFromApi &&
          epochToDate(oneCallDataFromApi.current.sunset).getMinutes()}
        :
        {oneCallDataFromApi &&
          epochToDate(oneCallDataFromApi.current.sunset).getSeconds()}
      </h3>
    </div>
  );
};

export default SunriseSunset;
