import merge from "lodash/merge";
import * as Actions from "../actions/app_actions.js";

const AppReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case Actions.AppConstants.RECEIVE_USER_APPS:
      newState["allApps"] = action.apps;
      return newState;
    case Actions.AppConstants.RECEIVE_SINGLE_USER_APPs:
      newState["app"] = action.app;
      return newState;
    default:
      return state;
  }
};

export default AppReducer;
