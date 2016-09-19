import {hashHistory} from "react-router";

const DashboardMiddleware = ({getState, dispatch}) => (next) => (action) => {
  let success;
  let error;
  switch (action.type) {
    default:
      return next(action);
  }
};

export default DashboardMiddleware;
