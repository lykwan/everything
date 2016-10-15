import merge from "lodash/merge";
import * as Actions from "../actions/feed_actions.js";

const FeedReducer = (state = {}, action) => {
    let newState = merge({}, state);
    let subfeeds, count, feeds, lastItemIds;
  switch (action.type) {
    case Actions.FeedConstants.RECEIVE_USER_FEEDS:
      subfeeds = Object.keys(action.feeds.feedItems);
      count = 0;
      lastItemIds = {};

      subfeeds.forEach(Id => {
        count += action.feeds.feedItems[Id].length;
        lastItemIds[Id] = action.feeds.feedItems[Id][action.feeds.feedItems[Id].length - 1].id;
      });
      feeds = [];
      while (count > 0) {
        let randSubfeed = subfeeds[Math.floor(Math.random()*(subfeeds.length))];
        if (action.feeds.feedItems[randSubfeed].length === 0) {
          let idx = subfeeds.indexOf(randSubfeed);
          subfeeds.splice(idx, 1);
          continue;
        }
        feeds.push(action.feeds.feedItems[randSubfeed].shift());
        count -= 1;
      }

      if (!newState["allFeeds"]) {
        newState["allFeeds"] = {};
      }
      newState["allFeeds"]["feedItems"] = feeds;
      newState["allFeeds"]["lastItemIds"] = lastItemIds;
      return newState;

    case Actions.FeedConstants.RECEIVE_MORE_USER_FEEDS:
      subfeeds = Object.keys(action.feeds.feedItems);
      count = 0;
      lastItemIds = {};

      subfeeds.forEach(Id => {
        count += action.feeds.feedItems[Id].length;
        lastItemIds[Id] = action.feeds.feedItems[Id][action.feeds.feedItems[Id].length - 1].id;
      });
      feeds = [];
      while (count > 0) {
        let randSubfeed = subfeeds[Math.floor(Math.random()*(subfeeds.length))];
        if (action.feeds.feedItems[randSubfeed].length === 0) {
          let idx = subfeeds.indexOf(randSubfeed);
          subfeeds.splice(idx, 1);
          continue;
        }
        feeds.push(action.feeds.feedItems[randSubfeed].shift());
        count -= 1;
      }
      newState.allFeeds.feedItems = newState.allFeeds.feedItems.concat(feeds);
      newState.allFeeds.lastItemIds = lastItemIds;
      return newState;

    case Actions.FeedConstants.RECEIVE_SUBFEEDS:
      if (!newState["subfeeds"]) {
        newState["subfeeds"] = {};
      }

      newState["subfeeds"]["feedItems"] = action.subfeeds.feedItems;
      newState["subfeeds"]["subfeedId"] = action.subfeedId;
      newState["subfeeds"]["lastItemId"] = action.subfeeds.feedItems[action.subfeeds.feedItems.length - 1].id;
      return newState;

    case Actions.FeedConstants.RECEIVE_MORE_SUBFEEDS:
      newState.subfeeds.feedItems = newState.subfeeds.feedItems.concat(action.subfeeds.feedItems);
      newState.subfeeds.lastItemId = action.subfeeds.feedItems[action.subfeeds.feedItems.length - 1].id;
      // newState["subfeeds"]["subfeedId"] = action.subfeedId;
      return newState;

    default:
      return state;
  }
};

export default FeedReducer;
