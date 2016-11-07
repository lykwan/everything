import React from "react";
import Youtube from "react-youtube";
import $ from "jquery";

class Frontend {
  constructor() {

  }

  getSubFeedForm(cb) {
    return (
        <form className="add-subfeed-form" onSubmit={this.handleSubfeedAdd.bind(this, cb)}>
          <div className="subfeed-form-plugin-name">Youtube</div>

          <div className="add-subfeed-label">Name: (required)</div>
          <input type="text" className="subfeed-form-name"/>

          <div className="add-subfeed-label">Channel: (required)</div>
          <input type="text" className="subfeed-form-link" placeholder="(case sensitive; omit spaces)"/>

          <input type="submit" className="subfeed-form-submit-button" value="Add Subfeed"/>
        </form>
    );
  }


  handleSubfeedAdd(cb, e) {
    e.preventDefault();
    let channelName = $('.subfeed-form-link').val();
    let subfeedName = $('.subfeed-form-name').val();
    if (channelName.length === 0) {
      channelName = "SesameStreet";
    }
    if (subfeedName.length === 0) {
      subfeedName = "Subfeed";
    }
    const subfeedParams =
    JSON.stringify({
      subfeedName: subfeedName,
      channelName: channelName
    });
    const data = {subfeedName: subfeedName,
                  subfeedParams: subfeedParams
                };
    cb(data);
  }


  getDisplayComponent(params) {
    //
    // let info = JSON.parse(params);
    // console.log(info);
    // const opts = {
    //    height: '360',
    //    width: '480',
    //    playerVars: {
    //      autoplay: 1
    //    }
    //  };
    //  debugger

     // <YouTube
     //   videoId={info.videoId}
     //   className="ytplayer"
     //   opts={opts}
     //   onReady={this.handleYoutubePlayer}
     //   onPlay={this.handleYoutubePlayer}
     //   onPause={this.handleYoutubePlayer}
     //   onEnd={this.handleYoutubePlayer}
     //   onError={this.handleYoutubePlayer}
     //   onStateChange={this.handleYoutubePlayer}
     //   onPlaybackRateChange={this.handleYoutubePlayer}
     //   onPlaybackQualityChange={this.handleYoutubePlayer}
     // />
    return (
      <div>
        <div className="feed-item-title">hi</div>

        <div className="feed-item-description">got here</div>
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
