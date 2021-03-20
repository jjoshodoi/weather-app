import React from "react";
import TempCard from "./tempcard";

import { connect } from "react-redux";

const TempByHour = (props) => {
  // Finds Current Hour
  const currentHour = new Date().getHours();
  // Finds hours from now to 12AM
  const differenceFrom12AM = 24 - currentHour;

  const timeDifference =
    props.oneCallData && props.oneCallData.timezone_offset / 3600;

  // var weatherAttributeForCard = findMainWeatherAttribute(props.oneCallData);
  return (
    <div className="temp-tile">
      {(() => {
        switch (props.tomorrow) {
          case false:
            return (
              props.oneCallData &&
              props.oneCallData.hourly.slice(0, 24).map((
                hour,
                index //increment with the card
              ) => (
                <TempCard
                  key={index} // Uniquely identify each Card we make
                  indexNum={index}
                  hour={hour}
                  currentHour={currentHour}
                  timeDifference={timeDifference}
                  kelvinToCelcius={props.kelvinToCelcius}
                  differenceFrom12AM={differenceFrom12AM}
                  tomorrow={props.tomorrow}
                />
              ))
            );
          case true:
            return (
              props.oneCallData &&
              props.oneCallData.hourly
                .slice(differenceFrom12AM, differenceFrom12AM + 24)
                .map((
                  hour,
                  index //How many values are we to display
                ) => (
                  <TempCard
                    key={index} // Uniquely identify each Card we make
                    indexNum={index}
                    hour={hour}
                    currentHour={currentHour}
                    timeDifference={timeDifference}
                    oneCallData={props.oneCallData}
                    kelvinToCelcius={props.kelvinToCelcius}
                    differenceFrom12AM={differenceFrom12AM}
                    tomorrow={props.tomorrow}
                  />
                ))
            );
          default:
            return "Couldnt Generate Temperature Tiles";
        }
      })()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    oneCallData: state.apiReducer.oneCallData,
  };
};

export default connect(mapStateToProps)(TempByHour);
