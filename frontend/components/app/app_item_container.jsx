import AppItem from "./app_item.jsx";
import {connect} from "react-redux";
import {addSingleUserApp} from "../../actions/app_actions.js";

const mapStateToProps = (state) => ({
  currentUser: state.session.currentUser
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  addSingleUserApp: () => dispatch(addSingleUserApp())
});

export default connect(mapStateToProps, mapDispatchToProps)(AppItem);
