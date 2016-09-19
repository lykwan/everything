import merge from "lodash/merge";

const DashboardReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    default:
      return state;
  }
};

export default DashboardReducer;
