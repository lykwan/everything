export const AppConstants = {
  REQUEST_USER_APPS: "REQUEST_USER_APPS",
  RECEIVE_USER_APPS: "RECEIVE_USER_APPS",
  ADD_SINGLE_USER_SUBFEED: "ADD_SINGLE_USER_SUBFEED",
  MERGE_SINGLE_USER_SUBFEED: "MERGE_SINGLE_USER_SUBFEED",
  REQUEST_ALL_APPS: "REQUEST_ALL_APPS",
  RECEIVE_ALL_APPS: "RECEIVE_ALL_APPS",
  REQUEST_SINGLE_APP: "REQUEST_SINGLE_APP",
  RECEIVE_SINGLE_APP: "RECEIVE_SINGLE_APP"
};

export const requestUserApps = () => ({
  type: AppConstants.REQUEST_USER_APPS,
});

export const receiveUserApps = (apps) => ({
  type: AppConstants.RECEIVE_USER_APPS,
  apps
});

export const addSingleUserSubfeed = (pluginId, subfeedData) => ({
  type: AppConstants.ADD_SINGLE_USER_SUBFEED,
  pluginId,
  subfeedData
});

export const mergeSingleUserSubfeed = (subfeed) => ({
  type: AppConstants.MERGE_SINGLE_USER_SUBFEED,
  subfeed
});

export const requestAllApps = () => ({
  type: AppConstants.REQUEST_ALL_APPS,
});

export const receiveAllApps = (apps) => ({
  type: AppConstants.RECEIVE_ALL_APPS,
  apps
});

export const requestSingleApp = (appId) => ({
  type: AppConstants.REQUEST_SINGLE_APP,
  appId
});

export const receiveSingleApp = (app) => ({
  type: AppConstants.RECEIVE_SINGLE_APP,
  app
});
