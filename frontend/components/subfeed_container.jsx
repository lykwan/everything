import Subfeed from "./subfeed.jsx";
import {connect} from "react-redux";
import {requestCurrentUser} from "../actions/session_actions.js";
import {requestSubfeeds} from "../actions/feed_actions.js";


const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser,
  subfeeds: state.feeds.subfeeds
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestCurrentUser: () => dispatch(requestCurrentUser()),
  requestSubfeeds: (subfeedId) => dispatch(requestSubfeeds(subfeedId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Subfeed);
