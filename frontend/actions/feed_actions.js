export const FeedConstants = {
  REQUEST_USER_FEEDS: "REQUEST_USER_FEEDS",
  RECEIVE_USER_FEEDS: "RECEIVE_USER_FEEDS"
};

export const requestUserFeeds = () => ({
  type: FeedConstants.REQUEST_USER_FEEDS,
});

export const receiveUserFeeds = (feeds) => ({
  type: FeedConstants.RECEIVE_USER_FEEDS,
  feeds
});
