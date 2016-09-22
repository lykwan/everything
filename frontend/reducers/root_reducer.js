import {combineReducers} from "redux";
import SessionReducer from "./session_reducer.js";
import FeedReducer from "./feed_reducer.js";
import AppReducer from "./app_reducer.js";

const RootReducer = combineReducers(
  {
    session: SessionReducer,
    apps: AppReducer,
    feeds: AppReducer
  }
);

export default RootReducer;
