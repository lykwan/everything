export const SessionConstants = {
  LOGIN: "LOGIN"
};

export const login = (token) => ({
  type: SessionConstants.LOGIN,
  token
});
