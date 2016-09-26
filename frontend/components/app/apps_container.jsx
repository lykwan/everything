import App from "./apps.jsx";
import {connect} from "react-redux";
import {requestCurrentUser} from "../../actions/session_actions.js";
import {requestAllApps} from "../../actions/app_actions.js";


const mapStateToProps = (state) => ({
  loggedIn: state.session.currentUser ? true : false,
  apps: state.apps.allApps
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestCurrentUser: () => dispatch(requestCurrentUser()),
  requestAllApps: () => dispatch(requestAllApps())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
