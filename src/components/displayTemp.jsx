import React from "react";
import { BiCloudSnow } from "react-icons/bi";
import { AiFillCloud } from "react-icons/ai";
import { IoRainy } from "react-icons/io5";
import { TiWeatherSunny } from "react-icons/ti";
import { RiMistFill } from "react-icons/ri";
import { GiHeatHaze } from "react-icons/gi";

import { connect } from "react-redux";

const DisplayTemp = (props) => {
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

  const indexNum = 0;

  var weatherAttributeForMorning =
    props.oneCallData &&
    props.oneCallData.hourly[differenceFrom12AM + morning].weather[0].main;

  var weatherAttributeForAfternoon =
    props.oneCallData &&
    props.oneCallData.hourly[differenceFrom12AM + afternoon].weather[0].main;

  var weatherAttributeForEvening =
    props.oneCallData &&
    props.oneCallData.hourly[differenceFrom12AM + evening].weather[0].main;

  var weatherAttributeForNight =
    props.oneCallData &&
    props.oneCallData.hourly[differenceFrom12AM + night].weather[0].main;

  return (
    <div>
      {(() => {
        switch (props.tomorrow) {
          case false:
            return (
              <div>
                <h3>
                  {props.cwData && props.cwData.name},{" "}
                  {props.cwData && props.cwData.sys.country}
                </h3>
                <h1>{`${props.kelvinToCelcius(
                  props.oneCallData && props.oneCallData.current.temp
                )}°C`}</h1>
                <h5>{`Feels Like ${props.kelvinToCelcius(
                  props.oneCallData && props.oneCallData.current.feels_like
                )}°C`}</h5>
                <h3>
                  {props.oneCallData &&
                    props.oneCallData.current.weather[0].main}
                </h3>
              </div>
            );
          case true:
            return (
              <div>
                <h3>
                  {props.cwData && props.cwData.name},{" "}
                  {props.cwData && props.cwData.sys.country}
                </h3>
                <div className="center">
                  <div className="tile-border">
                    <div id="morningtext">Morning</div>
                    <div>
                      <b>
                        {" "}
                        {`${props.kelvinToCelcius(
                          props.oneCallData &&
                            props.oneCallData.daily[1].temp.morn
                        )}°C`}{" "}
                      </b>
                      <div className="center">
                        {(() => {
                          switch (weatherAttributeForMorning) {
                            case "Clouds":
                              return (
                                <div className="padding-bottom">
                                  <AiFillCloud
                                    color="#bfc5c7"
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
                                    color="#a6d5e3"
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
                                    color="#f5bd56"
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
                                    color="#d6d5d2"
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
                                    size={40}
                                    className={`icon-temptile${
                                      indexNum === 0 ? "-now" : ""
                                    }`}
                                  />
                                </div>
                              );
                            default:
                              return (
                                <h4 className="center">
                                  {props.oneCallData &&
                                    props.oneCallData.hourly[
                                      differenceFrom12AM + morning
                                    ].weather[0].main}
                                </h4>
                              );
                          }
                        })()}
                      </div>
                      <h5>{`Feels Like ${props.kelvinToCelcius(
                        props.oneCallData &&
                          props.oneCallData.daily[1].feels_like.morn
                      )}°C`}</h5>
                    </div>
                  </div>
                  <div className="tile-border">
                    <div id="afternoontext">Afternoon</div>
                    <div>
                      <b>
                        {" "}
                        {`${props.kelvinToCelcius(
                          props.oneCallData &&
                            props.oneCallData.daily[1].temp.day
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
                                  color="#bfc5c7"
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
                                  color="#a6d5e3"
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
                                  color="#f5bd56"
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
                                  color="#d6d5d2"
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
                                  color="#406d7a"
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                          default:
                            return (
                              <h4 className="center">
                                {props.oneCallData &&
                                  props.oneCallData.hourly[
                                    differenceFrom12AM + afternoon
                                  ].weather[0].main}
                              </h4>
                            );
                        }
                      })()}
                    </div>
                    <h5>{`Feels Like ${props.kelvinToCelcius(
                      props.oneCallData &&
                        props.oneCallData.daily[1].feels_like.day
                    )}°C`}</h5>
                  </div>
                  <div className="tile-border">
                    <div id="eveningtext">Evening</div>
                    <div>
                      <b>
                        {" "}
                        {`${props.kelvinToCelcius(
                          props.oneCallData &&
                            props.oneCallData.daily[1].temp.eve
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
                                  color="#bfc5c7"
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
                                  color="#a6d5e3"
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
                                  color="#f5bd56"
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
                                  color="#d6d5d2"
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
                                  color="#406d7a"
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                          default:
                            return (
                              <h4 className="center">
                                {props.oneCallData &&
                                  props.oneCallData.hourly[
                                    differenceFrom12AM + evening
                                  ].weather[0].main}
                              </h4>
                            );
                        }
                      })()}
                    </div>
                    <h5>{`Feels Like ${props.kelvinToCelcius(
                      props.oneCallData &&
                        props.oneCallData.daily[1].feels_like.eve
                    )}°C`}</h5>
                  </div>
                  <div className="tile-border">
                    <div id="nighttext">Night</div>
                    <div>
                      <b>
                        {" "}
                        {`${props.kelvinToCelcius(
                          props.oneCallData &&
                            props.oneCallData.daily[1].temp.night
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
                                  color="#bfc5c7"
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
                                  color="#a6d5e3"
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
                                  color="#f5bd56"
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
                                  color="#d6d5d2"
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
                                  color="#406d7a"
                                  size={40}
                                  className={`icon-temptile${
                                    indexNum === 0 ? "-now" : ""
                                  }`}
                                />
                              </div>
                            );
                          default:
                            return (
                              <h4 className="center">
                                {props.oneCallData &&
                                  props.oneCallData.hourly[
                                    differenceFrom12AM + night
                                  ].weather[0].main}
                              </h4>
                            );
                        }
                      })()}
                    </div>
                    {/* <h4 className="center">
                      {props.oneCallData &&
                        props.oneCallData.hourly[differenceFrom12AM + night]
                          .weather[0].main}
                    </h4> */}
                    <h5>{`Feels Like ${props.kelvinToCelcius(
                      props.oneCallData &&
                        props.oneCallData.daily[1].feels_like.night
                    )}°C`}</h5>
                  </div>
                </div>
              </div>
            );
          default:
            return "";
        }
      })()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    oneCallData: state.apiReducer.oneCallData,
    cwData: state.apiReducer.cwData,
  };
};

export default connect(mapStateToProps)(DisplayTemp);
