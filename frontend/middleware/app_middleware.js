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

    default:
      return next(action);
  }
};

export default AppMiddleware;
