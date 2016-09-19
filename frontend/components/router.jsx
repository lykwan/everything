import React from "react";
import {Router, Route, IndexRoute, hashHistory, browserHistory} from "react-router";
import App from "./app.jsx";
import DashboardContainer from "./dashboard.jsx";


class AppRouter extends React.Component{
  constructor(props){
    super(props);
    this._ensureLoggedIn = this._ensureLoggedIn.bind(this);
    this._redirectIfLoggedIn = this._redirectIfLoggedIn.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  _ensureLoggedIn(nextState, replace){
    const currentState = this.context.store.getState();
    const currentUser = currentState.session.currentUser;
    if (!currentUser) {
      replace('/login');
    }
  }

  _redirectIfLoggedIn(nextState, replace){
    const currentState = this.context.store.getState();
    const currentUser = currentState.session.currentUser;
    if (currentUser) {
      replace('/');
    }
  }


  render(){
    return(
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <Route path="/dashboard" component={ DashboardContainer } /> //onEnter={this._ensureLoggedIn}
        </Route>
      </Router>
    );
  }
}

AppRouter.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default AppRouter;
