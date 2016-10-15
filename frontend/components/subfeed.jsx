import React from "react";
import {withRouter} from "react-router";
import FeedItem from "./feed_item.jsx";
import $ from "jquery";

class Subfeed extends React.Component{
  constructor(props) {
    super(props);
    this.handleInfiniteScroll = this.handleInfiniteScroll.bind(this);
  }

  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.requestCurrentUser();
    }
    this.props.requestSubfeeds(this.props.params.subfeedId);
    window.scrollTo(0,0);
    $(window).off("scroll");
    $(window).scroll(this.handleInfiniteScroll);
  }

  componentWillUpdate (nextProps) {
    if (this.props.subfeeds && this.props.subfeeds.subfeedId !== nextProps.params.subfeedId) {
      this.props.requestSubfeeds(nextProps.params.subfeedId);
      window.scrollTo(0,0);
    }
  }

  handleInfiniteScroll() {
    // console.log("got to infinite scroll");
    // console.log("document height");
    // console.log($(document).height());
    // console.log("scroll top height");
    // console.log($(window).scrollTop());
    // console.log("window height");
    // console.log($(window).height());
    if($(window).scrollTop() + $(window).height() >= $(document).height()) {
      console.log("bottom!");
      if (this.props.subfeeds) {
        this.props.requestMoreSubfeeds(this.props.subfeeds.subfeedId, this.props.subfeeds.lastItemId);
      }
    }
  }


  render() {

    let feeds, name;
    if (this.props.currentUser && this.props.subfeeds) {

      feeds = this.props.subfeeds.feedItems.map((feed, idx) => {

          return (
            <FeedItem key={idx} feed={feed}/>
          );

      });
      name = this.props.subfeeds.feedItems[0].subfeedName;
    } else {
      name = "Loading...";
      feeds = (<div></div>);
    }

    return (
      <div className="subfeeds-container">
        <div className="subfeeds-name">{name}</div>
        <ul className="subfeeds-list-container" >
          {feeds}
        </ul>
      </div>
    );
  }
}

export default withRouter(Subfeed);
