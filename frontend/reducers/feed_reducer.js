import merge from "lodash/merge";
import * as Actions from "../actions/feed_actions.js";

const FeedReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    case Actions.FeedConstants.RECEIVE_USER_FEEDS:
      return action.feeds;
    default:
      return state;
  }
};

export default FeedReducer;
