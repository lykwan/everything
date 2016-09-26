import {hashHistory} from "react-router";
import * as Actions from "../actions/app_actions.js";
import * as API from "../util/app_api_util.js";

const AppMiddleware = ({getState, dispatch}) => (next) => (action) => {
  let success;
  let error;
  switch (action.type) {
    case Actions.AppConstants.REQUEST_USER_APPS:
      success = (apps) => {
        dispatch(Actions.receiveUserApps(apps));};
      API.requestUserApps(success);
      break;

    case Actions.AppConstants.ADD_SINGLE_USER_SUBFEED:
      success = (subfeed) => {
        dispatch(Actions.mergeSingleUserSubfeed(subfeed));};
      API.addSingleUserSubfeed(action.pluginId, action.subfeedData, success);
      break;

    case Actions.AppConstants.REQUEST_ALL_APPS:
      success = (apps) => {
        dispatch(Actions.receiveAllApps(apps));};
      API.requestAllApps(success);
      break;

    case Actions.AppConstants.REQUEST_SINGLE_APP:
      success = (app) => {
        dispatch(Actions.receiveSingleApp(app));};
      API.requestSingleApp(action.appId, success);
      break;

    default:
      return next(action);


  }
};

export default AppMiddleware;
