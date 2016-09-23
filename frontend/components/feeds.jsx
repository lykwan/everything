import React from "react";
import {withRouter} from "react-router";
import FeedItem from "./feed_item.jsx";

class Feeds extends React.Component{
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.requestCurrentUser();
    }
  }

  render() {

    let feeds;
    if (this.props.loggedIn && this.props.feeds) {
      feeds = this.props.feeds.map((feed, idx) => {
        return (
          <FeedItem feed={feed}/>
        );
      });
    } else {
      feeds = (<div>no feeds yet</div>);
    }

    return (
      <div className="feeds-container">
        <div>Hello from feeds!!</div>
        <ul>{feeds}</ul>
      </div>
    );
  }
}

export default withRouter(Feeds);
