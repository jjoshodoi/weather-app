import React from "react";
import { BiCloudSnow } from "react-icons/bi";
import { AiFillCloud } from "react-icons/ai";
import { IoRainy } from "react-icons/io5";
import { TiWeatherSunny } from "react-icons/ti";
import { RiMistFill } from "react-icons/ri";
import { GiHeatHaze } from "react-icons/gi";

import { connect } from "react-redux";

const TempCard = (props) => {
  console.log();
  // map every weather attribute in api

  if (props.indexNum === 0) {
    var weatherAttributeForCard =
      props.oneCallData && props.oneCallData.current.weather[0].main;
  } else {
    weatherAttributeForCard =
      props.oneCallData &&
      props.oneCallData.hourly[props.indexNum].weather[0].main;
  }

  var tempHour = props.currentHour;

  return (
    <div>
      {(() => {
        switch (props.tomorrow) {
          case false:
            if (tempHour + props.indexNum + props.timeDifference > 23) {
              tempHour =
                props.currentHour + props.indexNum + props.timeDifference - 24;
            } else if (
              props.currentHour + props.indexNum + props.timeDifference <
              0
            ) {
              tempHour =
                props.currentHour + props.indexNum + props.timeDifference + 24;
            } else {
              tempHour = props.currentHour + props.indexNum;
            }
            return props.indexNum === 0 ? <b>Now</b> : <b>{props.tempHour}</b>;
          case true:
            return (
              <b>
                {props.currentHour +
                  props.indexNum +
                  props.differenceFrom12AM -
                  24}
              </b>
            ); // Returning 12am onwards
          default:
            return "N/A Times";
        }
      })()}

      <div className={`tile-border${props.indexNum === 0 ? "-now" : ""}`}>
        <div className="card">
          <div className="center">
            {(() => {
              switch (weatherAttributeForCard) {
                case "Clouds":
                  return (
                    <div className="padding-bottom">
                      <AiFillCloud
                        color="#bfc5c7"
                        size={40}
                        className={`icon-temptile${
                          props.indexNum === 0 ? "-now" : ""
                        }`}
                      />
                    </div>
                  );
                case "Rain":
                  return (
                    <div className="padding">
                      <IoRainy
                        color="#a6d5e3"
                        size={38}
                        padding="15px"
                        className={`icon-temptile${
                          props.indexNum === 0 ? "-now" : ""
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
                          props.indexNum === 0 ? "-now" : ""
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
                          props.indexNum === 0 ? "-now" : ""
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
                          props.indexNum === 0 ? "-now" : ""
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
                          props.indexNum === 0 ? "-now" : ""
                        }`}
                      />
                    </div>
                  );
                default:
                  return <h4>{weatherAttributeForCard}</h4>;
              }
            })()}
          </div>
        </div>
        <div className="center">
          <b>{`${props.kelvinToCelcius(props.hour.temp)}°C`}</b>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    oneCallData: state.apiReducer.oneCallData,
  };
};

export default connect(mapStateToProps)(TempCard);
// export default TempCard;
