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
    case Actions.AppConstants.RECEIVE_USER_APPS:
    console.log("in app reducer, all user apps");
    console.log(action.apps);
      newState["userFeeds"] = action.apps;
      return newState;
    case Actions.AppConstants.MERGE_SINGLE_USER_SUBFEED:
    console.log("in app reducer, add one app");
    console.log(action.subfeed);
      newState.userFeeds[action.subfeed.pluginId].subfeeds.push(action.subfeed.name);
      return newState;
    default:
      return state;
  }
};

export default AppReducer;
