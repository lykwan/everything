import React from "react";
import {withRouter} from "react-router";
import SubfeedItem from "./subfeed_item.jsx";

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleAppClick = this.handleAppClick.bind(this);
    this.handleAddApp = this.handleAddApp.bind(this);
    this.handleShowAll = this.handleShowAll.bind(this);
  }

  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.requestCurrentUser();
    }
    this.props.requestUserApps();
  }

  componentDidUpdate() {
    // if (!this.props.currentUser) {
    //   this.props.router.push("/");
    // }
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

    let userFeeds;

    if (this.props.userFeeds) {
      userFeeds = Object.keys(this.props.userFeeds).map((userFeedKey, i) => {
        let subfeeds = this.props.userFeeds[userFeedKey].subfeeds.map((subfeed, j) => {
          return (<SubfeedItem className="subfeed-item" key={j} subfeed={subfeed}/>);
        });
        return (
          <div key={i}>
            <div className="plugin-name">
              <i className="fa fa-caret-down" aria-hidden="true"></i>
              {this.props.userFeeds[userFeedKey].name}
            </div>

            {subfeeds}
          </div>
        );
      });
    } else {
      userFeeds = (<div></div>);
    }

    let name, image;
    if (this.props.currentUser) {
      let link;
      if (this.props.currentUser.fbId === "guest") {
        link = "http://soarmedical.com/wp-content/uploads/2012/01/headshot-placeholder.png";
      } else {
        link = `http://graph.facebook.com/${this.props.currentUser.fbId}/picture/`;
      }

      image = (<img className="user-profile-image" src={link}/>);
      name = this.props.currentUser.name;
    } else {
      image = (<i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>);
      name = "User name";
    }

    return (
      <div className="dashboard-container">
        <div className="side-bar-container">

          <div className="user-container">
            {image}
            <div className="user-name">{name}</div>
            <button className="logout-button" onClick={this.handleLogout} title="Logout">
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

            <div>Your subscriptions</div>
            <ul>{userFeeds}</ul>
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
