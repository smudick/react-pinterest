import React from 'react';
import { getBoardPins, getPin, deletePin } from '../helpers/data/pinData';
import boardData from '../helpers/data/boardData';
import PinsCard from '../components/Cards/PinsCard';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/AppModal';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    // 1. get board id from url params
    const boardFirebaseKey = this.props.match.params.id;
    // 2. API call to get board info
    this.getBoardInfo(boardFirebaseKey);
    // 3. API Call to get pins associated with boardId
    this.getPins(boardFirebaseKey).then((response) => {
      this.setState({
        pins: response,
      });
    });
  }

  getBoardInfo = (boardFirebaseKey) => {
    boardData.getSingleBoard(boardFirebaseKey).then((response) => {
      this.setState({
        board: response,
      });
    });
  }

  getPins = (boardFirebaseKey) => (
    getBoardPins(boardFirebaseKey).then((response) => {
      const pinsArray = [];
      response.forEach((item) => {
        pinsArray.push(getPin(item.pinId));
      });
      return Promise.all([...pinsArray]);
    })
  );

  removePin = (e) => {
    const removedPin = this.state.pins.filter(
      (pin) => pin.firebaseKey !== e.target.id,
    );
    this.setState({
      pins: removedPin,
    });
    deletePin(e.target.id).then(() => {
      this.getPins();
    });
  }

  render() {
    const { pins, board } = this.state;
    const renderPins = () => (
      pins.map((pin) => (<PinsCard key={pin.firebaseKey} pin={pin} removePin={this.removePin} />)));
    return (
      <div>
        <AppModal title={'Update Board'} buttonLabel={'Update Board'}>
        { Object.keys(board).length && <BoardForm board={board} onUpdate={this.getBoardInfo} />}
        </AppModal>
        <h1>{board.name}</h1>
        <div className='d-flex flex-wrap justify-content-center'>
          {renderPins()}
        </div>
      </div>
    );
  }
}
