import React from "react";
import {Router, Route, IndexRoute, hashHistory, browserHistory} from "react-router";
import App from "./app.jsx";
import Dashboard from "./dashboard.jsx";
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
          <Route path="dashboard" component={ Dashboard }> //onEnter={this._ensureLoggedIn}
            // <Route path="/all" component={ All }/> //onEnter={this._ensureLoggedIn}
            // <Route path="/plugins" component={ Plugins }/> //onEnter={this._ensureLoggedIn}
            // <Route path="/plugins/:pluginId" component={ Feeds }/> //onEnter={this._ensureLoggedIn}
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
