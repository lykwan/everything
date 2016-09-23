export const SessionConstants = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  REQUEST_CURRENT_USER: "REQUEST_CURRENT_USER",
  RECEIVE_CURRENT_USER: "RECEIVE_CURRENT_USER",
  RECEIVE_ERRORS: "RECEIVE_ERRORS"
};

export const login = (token) => ({
  type: SessionConstants.LOGIN,
  token
});

export const requestCurrentUser = () => ({
  type: SessionConstants.REQUEST_CURRENT_USER
});

export const logout = () => ({
  type: SessionConstants.LOGOUT,
});

export const receiveCurrentUser = (currentUser) => ({
  type: SessionConstants.RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = (errors) => ({
  type: SessionConstants.RECEIVE_ERRORS,
  errors
});
