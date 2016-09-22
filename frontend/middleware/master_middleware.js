import {applyMiddleware} from "redux";
import logger from "redux-logger";
import SessionMiddleware from "./session_middleware.js";
import FeedMiddleware from "./feed_middleware.js";
import AppMiddleware from "./app_middleware.js";

const MasterMiddleware = applyMiddleware(logger(), SessionMiddleware, FeedMiddleware, AppMiddleware);

export default MasterMiddleware;
