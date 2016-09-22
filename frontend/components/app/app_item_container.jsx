import AppItem from "./app_item.jsx";
import {connect} from "react-redux";
import {addSingleApp} from "../../actions/app_actions.js";

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addSingleApp: () => dispatch(addSingleApp())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppItem);
