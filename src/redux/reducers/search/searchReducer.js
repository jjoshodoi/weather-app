import * as actions from "../../actionTypes";

const initialState = {
  address: "London, UK",
};

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case actions.UPDATE_ADDRESS:
      return { ...state, address: action.payload };
    default:
      return state;
  }
}

export default searchReducer;
