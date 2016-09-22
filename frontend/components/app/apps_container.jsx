import App from "./apps.jsx";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
  apps: state.apps.allApps,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
