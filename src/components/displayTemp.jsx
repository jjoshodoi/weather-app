import React from "react";
import { BiCloudSnow } from "react-icons/bi";
import { AiFillCloud } from "react-icons/ai";
import { IoRainy } from "react-icons/io5";
import { TiWeatherSunny } from "react-icons/ti";
import { RiMistFill } from "react-icons/ri";
import { GiHeatHaze } from "react-icons/gi";

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
    oneCallDataFromApi &&
    oneCallDataFromApi.hourly[differenceFrom12AM + morning].weather[0].main;

  var weatherAttributeForAfternoon =
    oneCallDataFromApi &&
    oneCallDataFromApi.hourly[differenceFrom12AM + afternoon].weather[0].main;

  var weatherAttributeForEvening =
    oneCallDataFromApi &&
    oneCallDataFromApi.hourly[differenceFrom12AM + evening].weather[0].main;

  var weatherAttributeForNight =
    oneCallDataFromApi &&
    oneCallDataFromApi.hourly[differenceFrom12AM + night].weather[0].main;

  return (
    <div>
      {(() => {
        switch (tomorrow) {
          case false:
            return (
              <div>
                <h3>
                  {cwDataFromApi && cwDataFromApi.name},{" "}
                  {cwDataFromApi && cwDataFromApi.sys.country}
                </h3>
                <h1>{`${kelvinToCelcius(
                  oneCallDataFromApi && oneCallDataFromApi.current.temp
                )}°C`}</h1>
                <h5>{`Feels Like ${kelvinToCelcius(
                  oneCallDataFromApi && oneCallDataFromApi.current.feels_like
                )}°C`}</h5>
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
                    <div id="morningtext">Morning</div>
                    <div>
                      <b>
                        {" "}
                        {`${kelvinToCelcius(
                          oneCallDataFromApi &&
                            oneCallDataFromApi.daily[1].temp.morn
                        )}°C`}{" "}
                      </b>
                      <div className="center">
                        {(() => {
                          switch (weatherAttributeForMorning) {
                            case "Clouds":
                              return (
                                <div className="padding-bottom">
                                  <AiFillCloud
                                    size={40}
                                    className={`icon-temptile${
                                      indexNum === 0 ? "-now" : ""
                                    }`}
                                  />
                                </div>
                              );
                            case "Rain":
                              return (
                                <div className="padding">
                                  <IoRainy
                                    size={40}
                                    className={`icon-temptile${
                                      indexNum === 0 ? "-now" : ""
                                    }`}
                                  />
                                </div>
                              );
                            case "Snow":
                              return (
                                <div className="padding-bottom">
                                  <BiCloudSnow
                                    size={40}
                                    className={`icon-temptile${
                                      indexNum === 0 ? "-now" : ""
                                    }`}
                                  />
                                </div>
                              );
                            case "Clear":
                              return (
                                <div className="padding-bottom">
                                  <TiWeatherSunny
                                    size={40}
                                    className={`icon-temptile${
                                      indexNum === 0 ? "-now" : ""
                                    }`}
                                  />
                                </div>
                              );
                              case "Mist":
                                return (
                                  <div className="padding-bottom"> 
                                    <RiMistFill 
                                    size={40}
                                    className={`icon-temptile${
                                      indexNum === 0 ? "-now" : ""
                                    }`}
                                  />
                                </div>
                              );
                              case "Haze":
                                return (
                                  <div className="padding-bottom">
                                    <GiHeatHaze 
                                    size = {40}
                                    className={`icon-temptile${
                                      indexNum === 0 ? "-now" : ""
                                    }`}
                                    />
                                  </div>
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
                    <div id="afternoontext">Afternoon</div>
                    <div>
                      <b>
                        {" "}
                        {`${kelvinToCelcius(
                          oneCallDataFromApi &&
                            oneCallDataFromApi.daily[1].temp.day
                        )}°C`}{" "}
                      </b>
                    </div>
                    <div className="center">
                      {(() => {
                        switch (weatherAttributeForAfternoon) {
                          case "Clouds":
                            return (
                              <div className="padding-bottom">
                                <AiFillCloud
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                          case "Rain":
                            return (
                              <div className="padding">
                                <IoRainy
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                          case "Snow":
                            return (
                              <div className="padding-bottom">
                                <BiCloudSnow
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                          case "Clear":
                            return (
                              <div className="padding-bottom">
                                <TiWeatherSunny
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                            case "Mist":
                              return (
                                <div className="padding-bottom"> 
                                  <RiMistFill 
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                            case "Haze":
                              return (
                                <div className="padding-bottom">
                                  <GiHeatHaze 
                                  size = {40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                  />
                                </div>
                              );  
                          default:
                            return (
                              <h4 className="center">
                                {oneCallDataFromApi &&
                                  oneCallDataFromApi.hourly[
                                    differenceFrom12AM + afternoon
                                  ].weather[0].main}
                              </h4>
                            );
                        }
                      })()}
                    </div>
                    <h5>{`Feels Like ${kelvinToCelcius(
                      oneCallDataFromApi &&
                        oneCallDataFromApi.daily[1].feels_like.day
                    )}°C`}</h5>
                  </div>
                  <div className="tile-border">
                    <div id="eveningtext">Evening</div>
                    <div>
                      <b>
                        {" "}
                        {`${kelvinToCelcius(
                          oneCallDataFromApi &&
                            oneCallDataFromApi.daily[1].temp.eve
                        )}°C`}{" "}
                      </b>
                    </div>
                    {/* <h4 className="center">
                      {oneCallDataFromApi &&
                        oneCallDataFromApi.hourly[differenceFrom12AM + evening]
                          .weather[0].main}
                    </h4> */}
                    <div className="center">
                      {(() => {
                        switch (weatherAttributeForEvening) {
                          case "Clouds":
                            return (
                              <div className="padding-bottom">
                                <AiFillCloud
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                          case "Rain":
                            return (
                              <div className="padding">
                                <IoRainy
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                          case "Snow":
                            return (
                              <div className="padding-bottom">
                                <BiCloudSnow
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                          case "Clear":
                            return (
                              <div className="padding-bottom">
                                <TiWeatherSunny
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                            case "Mist":
                              return (
                                <div className="padding-bottom"> 
                                  <RiMistFill 
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                            case "Haze":
                              return (
                                <div className="padding-bottom">
                                  <GiHeatHaze 
                                  size = {40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                  />
                                </div>
                              );  
                          default:
                            return (
                              <h4 className="center">
                                {oneCallDataFromApi &&
                                  oneCallDataFromApi.hourly[
                                    differenceFrom12AM + evening
                                  ].weather[0].main}
                              </h4>
                            );
                        }
                      })()}
                    </div>
                    <h5>{`Feels Like ${kelvinToCelcius(
                      oneCallDataFromApi &&
                        oneCallDataFromApi.daily[1].feels_like.eve
                    )}°C`}</h5>
                  </div>
                  <div className="tile-border">
                    <div id="nighttext">Night</div>
                    <div>
                      <b>
                        {" "}
                        {`${kelvinToCelcius(
                          oneCallDataFromApi &&
                            oneCallDataFromApi.daily[1].temp.night
                        )}°C`}{" "}
                      </b>
                    </div>
                    <div className="center">
                      {(() => {
                        switch (weatherAttributeForNight) {
                          case "Clouds":
                            return (
                              <div className="padding-bottom">
                                <AiFillCloud
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                          case "Rain":
                            return (
                              <div className="padding">
                                <IoRainy
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                          case "Snow":
                            return (
                              <div className="padding-bottom">
                                <BiCloudSnow
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                          case "Clear":
                            return (
                              <div className="padding-bottom">
                                <TiWeatherSunny
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                            case "Mist":
                              return (
                                <div className="padding-bottom"> 
                                  <RiMistFill 
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                            case "Haze":
                              return (
                                <div className="padding-bottom">
                                  <GiHeatHaze 
                                  size = {40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                  />
                                </div>
                            );  
                          default:
                            return (
                              <h4 className="center">
                                {oneCallDataFromApi &&
                                  oneCallDataFromApi.hourly[
                                    differenceFrom12AM + night
                                  ].weather[0].main}
                              </h4>
                            );
                        }
                      })()}
                    </div>
                    {/* <h4 className="center">
                      {oneCallDataFromApi &&
                        oneCallDataFromApi.hourly[differenceFrom12AM + night]
                          .weather[0].main}
                    </h4> */}
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
