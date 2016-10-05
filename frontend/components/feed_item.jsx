  import React from "react";
import {withRouter} from "react-router";
import Modal from "react-modal";

class FeedItem extends React.Component{
  constructor(props) {
    super(props);
    this.handleFeedClick = this.handleFeedClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.state = {
      ModalOpen: false,
    };
  }

  closeModal() {
    this.setState({ ModalOpen: false });
  }

  openModal() {
    this.setState({ ModalOpen: true });
  }

  handleFeedClick() {
    const app = require(`../../plugins/${this.props.feed.path}/frontend`);
    this.modalContent = app.getDisplayComponent(this.props.feed.params);
    this.openModal();
  }


  render() {

    const style = {
      overlay : {
        position        : 'fixed',
        top             : 0,
        left            : 0,
        right           : 0,
        bottom          : 0,
        backgroundColor : 'rgba(255, 255, 255, 0.7)',
        zIndex          : 10
      },
      content : {
        position        : 'fixed',
        top             : '100px',
        left            : '100px',
        right           : '100px',
        bottom          : '100px',
        border          : '2px solid #000',
        boxShadow       : '0 0 10px #909090',
        padding         : '25px',
        zIndex          : 11,
        display         : 'flex',
        flexDirection   : 'column',
        justifyContent  : 'center',
        backgroundColor : '#fff'
      }
    };

    return (
      <div className="feed-item-container">
        <img src={this.props.feed.image}
          onClick={this.handleFeedClick}/>
        <a href="#"
          onClick={this.handleFeedClick}>
          {this.props.feed.title}</a>
        <div>{this.props.feed.subfeedName}</div>


        <Modal

          isOpen={this.state.ModalOpen}
          onRequestClose={this.closeModal}
          style={style} >

          <div>modal content</div>
          <div>{this.modalContent}</div>

        </Modal>
      </div>
    );
  }
}

export default withRouter(FeedItem);
