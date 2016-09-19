import {combineReducers} from "redux";
import DashboardReducer from "./dashboard_reducer.js";

const RootReducer = combineReducers(
  {
    dashboard: DashboardReducer
  }
);

export default RootReducer;
