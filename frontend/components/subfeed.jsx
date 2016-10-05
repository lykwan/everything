import React from "react";
import {withRouter} from "react-router";
import FeedItem from "./feed_item.jsx";

class Subfeed extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.requestCurrentUser();
    }
    if (!this.props.subfeeds) {
      this.props.requestSubfeeds(this.props.params.subfeedId);
    }
  }

  componentWillUpdate (nextProps) {
    if (this.props.subfeeds && this.props.subfeeds.subfeedId !== nextProps.params.subfeedId) {
      console.log("requesting");
      this.props.requestSubfeeds(nextProps.params.subfeedId);
    }
  }


  render() {

    let feeds;
    if (this.props.currentUser && this.props.subfeeds) {
      console.log(this.props.subfeeds);
      feeds = this.props.subfeeds.feedItems.map((feed, idx) => {

          return (
            <FeedItem key={idx} feed={feed}/>
          );

      });
    } else {
      feeds = (<div>no subfeeds yet</div>);
    }

    return (
      <div className="feeds-container">
        <div>Hello from subfeeds page</div>
        <ul>{feeds}</ul>
      </div>
    );
  }
}

export default withRouter(Subfeed);
