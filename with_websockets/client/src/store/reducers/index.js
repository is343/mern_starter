import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import customerReducer from "./customer";

export default combineReducers({
  router: routerReducer,
  customers: customerReducer
});
