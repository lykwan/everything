import React from "react";
import {withRouter} from "react-router";

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAppClick = this.handleAppClick.bind(this);
    this.handleAddApp = this.handleAddApp.bind(this);
    this.handleShowAll = this.handleShowAll.bind(this);
  }

  componentDidMount() {
    // if (!this.props.currentUser) {
    //   this.props.requestCurrentUser();
    // } => request happens in each of the children of dashboard so dont need this here
    this.props.requestUserApps();
  }

  handleLogout() {
    this.props.logout();
  }

  handleShowAll() {
    this.props.router.push("/dashboard");
  }

  handleAppClick(appId) {
    this.props.router.push(`/dashboard/apps/${appId}`);
  }

  handleAddApp() {
    this.props.router.push("/dashboard/apps");
  }

  render() {

    let apps;

    if (this.props.apps) {
      apps = this.props.apps.map((app, idx) => {
        return (
          <li key={idx} onClick={this.handleAppClick.bind(this, app.id)}>app.name</li>
        );
      });
    } else {
      apps = (<div></div>);
    }

    let name, image;
    if (this.props.currentUser) {
      let link = `http://graph.facebook.com/${this.props.currentUser.fbId}/picture/`;
      image = (<img src={link}/>);
      name = this.props.currentUser.name;
    } else {
      image = (<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>);
      name = "User fb name";
    }

    return (
      <div>
        <div className="side-bar-container">
          <div>Hello from Dashboard</div>
          <div>{name}</div>
          <div>{image}</div>

          <button className="logout-button" onClick={this.handleLogout}>LOGOUT</button>
          <button className="all-button" onClick={this.handleShowAll}>All feeds</button>
          <div>list of apps</div>
          <ul>{apps}</ul>
          <button className="add-plugin-button"
            onClick={this.handleAddApp}>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
            Add a new app
          </button>
          <div className="children">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
