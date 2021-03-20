import { combineReducers } from "redux";
import sidebarReducer from "./reducers/sidebar/sidebarReducer";
import counterReducer from "./reducers/counter/counterReducer";
import searchReducer from "./reducers/search/searchReducer";
import viewReducer from "./reducers/view/viewReducer";
import apiReducer from "./reducers/api/apiReducer";

export default combineReducers({
  sidebarReducer,
  counterReducer,
  searchReducer,
  viewReducer,
  apiReducer,
});
