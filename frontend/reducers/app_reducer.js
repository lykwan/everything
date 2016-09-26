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

      let userFeeds = action.apps.map(app => {
        let subfeeds = app.Subfeeds.map(subfeed => (subfeed.name));
        return {
          pluginId: app.pluginId,
          name: app.Plugin.name,
          subfeeds: subfeeds
        };
      });

      newState["userFeeds"] = userFeeds;
      return newState;
    case Actions.AppConstants.MERGE_SINGLE_USER_SUBFEED:

      let subfeedName = action.subfeed.name;
      let pluginId = action.subfeed.Feed.pluginId;
      newState.userFeeds.forEach(feed => {
        if (feed.pluginId === pluginId) {
          feed.subfeeds.push(subfeedName);
        }
      });

      return newState;
    default:
      return state;
  }
};

export default AppReducer;
