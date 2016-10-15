export const FeedConstants = {
  REQUEST_USER_FEEDS: "REQUEST_USER_FEEDS",
  RECEIVE_USER_FEEDS: "RECEIVE_USER_FEEDS",
  REQUEST_MORE_USER_FEEDS: "REQUEST_MORE_USER_FEEDS",
  RECEIVE_MORE_USER_FEEDS: "RECEIVE_MORE_USER_FEEDS",
  REQUEST_SUBFEEDS: "REQUEST_SUBFEEDS",
  RECEIVE_SUBFEEDS: "RECEIVE_SUBFEEDS",
  REQUEST_MORE_SUBFEEDS: "REQUEST_MORE_SUBFEEDS",
  RECEIVE_MORE_SUBFEEDS: "RECEIVE_MORE_SUBFEEDS"
};

export const requestUserFeeds = () => ({
  type: FeedConstants.REQUEST_USER_FEEDS,
});

export const requestMoreUserFeeds = (lastItemIds) => ({
  type: FeedConstants.REQUEST_MORE_USER_FEEDS,
  lastItemIds
});

export const receiveUserFeeds = (feeds) => ({
  type: FeedConstants.RECEIVE_USER_FEEDS,
  feeds
});

export const receiveMoreUserFeeds = (feeds) => ({
  type: FeedConstants.RECEIVE_MORE_USER_FEEDS,
  feeds
});

export const requestSubfeeds = (subfeedId) => ({
  type: FeedConstants.REQUEST_SUBFEEDS,
  subfeedId
});

export const requestMoreSubfeeds = (subfeedId, lastItemId) => ({
  type: FeedConstants.REQUEST_MORE_SUBFEEDS,
  subfeedId,
  lastItemId
});

export const receiveSubfeeds = (subfeedId, subfeeds) => ({
  type: FeedConstants.RECEIVE_SUBFEEDS,
  subfeedId,
  subfeeds
});

export const receiveMoreSubfeeds = (subfeedId, subfeeds) => ({
  type: FeedConstants.RECEIVE_MORE_SUBFEEDS,
  subfeedId,
  subfeeds
});
