import SessionForm from "./session_form.jsx";
import {connect} from "react-redux";
import {login} from "../actions/session_actions.js";
import {requestCurrentUser} from "../actions/session_actions.js";


const mapStateToProps = (state) => ({
  loggedIn: state.session.currentUser ? true : false
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (token) => dispatch(login(token)),
  requestCurrentUser: () => dispatch(requestCurrentUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
