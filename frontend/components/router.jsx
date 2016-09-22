import React from "react";
import {Router, Route, IndexRoute, hashHistory, browserHistory} from "react-router";
import App from "./app.jsx";
import DashboardContainer from "./dashboard_container.jsx";
import Feeds from "./feeds.jsx";
import AppIndex from "./app/apps.jsx";
import AppDetails from "./app/app_details.jsx";
import SessionFormContainer from './session_form_container.jsx';


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
      replace('/');
    }
  }

  _redirectIfLoggedIn(nextState, replace){
    const currentState = this.context.store.getState();
    const currentUser = currentState.session.currentUser;
    if (currentUser) {
      replace('/dashboard');
    }
  }


  render(){
    return(
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component={ SessionFormContainer } /> //onEnter={this._redirectIfLoggedIn}
          <Route path="dashboard" component={ DashboardContainer }> //onEnter={this._ensureLoggedIn}
            <Route path="/all" component={ Feeds }/> //onEnter={this._ensureLoggedIn}
            <Route path="/apps" component={ AppIndex }/> //onEnter={this._ensureLoggedIn}
            <Route path="/apps/:appId" component={ AppDetails }/> //onEnter={this._ensureLoggedIn}
          </Route>
        </Route>
      </Router>
    );
  }
}

AppRouter.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default AppRouter;
