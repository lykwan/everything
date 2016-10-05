import React from "react";
import {withRouter} from "react-router";

class SubfeedItem extends React.Component{
  constructor(props) {
    super(props);
    this.handleSubfeedClick = this.handleSubfeedClick.bind(this);

  }

  handleSubfeedClick(subfeedId) {
    this.props.router.push(`/dashboard/subfeeds/${subfeedId}`);

  }

  render() {

    return (
      <div className="subfeeds-list-item" onClick={this.handleSubfeedClick.bind(this, this.props.subfeed.id)}>
        {this.props.subfeed.name}
      </div>
    );
  }
}

export default withRouter(SubfeedItem);
