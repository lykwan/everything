import merge from "lodash/merge";
import * as Actions from "../actions/app_actions.js";

const AppReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case Actions.AppConstants.RECEIVE_ALL_APPS:
      newState["allApps"] = action.apps;
      return newState;
    case Actions.AppConstants.RECEIVE_SINGLE_APP:
      newState["app"] = action.app;
      return newState;
    default:
      return state;
  }
};

export default AppReducer;
