import React from "react";
import {withRouter} from "react-router";
import FeedItem from "./feed_item.jsx";
import $ from "jquery";

class Feeds extends React.Component{
  constructor(props) {
    super(props);
    this.handleInfiniteScroll = this.handleInfiniteScroll.bind(this);

  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.requestCurrentUser();
    }
    this.props.requestUserFeeds();
    window.scrollTo(0,0);
    $(window).scroll(this.handleInfiniteScroll);
  }


  handleInfiniteScroll() {
    if($(window).scrollTop() + $(window).height() >= $(document).height()) {
      console.log("bottom!");
      if (this.props.feeds) {
        // this.props.requestMoreUserFeeds(this.props.feeds.lastItemIds);
      }
    }
  }

  render() {

    let feeds;
    if (this.props.loggedIn && this.props.feeds) {

      feeds = this.props.feeds.map((feed, idx) => {
        return (
          <FeedItem key={idx} feed={feed}/>
        );
      });
    } else {
      feeds = (<div>No feeds added yet</div>);
    }

    return (
      <div className="feeds-container">
        <ul className="feeds-list-container">{feeds}</ul>
      </div>
    );
  }
}

export default withRouter(Feeds);
