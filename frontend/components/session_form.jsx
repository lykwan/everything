import React from "react";

class SessionForm extends React.Component{
  constructor(props) {
    super(props);
    // this.checkLoginState = this.checkLoginState.bind(this);
    // this.statusChangeCallback = this.statusChangeCallback.bind(this);
    // this.loggedInCallback = this.loggedInCallback.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    // this.displayUser = this.displayUser.bind(this);
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
     console.log( response );

     if ( response.status === "connected" ) {
        this.FB.api('/me', () => {
           this.setState({
              message: `Welcome!`
           });
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

  onLogout(response) {
     this.setState({
        message: ""
     });
  }

  // displayUser() {
  //   this.FB.api('/me', (response) => {
  //     console.log('Successful login for: ' + response.name);
  //     console.log(response);
  //     console.log('Thanks for logging in, ' + response.name + '!');
  //
  //   });
  // }

  render() {
    return (
      <div>
        <div className="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="true"></div>
        <div>{this.state.message}</div>

      </div>
    );
  }
}

SessionForm.contextTypes = {
  fb: React.PropTypes.object
};

export default SessionForm;
