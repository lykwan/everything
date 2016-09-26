import React from "react";
import Iframe from "react-iframe";
import Youtube from "react-youtube";

class Frontend {
  constructor() {

  }

  getSubFeedForm(cb) {
    return (
        <form className="add_subfeed_form" onSubmit={this.handleSubfeedAdd.bind(this, cb)}>
          <div className="plugin-name">Youtube</div>

          <div className="add-subfeed-label">Name: </div>
          <input className="subfeed-name" type="text" />

          <div className="add-subfeed-label">Channel: </div>
          <input type="text" className="subfeed-link"/>

          <input type="submit" className="subfeed-button" value="submit"/>
        </form>
    );
  }


  handleSubfeedAdd(e, cb) {
    e.preventDefault();
    const subfeedParams =
    JSON.stringify({
      subfeedName: $('.subfeed-name').val(),
      channelName: $('.subfeed-link').val(),
    });
    const data = {subfeedName: $('.subfeed-name').val(),
                  subfeedParams: subfeedParams
                };
    cb(data);
  }


  getDisplayHTML(params) {
    let params = JSON.parse(params);
    const opts = {
       height: '360',
       width: '480',
       playerVars: {
         autoplay: 1
       }
     };

    return (
      <div>
        <div className="feed-item-title">{params.title}</div>

          <YouTube
            videoId={params.videoId}
            className="ytplayer"
            opts={opts}
            onReady={this.handleYoutubePlayer}
            onPlay={this.handleYoutubePlayer}
            onPause={this.handleYoutubePlayer}
            onEnd={this.handleYoutubePlayer}
            onError={this.handleYoutubePlayer}
            onStateChange={this.handleYoutubePlayer}
            onPlaybackRateChange={this.handleYoutubePlayer}
            onPlaybackQualityChange={this.handleYoutubePlayer}
          />

          <div className="feed-item-description">{params.description}</div>
      </div>
    );
  }

  handleYoutubePlayer(e) {
    console.log("in youtube player callback");
    console.log(e.target);
  }

  getAuthForm() {

  }

}

module.exports = Frontend;
