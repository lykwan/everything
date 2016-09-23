import React from "react";

class SessionForm extends React.Component{
  constructor(props) {
    super(props);

    this.onLogout = this.onLogout.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
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
           this.setState({
              message: `Welcome!`
           });
           console.log('Successful login for: ' + res.name);
           console.log(res);
        });
        this.props.login(response.authResponse.accessToken);
        this.displayUser();

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

SessionForm.contextTypes = {
  fb: React.PropTypes.object
};

export default SessionForm;
