import React from "react";

class SessionForm extends React.Component{
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <div className="fb-login-button" data-max-rows="1" data-size="large" data-show-faces="false" data-auto-logout-link="true"></div>
      </div>
    );
  }
}

export default SessionForm;
