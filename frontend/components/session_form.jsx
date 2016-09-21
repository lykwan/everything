import React from "react";

class SessionForm extends React.Component{
  constructor(props) {
    super(props);
    // this.checkLoginState = this.checkLoginState.bind(this);
    // this.statusChangeCallback = this.statusChangeCallback.bind(this);
    // this.loggedInCallback = this.loggedInCallback.bind(this);
    this.FB = this.props.fb;
    this.onLogout = this.onLogout.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.state = {message: ""};
  }

  componentDidMount() {
    console.log("mounted");
    console.log(this.FB);
    this.FB.Event.subscribe('auth.logout',
      this.onLogout.bind(this));
    this.FB.Event.subscribe('auth.statusChange',
      this.onStatusChange.bind(this));
  }

  onStatusChange(response) {
     console.log( response );

     if ( response.status === "connected" ) {
        this.FB.api('/me', () => {
           this.setState({
              message: `Welcome + ${response.name}`
           });
        });

        $.ajax({
          method: "POST",
          url: `login`,
          data: response.authResponse.accessToken,
          dataType: "json",
          success: () => {console.log('Welcome Valerie');},
          error: () => {console.log('fb login error');}
        });

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


  render() {
    return (
      <div>
        <div className="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="true"></div>
        <div>{this.state.message}</div>
      </div>
    );
  }
}

export default SessionForm;
