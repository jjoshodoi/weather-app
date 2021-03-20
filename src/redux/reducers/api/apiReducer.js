import * as actions from "../../actionTypes";

const initialState = {
  cwData: null,
  oneCallData: null,
};

export default function apiReducer(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_CW_API:
      return { ...state, cwData: action.payload };
    case actions.UPDATE_ONECALL_API:
      return { ...state, oneCallData: action.payload };
    default:
      return state;
  }
}
