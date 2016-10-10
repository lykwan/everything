import {hashHistory} from "react-router";
import * as Actions from "../actions/feed_actions.js";
import * as API from "../util/feed_api_util.js";

const FeedMiddleware = ({getState, dispatch}) => (next) => (action) => {
  let success;
  let error;
  switch (action.type) {
    case Actions.FeedConstants.REQUEST_USER_FEEDS:
      success = (feeds) => {
        dispatch(Actions.receiveUserFeeds(feeds));};
      API.requestUserFeeds(success);
      break;

    case Actions.FeedConstants.REQUEST_MORE_USER_FEEDS:
      success = (feeds) => {
        dispatch(Actions.receiveMoreUserFeeds(feeds));};
      API.requestMoreUserFeeds(action.lastItemIds, success);
      break;

    case Actions.FeedConstants.REQUEST_SUBFEEDS:
      success = (subfeeds) => {
        dispatch(Actions.receiveSubfeeds(action.subfeedId, subfeeds));};
      API.requestSubfeeds(action.subfeedId, success);
      break;

    case Actions.FeedConstants.REQUEST_MORE_SUBFEEDS:
      success = (subfeeds) => {
        dispatch(Actions.receiveMoreSubfeeds(action.subfeedId, subfeeds));};
      API.requestMoreSubfeeds(action.subfeedId, action.lastItemId, success);
      break;
    default:
      return next(action);
  }
};

export default FeedMiddleware;
