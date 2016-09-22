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
    this.props.requestUserFeeds();
    this.props.requestUserApps();
  }

  handleLogout() {
    this.props.logout();
  }

  handleShowAll() {
    this.props.router.push("/dashboard/all");
  }

  handleAppClick(appId) {
    this.props.router.push(`/dashboard/apps/${appId}`);
  }

  handleAddApp() {
    this.props.router.push("/dashboard/apps");
  }


  // embedYoutubeVideo() {
  //
  //   const onPlayerReady = (event) => {
  //    event.target.playVideo();
  //  };
  //
  //   let done = false;
  //   const onPlayerStateChange = (event) => {
  //   //  if (event.data == YT.PlayerState.PLAYING && !done) {
  //   //    setTimeout(stopVideo, 6000);
  //   //    done = true;
  //   //  }
  //   };
  //
  //   const stopVideo = () => {
  //     this.player.stopVideo();
  //   };
  //
  //   let playerTag = document.getElementById('player');
  //   let options = {
  //     height: '200',
  //     width: '320',
  //     videoId: 'M7lc1UVf-VE',
  //     events: {
  //       'onReady': onPlayerReady,
  //       'onStateChange': onPlayerStateChange
  //     }};
  //
  //   const onYouTubeIframeAPIReady = () => {
  //   };
  //   this.player = new YT.Player(playerTag, options);
  //
  //   // onYouTubeIframeAPIReady();
  //   debugger
  // }

  // <div id="player">In the player div</div>

  render() {

    let apps;

    if (this.props.apps) {
      apps = this.props.apps.forEach((app, idx) => {
        return (
          <li key={idx} onClick={this.handleAppClick.bind(this, app.id)}>app.name</li>
        );
      });
    } else {
      apps = (<div></div>);
    }

    let name;
    if (this.props.currentUser) {
      name = this.props.currentUser.name;
    } else {
      name = "current user name";
    }

    return (
      <div>
        <div className="side-bar-container">
          <div>Hello from Dashboard</div>
          <div>{name}</div>
          <img src="http://graph.facebook.com/userid_here/picture"/>
          <button className="logout-button" onClick={this.handleLogout}>LOGOUT</button>
          <button className="all-button" onClick={this.handleShowAll}>All feeds</button>
          <ul>{apps}</ul>
          <button className="add-plugin-button" onClick={this.handleAddApp}>Add a new app</button>
        </div>
        <div className="children">{this.props.children}</div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
