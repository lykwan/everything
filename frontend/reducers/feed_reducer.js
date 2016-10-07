import merge from "lodash/merge";
import * as Actions from "../actions/feed_actions.js";

const FeedReducer = (state = {}, action) => {
    let newState = merge({}, state);
  switch (action.type) {
    case Actions.FeedConstants.RECEIVE_USER_FEEDS:
console.log(action.feeds);
debugger
      newState["allFeeds"] = action.feeds;
      return newState;

    case Actions.FeedConstants.RECEIVE_SUBFEEDS:
      if (!newState["subfeeds"]) {
        newState["subfeeds"] = {};
      }

      newState["subfeeds"]["feedItems"] = action.subfeeds.feedItems;
      newState["subfeeds"]["subfeedId"] = action.subfeedId;
      return newState;

    default:
      return state;
  }
};

export default FeedReducer;
