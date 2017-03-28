'use strict';

import React from 'react';
import { fbDB } from '../../firebase';
import Snackbar from 'material-ui/Snackbar';
import _ from 'lodash';

// import 'react-toastify/dist/ReactToastify.min.css';

/** -------- Selectors ---------- */
import { getGameId, getGameLog } from '../../redux/reducers/game-reducer';

class NotificationComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      open: false,
    };
    this.timer = undefined;

  }

  componentWillMount() {

    const { gameId } = this.props;

    this.gameLogRef = fbDB.ref(`gameLog/${gameId}`);
    this.gameLogEventHandler = snapshot => {
      console.log('notficiation child_added');
      this.setState({
        open: true,
        message: snapshot.val().text
      });

      this.timer = setTimeout(() => {
        this.setState({
          open: false
        });
        clearTimeout(this.timer);
      }, 5000);
    };
    this.gameLogRef.on('child_added', this.gameLogEventHandler);
  }

  componentWillUnMount() {
    this.gameLogRef.off('child_added', this.gameLogEventHandler);
  }

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.open}
          message={this.state.message}
          autoHideDuration={5000}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameId: getGameId(state)
});

export default connect(mapStateToProps)(NotificationComponent);

