import React from "react";
import {withRouter} from "react-router";
import Modal from "react-modal";

class AppItem extends React.Component{
  constructor(props) {
    super(props);
    this.handleAddApp = this.handleAddApp.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.requestFeeds = this.requestFeeds.bind(this);

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

  handleAddApp() {
    const app = require(`../../../plugins/${this.props.app.path}/frontend`);
    const frontend = new app();
    this.modalContent = frontend.getSubFeedForm(this.requestFeeds);
    this.openModal();
  }

  requestFeeds(data) {
    this.props.addSingleUserSubfeed(this.props.app.id, data);
    this.closeModal();
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
        top             : '150px',
        left            : '200px',
        right           : '200px',
        bottom          : '150px',
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
      <div className="app-item-container">
        <div className="app-name">{this.props.app.name}</div>
        <img className="app-logo" src={this.props.app.logo} />

        <button className="add-plugin-button"
          onClick={this.handleAddApp}>
          <i className="fa fa-plus-circle" aria-hidden="true"></i>Add
        </button>

        <Modal

          isOpen={this.state.ModalOpen}
          onRequestClose={this.closeModal}
          style={style}
          className="add-subfeed-modal" >

          <div>{this.modalContent}</div>


        </Modal>

      </div>
    );
  }
}

export default withRouter(AppItem);
