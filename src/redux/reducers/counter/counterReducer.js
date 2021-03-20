import * as actions from "../../actionTypes";

const initialState = {
  count: 55,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.INCREMENT: {
      return { ...state, count: state.count + action.payload };
    }
    case actions.DECREMENT: {
      return { ...state, count: state.count - 1 };
    }
    default:
      return state;
  }
};

export default counterReducer;
