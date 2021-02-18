import React from "react";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";

const SunriseSunset = ({ oneCallDataFromApi, tomorrow, sidebar }) => {
  const epochToDate = (num) => {
    var d = new Date(num * 1000); // The 0 there is the key, which sets the date to the epoch
    return d;
  };

  //   console.log(
  //     oneCallDataFromApi && epochToDate(oneCallDataFromApi.current.sunrise)
  //   );

  return (
    <div>
      {(() => {
        switch (tomorrow) {
          case false:
            return (
              <div
                id={sidebar ? "footer" : "footer-expand"}
                className="row center"
              >
                <h3 className="column">
                  <FiSunrise size={25} /> Sunrise:{" "}
                  {`0${
                    oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.current.sunrise).getHours()
                  }`.slice(-2)}
                  :
                  {`0${
                    oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.current.sunrise).getMinutes()
                  }`.slice(-2)}
                  :
                  {`0${
                    oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.current.sunrise).getSeconds()
                  }`.slice(-2)}
                </h3>
                <h3 className="column">
                  <FiSunset size={25} /> Sunset:{" "}
                  {`0${
                    oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.current.sunset).getHours()
                  }`.slice(-2)}
                  :
                  {`0${
                    oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.current.sunset).getMinutes()
                  }`.slice(-2)}
                  :
                  {`0${
                    oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.current.sunset).getSeconds()
                  }`.slice(-2)}
                </h3>
                <h3 className="column">
                  <WiHumidity size={30} /> Humidity:{" "}
                  {oneCallDataFromApi && oneCallDataFromApi.current.humidity}%
                </h3>
              </div>
            );
          default:
            return (
              <div
                id={sidebar ? "footer" : "footer-expand"}
                className="row center"
              >
                <h3 className="column">
                  <FiSunrise size={25} /> Sunrise:{" "}
                  {`0${
                    oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.daily[1].sunrise).getHours()
                  }`.slice(-2)}
                  :
                  {`0${
                    oneCallDataFromApi &&
                    epochToDate(
                      oneCallDataFromApi.daily[1].sunrise
                    ).getMinutes()
                  }`.slice(-2)}
                  :
                  {`0${
                    oneCallDataFromApi &&
                    epochToDate(
                      oneCallDataFromApi.daily[1].sunrise
                    ).getSeconds()
                  }`.slice(-2)}
                </h3>
                <h3 className="column">
                  <FiSunset size={25} /> Sunset:{" "}
                  {`0${
                    oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.daily[1].sunset).getHours()
                  }`.slice(-2)}
                  :
                  {`0${
                    oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.daily[1].sunset).getMinutes()
                  }`.slice(-2)}
                  :
                  {`0${
                    oneCallDataFromApi &&
                    epochToDate(oneCallDataFromApi.daily[1].sunset).getSeconds()
                  }`.slice(-2)}
                </h3>
                <h3 className="column">
                  <WiHumidity size={30} />
                  Humidity:{" "}
                  {oneCallDataFromApi && oneCallDataFromApi.daily[1].humidity}%
                </h3>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default SunriseSunset;
