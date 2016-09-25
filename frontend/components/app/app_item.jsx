import React from "react";
import {withRouter} from "react-router";
import Modal from "react-modal";

class AppItem extends React.Component{
  constructor(props) {
    super(props);
    this.handleAddApp = this.handleAddApp.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    // this.addDisabled = false; //disabled = {this.addDisabled}  => should we add this when the app is already added?
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

  componentDidMount() {
    if (this.props.currentUser.apps.includes(this.props.app)) {
      this.addDisabled = true;
    }
  }

  handleAddApp() {
    this.props.addSingleUserApp(this.props.app.id);
    const app = require(`../../../plugins/${this.props.app.path}`);
    this.modalContent = app.addSubFeedForm;
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
        top             : '200px',
        left            : '200px',
        right           : '200px',
        bottom          : '200px',
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

    if (this.props.app) {
      return (
        <div className="app-item-container">
          <div>this.props.app.id</div>
          <div>this.props.app.name</div>
          <div>this.props.app.description</div>
          <div>this.props.app.logo</div>
          <button className="add-plugin-button"
            onClick={this.handleAddApp}>
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
          </button>

          <Modal

            isOpen={this.state.ModalOpen}
            onRequestClose={this.closeModal}
            style={style} >

            {this.modalContent}

          </Modal>

        </div>
      );
    } else {
      return (<div>no app item</div>);
    }
  }
}

export default withRouter(AppItem);
