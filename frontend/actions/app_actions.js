export const AppConstants = {
  REQUEST_USER_APPS: "REQUEST_USER_APPS",
  RECEIVE_USER_APPS: "RECEIVE_USER_APPS"
};

export const requestUserApps = () => ({
  type: AppConstants.REQUEST_USER_APPS,
});

export const receiveUserApps = (apps) => ({
  type: AppConstants.RECEIVE_USER_APPS,
  apps
});
