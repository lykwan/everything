import React from "react";

class SessionForm extends React.Component{
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <button type="button" className='facebook-login'>Log in with Facebook</button>
        <button type="button" className='google-login'>Log in with Google</button>
      </div>
    );
  }
}

export default SessionForm;
