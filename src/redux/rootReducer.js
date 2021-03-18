import { combineReducers } from "redux";
import sidebarReducer from "./reducers/sidebar/sidebarReducer";
import counterReducer from "./reducers/counter/counterReducer";
import searchReducer from "./reducers/search/searchReducer";

export default combineReducers({
  sidebarReducer,
  counterReducer,
  searchReducer,
});
