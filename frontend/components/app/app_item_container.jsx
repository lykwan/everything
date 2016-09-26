import AppItem from "./app_item.jsx";
import {connect} from "react-redux";
import {addSingleUserSubfeed} from "../../actions/app_actions.js";

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addSingleUserSubfeed: (pluginId, subfeedData) => dispatch(addSingleUserSubfeed(pluginId, subfeedData))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppItem);
