import AppDetails from "./app_details.jsx";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
  appFeeds: state.apps.app,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AppDetails);
