import React from "react";
import { BiCloudSnow } from "react-icons/bi";
import { AiFillCloud } from "react-icons/ai";
import { IoRainy } from "react-icons/io5";
import { TiWeatherSunny } from "react-icons/ti";

const DisplayTemp = ({
  kelvinToCelcius,
  oneCallDataFromApi,
  cwDataFromApi,
  tomorrow,
}) => {
  // Morning 8am
  const morning = 8;
  // Day 12pm
  const afternoon = 12;
  // Evening 6pm
  const evening = 18;
  // Night 10pm
  const night = 22;

  const currentHour = new Date().getHours();
  const differenceFrom12AM = 24 - currentHour;
  // console.log(differenceFrom12AM);

  const indexNum = 0;

  var weatherAttributeForMorning =
    oneCallDataFromApi && oneCallDataFromApi.hourly[(differenceFrom12AM+morning)].weather[0].main;

    var weatherAttributeForAfternoon =
    oneCallDataFromApi && oneCallDataFromApi.hourly[(differenceFrom12AM+morning)].weather[0].main;

    var weatherAttributeForEvening =
    oneCallDataFromApi && oneCallDataFromApi.hourly[(differenceFrom12AM+morning)].weather[0].main;

  return (
    <div>
      {(() => {
        switch (tomorrow) {
          case false:
            return (
              <div>
                <h1>{`${kelvinToCelcius(
                  oneCallDataFromApi && oneCallDataFromApi.current.temp
                )} °C`}</h1>
                <h4>{`Feels Like ${kelvinToCelcius(
                  oneCallDataFromApi && oneCallDataFromApi.current.feels_like
                )}°C`}</h4>
                <h3>
                  {oneCallDataFromApi &&
                    oneCallDataFromApi.current.weather[0].main}
                </h3>
              </div>
            );
          default:
            return (
              <div>
                <h3>
                  {cwDataFromApi && cwDataFromApi.name},{" "}
                  {cwDataFromApi && cwDataFromApi.sys.country}
                </h3>
                <div className="center">
                  <div className="tile-border">
                    <div className="center">Morning</div>
                    <div>
                      {`${kelvinToCelcius(
                        oneCallDataFromApi &&
                          oneCallDataFromApi.daily[1].temp.morn
                      )} °C`}
                      <div className="center">
                        {(() => {
                          switch (weatherAttributeForMorning) {
                            case "Clouds":
                              return (
                                <AiFillCloud
                                  size="4x"
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              );
                            case "Rain":
                              return (
                                <IoRainy
                                  size="4x"
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              );
                            case "Snow":
                              return (
                                <BiCloudSnow
                                  size="4x"
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              );
                            case "Clear":
                              return (
                                <TiWeatherSunny
                                  size="4x"
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              );
                            default:
                              return (
                                <h4 className="center">
                                  {oneCallDataFromApi &&
                                    oneCallDataFromApi.hourly[
                                      differenceFrom12AM + morning
                                    ].weather[0].main}
                                </h4>
                              );
                          }
                        })()}
                      </div>
                      <h5>{`Feels Like ${kelvinToCelcius(
                        oneCallDataFromApi &&
                          oneCallDataFromApi.daily[1].feels_like.morn
                      )}°C`}</h5>
                    </div>
                  </div>
                  <div className="tile-border">
                    <div className="center">Afternoon</div>
                    <div>
                      {`${kelvinToCelcius(
                        oneCallDataFromApi &&
                          oneCallDataFromApi.daily[1].temp.day
                      )} °C`}
                    </div>
                    <h4 className="center">
                      {oneCallDataFromApi &&
                        oneCallDataFromApi.hourly[
                          differenceFrom12AM + afternoon
                        ].weather[0].main}
                    </h4>
                    <h5>{`Feels Like ${kelvinToCelcius(
                      oneCallDataFromApi &&
                        oneCallDataFromApi.daily[1].feels_like.day
                    )}°C`}</h5>
                  </div>
                  <div className="tile-border">
                    <div className="center">Evening</div>
                    <div>
                      {`${kelvinToCelcius(
                        oneCallDataFromApi &&
                          oneCallDataFromApi.daily[1].temp.eve
                      )} °C`}
                    </div>
                    <h4 className="center">
                      {oneCallDataFromApi &&
                        oneCallDataFromApi.hourly[differenceFrom12AM + evening]
                          .weather[0].main}
                    </h4>
                    <h5>{`Feels Like ${kelvinToCelcius(
                      oneCallDataFromApi &&
                        oneCallDataFromApi.daily[1].feels_like.eve
                    )}°C`}</h5>
                  </div>
                  <div className="tile-border">
                    <div className="center">Night</div>
                    <div>
                      {`${kelvinToCelcius(
                        oneCallDataFromApi &&
                          oneCallDataFromApi.daily[1].temp.night
                      )} °C`}
                    </div>
                    <h4 className="center">
                      {oneCallDataFromApi &&
                        oneCallDataFromApi.hourly[differenceFrom12AM + night]
                          .weather[0].main}
                    </h4>
                    <h5>{`Feels Like ${kelvinToCelcius(
                      oneCallDataFromApi &&
                        oneCallDataFromApi.daily[1].feels_like.night
                    )}°C`}</h5>
                  </div>
                </div>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default DisplayTemp;
