import SessionForm from "./session_form.jsx";
import {connect} from "react-redux";
import {login} from "../actions/session_actions.js";

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (token) => dispatch(login(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
