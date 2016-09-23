import React from "react";
import {withRouter} from "react-router";
import FeedItem from "../feed_item.jsx";

class AppDetails extends React.Component{
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      this.props.requestCurrentUser();
    }
    this.props.requestSingleApp(this.props.params.appId);
  }

  render() {

    let feeds;

    if (this.props.loggedIn && this.props.appFeeds) {
      feeds = this.props.appFeeds.map((feed, idx) => {
        return (
          <FeedItem feed={feed}/>
        );
      });
    } else {
      feeds = (<div>no app details yet</div>);
    }

    return (
      <div className="feeds-container">
        <div>Helloe from app details page</div>
        <ul>{feeds}</ul>
      </div>
    );
  }
}

export default withRouter(AppDetails);
