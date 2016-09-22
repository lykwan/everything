import React from "react";
import {withRouter} from "react-router";
import AppItem from "./app_item.jsx";

class Apps extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {

    let apps;

    if (this.props.apps) {
      apps = this.props.apps.map((app, idx) => {
        return (
          <AppItem app={app}/>
        );
      });
    } else {
      apps = (<div></div>);
    }

    return (
      <div className="apps-container">
        <ul>{apps}</ul>
      </div>
    );
  }
}

export default withRouter(Apps);
