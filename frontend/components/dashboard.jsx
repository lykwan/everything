import React from "react";

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady.bind(this);
  }

  onYouTubeIframeAPIReady() {

  }

  render() {
    return (
      <div>
        <div id="player"></div>
      </div>

    );
  }
}


export default Dashboard;
