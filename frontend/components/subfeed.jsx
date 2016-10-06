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
      this.props.requestSubfeeds(nextProps.params.subfeedId);
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
      name = "Loading";
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
