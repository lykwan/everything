import React from "react";
import {withRouter} from "react-router";
import AppItem from "./app_item.jsx";

class Apps extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.requestCurrentUser();
    }
    this.props.requestAllApps();
  }

  render() {

    let apps;
    if (this.props.loggedIn && this.props.apps) {
      apps = this.props.apps.map((app, idx) => {
        return (
          <AppItem app={app}/>
        );
      });
    } else {
      apps = (<div>no apps yet</div>);
    }

    return (
      <div className="apps-container">
        <div>Hello from apps!!</div>
        <ul>{apps}</ul>
      </div>
    );
  }
}

export default withRouter(Apps);
