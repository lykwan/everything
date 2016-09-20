import React from "react";

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.embedYoutubeVideo = this.embedYoutubeVideo.bind(this);
  }

  componentDidMount() {
    this.embedYoutubeVideo();
  }

  embedYoutubeVideo() {
    console.log("embedding");

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.

    let player;
    let playerTag = document.getElementById('player');
    let options = {
      height: '200',
      width: '320',
      videoId: 'M7lc1UVf-VE',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }};

    function onYouTubeIframeAPIReady() {
      this.player = new YT.Player(playerTag, options)
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
     event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    let done = false;
    function onPlayerStateChange(event) {
    //  if (event.data == YT.PlayerState.PLAYING && !done) {
    //    setTimeout(stopVideo, 6000);
    //    done = true;
    //  }
    }
    function stopVideo() {
     player.stopVideo();
    }
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
