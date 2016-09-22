import merge from "lodash/merge";

const AppReducer = (state = {}, action) => {
  let newState = merge({}, state);
  switch (action.type) {
    default:
      return state;
  }
};

export default AppReducer;
