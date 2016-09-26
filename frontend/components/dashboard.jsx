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
// onClick={this.handleAppClick.bind(this, userFeed.id)}

    if (this.props.userFeeds) {
      apps = this.props.userFeeds.map((userFeed, i) => {
        let subfeeds = userFeed.subfeeds.map((subfeed, j) => {
          return (<li className="subfeed-item" key={j}>{subfeed}</li>)
        })
        return (
          <div key={i}>
            <div className="plugin-name">
              <i className="fa fa-caret-down" aria-hidden="true"></i>
              {userFeed.name}
            </div>

            {subfeeds}
          </div>
        );
      });
    } else {
      apps = (<div></div>);
    }

    let name, image;
    if (this.props.currentUser) {
      let link = `http://graph.facebook.com/${this.props.currentUser.fbId}/picture/`;
      image = (<img className="user-profile-image" src={link}/>);
      name = this.props.currentUser.name;
    } else {
      image = (<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>);
      name = "User fb name";
    }

    return (
      <div className="dashboard-container">
        <div className="side-bar-container">

          <div className="user-container">
            {image}
            <div className="user-name">{name} / via Facebook</div>
            <button className="logout-button" onClick={this.handleLogout}>
              <i className="fa fa-sign-out" aria-hidden="true"></i>
            </button>
          </div>

          <div className="sidebar-feeds-container">

            <button
              className="all-button"
              onClick={this.handleShowAll}>
              <i className="fa fa-bars" aria-hidden="true"></i>
              All
            </button>

            <div>Your feeds</div>
            <ul>{apps}</ul>
            <button className="add-plugin-button"
              onClick={this.handleAddApp}>
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
              Add a new feed
            </button>
          </div>

        </div>
        <div className="children">{this.props.children}</div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
