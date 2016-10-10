import Feeds from "./feeds.jsx";
import {connect} from "react-redux";
import {requestCurrentUser} from "../actions/session_actions.js";
import {requestUserFeeds, requestMoreUserFeeds} from "../actions/feed_actions.js";


const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  loggedIn: state.session.currentUser ? true : false,
  feeds: state.feeds.allFeeds
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestCurrentUser: () => dispatch(requestCurrentUser()),
  requestUserFeeds: () => dispatch(requestUserFeeds()),
  requestMoreUserFeeds: (lastItemIds) => dispatch(requestMoreUserFeeds(lastItemIds))
});

export default connect(mapStateToProps, mapDispatchToProps)(Feeds);
