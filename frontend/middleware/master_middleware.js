import {applyMiddleware} from "redux";
import logger from "redux-logger";
import DashboardMiddleware from "./dashboard_middleware.js";

const MasterMiddleware = applyMiddleware(logger(), DashboardMiddleware);

export default MasterMiddleware;
