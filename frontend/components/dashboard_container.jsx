import Dashboard from "./dashboard.jsx";
import {connect} from "react-redux";
import {logout} from "../actions/session_actions.js";
import {requestUserFeeds} from "../actions/feed_actions.js";
import {requestUserApps} from "../actions/app_actions.js";

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  feeds: state.feeds,
  // apps: state.session.currentUser.apps
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => dispatch(logout()),
  requestUserFeeds: () => dispatch(requestUserFeeds()),
  requestUserApps: () => dispatch(requestUserApps())
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
