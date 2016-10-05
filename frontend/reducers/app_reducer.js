import merge from "lodash/merge";
import * as Actions from "../actions/app_actions.js";

const AppReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case Actions.AppConstants.RECEIVE_ALL_APPS:
      newState["allApps"] = action.apps;
      return newState;

    case Actions.AppConstants.RECEIVE_USER_APPS:

      if (!newState["userFeeds"]) {
        newState["userFeeds"] = {};
      }
      console.log(action.apps);
      action.apps.forEach(app => {
        let subfeeds = app.Subfeeds.map(subfeed => ({
          name: subfeed.name,
          id: subfeed.id
        }));
        newState["userFeeds"][app.pluginId] = {
          name: app.Plugin.name,
          subfeeds: subfeeds
        };
      });

      return newState;

    case Actions.AppConstants.MERGE_SINGLE_USER_SUBFEED:
    
    console.log(action.subfeed);
      let pluginName = action.subfeed.Feed.Plugin.name;
      let subfeeds = {
        name: action.subfeed.name,
        id: action.subfeed.id
      };
      let pluginId = action.subfeed.Feed.pluginId;
      if (newState.userFeeds[pluginId]) {
        newState.userFeeds[pluginId].subfeeds.push(subfeeds);
      } else {
        newState.userFeeds[pluginId] = {
          name: pluginName,
          subfeeds: [subfeeds]
        };
      }
      return newState;

    default:
      return state;
  }
};

export default AppReducer;
