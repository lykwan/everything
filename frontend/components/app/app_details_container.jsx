import AppDetails from "./app_details.jsx";
import {connect} from "react-redux";
import {requestCurrentUser} from "../../actions/session_actions.js";
import {requestSingleApp} from "../../actions/app_actions.js";


const mapStateToProps = (state) => ({
  // currentUser: state.session.currentUser,
  loggedIn: state.session.currentUser ? true : false,
  appFeeds: state.apps.app
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestCurrentUser: () => dispatch(requestCurrentUser()),
  requestSingleApp: (appId) => dispatch(requestSingleApp(appId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails);
