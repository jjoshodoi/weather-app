import React from "react";
import { connect } from "react-redux";
import * as actions from "../redux/actionTypes";
import { updateView } from "../redux/reducers/view/actions";

const SelectDay = (props) => {
  const changeView = (view) => {
    props.dispatch(updateView(view));
  };

  return (
    //Should we Reset day back to Today when they search?
    <div className="select-day-padding">
      <button
        id={1}
        className={`pageButton${
          props.currentView === "today" ? "-active" : ""
        }`}
        onClick={() => changeView("today")}
      >
        Today
      </button>
      <button
        id={2}
        className={`pageButton${
          props.currentView === "tomorrow" ? "-active" : ""
        }`}
        onClick={() => changeView("tomorrow")}
      >
        Tomorrow
      </button>
      <button
        id={3}
        className={`pageButton${props.currentView === "week" ? "-active" : ""}`}
        onClick={() => changeView("week")}
      >
        Next 7 Days
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentView: state.viewReducer.currentView,
  };
};

export default connect(mapStateToProps)(SelectDay);
