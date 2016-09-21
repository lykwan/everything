import React from "react";

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.embedYoutubeVideo = this.embedYoutubeVideo.bind(this);
    this.player;
  }

  componentDidMount() {
    this.embedYoutubeVideo();
  }

  embedYoutubeVideo() {

    const onPlayerReady = (event) => {
     event.target.playVideo();
   };

    let done = false;
    const onPlayerStateChange = (event) => {
    //  if (event.data == YT.PlayerState.PLAYING && !done) {
    //    setTimeout(stopVideo, 6000);
    //    done = true;
    //  }
    };

    const stopVideo = () => {
      this.player.stopVideo();
    };

    let playerTag = document.getElementById('player');
    let options = {
      height: '200',
      width: '320',
      videoId: 'M7lc1UVf-VE',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }};

    const onYouTubeIframeAPIReady = () => {
    };
    this.player = new YT.Player(playerTag, options);

    // onYouTubeIframeAPIReady();
    debugger
  }


  render() {

    return (
      <div>
        <div id="player">In the player div</div>
        <div>Hello from Dashboard</div>
      </div>
    );
  }
}

export default Dashboard;
