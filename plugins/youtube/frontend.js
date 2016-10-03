import React from "react";
import Youtube from "react-youtube";
import $ from "jquery";

class Frontend {
  constructor() {

  }

  getSubFeedForm(cb) {
    return (
        <form className="add-subfeed-form" onSubmit={this.handleSubfeedAdd.bind(this, cb)}>
          <div className="plugin-name">Youtube</div>

          <div className="add-subfeed-label">Name: (required)</div>
          <input type="text" className="subfeed-name"/>

          <div className="add-subfeed-label">Channel: (required)</div>
          <input type="text" className="subfeed-link" placeholder="(case sensitive)"/>

          <input type="submit" className="subfeed-button" value="SUBMIT"/>
        </form>
    );
  }


  handleSubfeedAdd(cb, e) {
    e.preventDefault();
    let channelName = $('.subfeed-link').val();
    if (channelName.length === 0) {
      channelName = "SesameStreet";
    }
    const subfeedParams =
    JSON.stringify({
      subfeedName: $('.subfeed-name').val(),
      channelName: channelName,
    });
    const data = {subfeedName: $('.subfeed-name').val(),
                  subfeedParams: subfeedParams
                };
    cb(data);
  }


  getDisplayComponent(params) {
    let info = JSON.parse(params);
    const opts = {
       height: '360',
       width: '480',
       playerVars: {
         autoplay: 1
       }
     };

    return (
      <div>
        <div className="feed-item-title">{info.title}</div>

          <YouTube
            videoId={info.videoId}
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

          <div className="feed-item-description">{info.description}</div>
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
