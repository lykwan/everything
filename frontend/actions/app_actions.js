export const AppConstants = {
  REQUEST_USER_APPS: "REQUEST_USER_APPS",
  RECEIVE_USER_APPS: "RECEIVE_USER_APPS",
  ADD_SINGLE_USER_APP: "ADD_SINGLE_USER_APP",
  MERGE_SINGLE_USER_APP: "MERGE_SINGLE_USER_APP",
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

export const addSingleUserApp = (appId) => ({
  type: AppConstants.ADD_SINGLE_USER_APP,
  appId
});

export const mergeSingleUserApp = (app) => ({
  type: AppConstants.MERGE_SINGLE_USER_APP,
  app
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
