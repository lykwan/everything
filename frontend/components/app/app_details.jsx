import React from "react";
import {withRouter} from "react-router";
import FeedItem from "../feed_item.jsx";

class AppDetails extends React.Component{
  constructor(props) {
    super(props);

  }

  render() {

    let feeds;

    if (this.props.appFeeds) {
      feeds = this.props.appFeeds.map((feed, idx) => {
        return (
          <FeedItem feed={feed}/>
        );
      });
    } else {
      feeds = (<div></div>);
    }

    return (
      <div className="feeds-container">
        <ul>{feeds}</ul>
      </div>
    );
  }
}

export default withRouter(AppDetails);
