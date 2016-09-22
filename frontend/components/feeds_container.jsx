import Feed from "./feeds.jsx";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
  feeds: state.feeds,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);
