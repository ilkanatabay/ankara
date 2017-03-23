import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, dataToJS } from 'react-redux-firebase'

import Modal from '../Modal/Modal';

import { loadModal, hideModal } from '../../redux/action-creators/modals';
import { MERCHANT_ENCOUNTER } from '../Modal/turn_dialog_types'

import { merchantOnLocation, mapCoordToLocation, merchantCount } from '../../utils';
import { endTurn } from '../../routes/move';

class DropAssistant extends React.Component {
  constructor(props) {
    super(props);

    this.handleDropAssistant = this.handleDropAssistant.bind(this);
    this.handleEndTurn = this.handleEndTurn.bind(this);
  }

  handleDropAssistant() {
    this.props.closeModal();
    if (merchantOnLocation(this.props.userId, this.props.currentPosition, this.props.merchants)) {
      let numMerchants = merchantCount(this.props.userId, this.props.currentPosition, this.props.merchants);
      this.props.openModal(MERCHANT_ENCOUNTER, {currentPosition: this.props.currentPosition, merchCount: numMerchants});
    } else {
      this.props.openModal(mapCoordToLocation(this.props.currentPosition));
    }
  }

  handleEndTurn() {
    endTurn(this.props.gameId, this.props.userId)
      .then(() => this.props.closeModal());
  }

  handleEndTurn() {
    this.props.closeModal();
    endTurn(this.props.gameId, this.props.userId);
  }

  render() {
    return (
      <Modal>
        <div id="turn-dialog-container">
          <img onClick={this.handleDropAssistant} src="images/turn_dialogs/drop_assistant.png" id="icon-turn-dialog" />
          <img onClick={this.handleEndTurn} src="images/turn_dialogs/end_turn.png" id="icon-turn-dialog" />
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  currentPosition: state.modal.payload.currentPosition,
  gameId: state.game.id,
  userId: state.user.user.uid,
  merchants: dataToJS(state.firebase, `games/${state.game.id}/merchants`)
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(hideModal()),
  openModal: (modalType, payload) => dispatch(loadModal(modalType, payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(DropAssistant);
