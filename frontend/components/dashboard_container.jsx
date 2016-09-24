import Dashboard from "./dashboard.jsx";
import {connect} from "react-redux";
import {logout, requestCurrentUser} from "../actions/session_actions.js";
import {requestUserApps} from "../actions/app_actions.js";

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  // apps: state.session.currentUser.apps
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch(logout()),
  requestUserApps: () => dispatch(requestUserApps()),
  requestCurrentUser: () => dispatch(requestCurrentUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
