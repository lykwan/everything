import React from "react";

class SessionForm extends React.Component{
  constructor(props) {
    super(props);
    // this.checkLoginState = this.checkLoginState.bind(this);
    // this.statusChangeCallback = this.statusChangeCallback.bind(this);
    // this.loggedInCallback = this.loggedInCallback.bind(this);
    // this.checkLoginState = this.checkLoginState.bind(this);
  }

  componentDidMount() {
    console.log("mounted");
    // this.FB.Event.subscribe('auth.logout',
    //    this.onLogout.bind(this));
    // this.FB.Event.subscribe('auth.statusChange',
    //    this.onStatusChange.bind(this));
  }
  //
  // FB.getLoginStatus(response) {
  //   this.statusChangeCallback(response);
  // };

  // checkLoginState() {
  //   this.FB.getLoginStatus((response) => {
  //     this.statusChangeCallback(response);
  //   });
  // }
  //
  // statusChangeCallback(response) {
  //   console.log('statusChangeCallback');
  //   console.log(response);
  //
  //   if (response.status === 'connected') {
  //      // Logged into your app and Facebook.
  //      this.loggedInCallback();
  //    } else if (response.status === 'not_authorized') {
  //      // The person is logged into Facebook, but not your app.
  //      document.getElementById('status').innerHTML = 'Please log ' +
  //        'into this app.';
  //    } else {
  //      // The person is not logged into Facebook, so we're not sure if
  //      // they are logged into this app or not.
  //      document.getElementById('status').innerHTML = 'Please log ' +
  //        'into Facebook.';
  //    }
  // }
  //
  // loggedInCallback() {
  //   console.log('Welcome!  Fetching your information.... ');
  //   FB.api('/me', (response) => {
  //     console.log("response is" + response);
  //     console.log('Successful login for: ' + response.name);
  //     document.getElementById('status').innerHTML =
  //       'Thanks for logging in, ' + response.name + '!';
  //   });
  // }


  // onStatusChange(response) {
  //    console.log( response );
  //    var self = this;
  //
  //    if( response.status === "connected" ) {
  //       this.FB.api('/me', function(response) {
  //          var message = "Welcome " + response.name;
  //          self.setState({
  //             message: message
  //          });
  //       })
  //    }
  // }
  //
  // onLogout(response) {
  //    this.setState({
  //       message: ""
  //    });
  // }

  // <div className="fb-login-button" data-max-rows="1" data-size="medium" data-show-faces="false" data-auto-logout-link="true"></div>

  render() {
    return (
      <div>
        in session form
      </div>
    );
  }
}

export default SessionForm;
