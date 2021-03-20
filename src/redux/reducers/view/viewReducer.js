import { GrActions } from "react-icons/gr";
import * as actions from "../../actionTypes";

const initialState = {
  currentView: "today",
};

export default function viewReducer(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_VIEW: {
      return { ...state, currentView: action.payload };
    }
    default:
      return state;
  }
}
