import React from "react";

class Frontend {
  constructor() {

  }

  addSubFeedForm() {
    return (
      <div>
        <div className="plugin-name">Youtube</div>
        <div className="subfeed-name-label">Name: </div>
        <input className="subfeed-name" type="text" />
        <div className="subfeed-name-label">Link: </div>
        <input type="text" className="sub-feed-link"/>
        <input type="submit" className="sub-feed-add-button" value="submit"/>
      </div>
    );
  }

  getAuthForm() {

  }

  getDisplayHTML(params) {
    return (<div id="ytplayer"></div>);
  }

}

module.exports = Frontend;
