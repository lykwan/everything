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


    case Actions.FeedConstants.REQUEST_SUBFEEDS:
      success = (subfeeds) => {
        dispatch(Actions.receiveSubfeeds(action.subfeedId, subfeeds));};
      API.requestSubfeeds(action.subfeedId, success);
      break;
    default:
      return next(action);
  }
};

export default FeedMiddleware;
