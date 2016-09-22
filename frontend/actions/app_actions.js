export const AppConstants = {
  REQUEST_USER_APPS: "REQUEST_USER_APPS",
  RECEIVE_USER_APPS: "RECEIVE_USER_APPS",
  ADD_SINGLE_APP: "ADD_SINGLE_APP",
  RECEIVE_SINGLE_USER_APP: "RECEIVE_SINGLE_USER_APP",
};

export const requestUserApps = () => ({
  type: AppConstants.REQUEST_USER_APPS,
});

export const receiveUserApps = (apps) => ({
  type: AppConstants.RECEIVE_USER_APPS,
  apps
});

export const receiveSingleUserApp = (app) => ({
  type: AppConstants.RECEIVE_SINGLE_USER_APP,
  app
});

export const addSingleApp = (appId) => ({
  type: AppConstants.ADD_SINGLE_APP,
  appId
});
