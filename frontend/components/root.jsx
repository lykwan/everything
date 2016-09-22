import React from "react";
import { Provider } from 'react-redux';
import AppRouter from "./router.jsx";

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  getChildContext() {
    return {fb: this.props.fb};
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <AppRouter />
      </Provider>
    );
  }
}

Root.childContextTypes = {
  fb: React.PropTypes.object
};

export default Root;
