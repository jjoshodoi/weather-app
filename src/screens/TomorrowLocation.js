import React from "react";
import SelectDay from "../components/selectDay";
import DisplayDate from "../components/displayDate";

import TempByHour from "../components/tempTiles/tempByHour";
import DisplayTemp from "../components/displayTemp";

import { connect } from "react-redux";

const TomorrowLocation = (props) => {
  return (
    <div>
      {/* <GeoButtons GEOCODING_API_KEY={GEOCODING_API_KEY} /> */}
      <div className={`main-info-card-${props.color}`}>
        <DisplayDate tomorrow={props.tomorrow} />
        <DisplayTemp
          tomorrow={props.tomorrow}
          kelvinToCelcius={props.kelvinToCelcius}
        />
      </div>
      <SelectDay tomorrow={props.tomorrow} />
      {/* Temp By Hour will be done starting from 0 depending on country. */}
      <TempByHour
        kelvinToCelcius={props.kelvinToCelcius}
        tomorrow={props.tomorrow}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cwData: state.apiReducer.cwData,
    oneCallData: state.apiReducer.oneCallData,
  };
};

export default connect(mapStateToProps)(TomorrowLocation);
