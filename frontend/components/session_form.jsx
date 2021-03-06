import React from "react";
import {withRouter} from "react-router";

class SessionForm extends React.Component{
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.handleGuestLogin = this.handleGuestLogin.bind(this);
    this.state = {message: ""};
  }

  componentDidMount() {
    this.FB = this.context.fb;
    this.FB.Event.subscribe('auth.logout',
      this.onLogout.bind(this));
    this.FB.Event.subscribe('auth.statusChange',
      this.onStatusChange.bind(this));
  }

  componentDidUpdate(){
    if (this.props.loggedIn){
      this.props.router.push("/dashboard");
    }
  }


  onStatusChange(response) {

     if ( response.status === "connected" ) {
        this.FB.api('/me', (res) => {
          //  this.setState({
          //     message: `Welcome, ${res.name}!`
          //  });
        });
        this.props.login(response.authResponse.accessToken);


     } else if (response.status === 'not_authorized') {
         this.setState({
            message: "Please log into #Everthing"
         });

     } else {
         this.setState({
            message: "Please log into Faceboook"
         });

     }
  }

  handleGuestLogin() {
    this.props.login("guest");
  }

  onLogout(response) {
     this.setState({
        message: ""
     });
  }

  render() {
    return (
      <div className="login-container">

        <div className="logo">#Everything</div>
        <div className="tagline">All your feeds, one place</div>

        <div
          className="fb-login-button"
          data-max-rows="1" data-size="medium"
          onClick={this.handleLogin}>
        </div>

        <div className="guest-login-button"
          onClick={this.handleGuestLogin}>
          Guest Login</div>

        <a className="github" href="https://github.com/valerielu/-everything" target="_blank">
          <i className="fa fa-github" aria-hidden="true"></i></a>

        <div className="login-message">{this.state.message}</div>

      </div>
    );
  }
}

SessionForm.contextTypes = {
  fb: React.PropTypes.object
};

export default withRouter(SessionForm);
