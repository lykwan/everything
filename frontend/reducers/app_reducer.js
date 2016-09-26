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

      if (!newState["userFeeds"]) {
        newState["userFeeds"] = {}
      }
      action.apps.forEach(app => {
        let subfeeds = app.Subfeeds.map(subfeed => (subfeed.name));
        newState["userFeeds"][app.pluginId] = {
          name: app.Plugin.name,
          subfeeds: subfeeds
        };
      });

      return newState;
    case Actions.AppConstants.MERGE_SINGLE_USER_SUBFEED:
      let pluginName = action.subfeed.Feed.Plugin.path;
      let subfeedName = action.subfeed.name;
      let pluginId = action.subfeed.Feed.pluginId;
      if (newState.userFeeds[pluginId]) {
        newState.userFeeds[pluginId].subfeeds.push(subfeedName);
      } else {
        newState.userFeeds[pluginId] = {
          name: pluginName,
          subfeeds: [subfeedName]
        };
      }

      return newState;
    default:
      return state;
  }
};

export default AppReducer;
