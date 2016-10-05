export const FeedConstants = {
  REQUEST_USER_FEEDS: "REQUEST_USER_FEEDS",
  RECEIVE_USER_FEEDS: "RECEIVE_USER_FEEDS",
  REQUEST_SUBFEEDS: "REQUEST_SUBFEEDS",
  RECEIVE_SUBFEEDS: "RECEIVE_SUBFEEDS"
};

export const requestUserFeeds = () => ({
  type: FeedConstants.REQUEST_USER_FEEDS,
});

export const receiveUserFeeds = (feeds) => ({
  type: FeedConstants.RECEIVE_USER_FEEDS,
  feeds
});

export const requestSubfeeds = (subfeedId) => ({
  type: FeedConstants.REQUEST_SUBFEEDS,
  subfeedId
});

export const receiveSubfeeds = (subfeedId, subfeeds) => ({
  type: FeedConstants.RECEIVE_SUBFEEDS,
  subfeedId,
  subfeeds
});
