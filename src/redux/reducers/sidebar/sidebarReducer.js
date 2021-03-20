import * as actions from "../../actionTypes";

function readFavourites() {
  try {
    return localStorage.getItem("favourites");
  } catch (e) {
    console.warn(e);
  }
}

const initialState = {
  isSideOpen: false,
  localData: readFavourites(),
};

function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case actions.TOGGLE:
      return { ...state, isSideOpen: !state.isSideOpen };
    case "ADDTOFAVS":
      return { ...state, localData: [...state.localData, action.payload] };
    default:
      return state;
  }
  // if (action.type === "TOGGLE") {
  //   return { ...state, sidebarOpen: !state.sidebarOpen };
  // } else {
  //   return state;
  // }
}

export default sidebarReducer;
