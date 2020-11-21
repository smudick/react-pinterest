import React, { Component } from 'react';
import boardData from '../helpers/data/boardData';
import BoardsCard from '../components/Cards/BoardsCard';
import getUid from '../helpers/data/authData';
import Loader from './Loader';
import BoardForm from '../components/Forms/BoardForm';
import AppModal from '../components/AppModal';

export default class Boards extends Component {
  state = {
    boards: [],
    loading: true,
  };

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const uid = getUid();
    boardData.getAllUserBoards(uid).then((response) => {
      this.setState({
        boards: response,
        loading: false,
      });
    });
  };

  removeBoard = (e) => {
    const removedBoard = this.state.boards.filter(
      (board) => board.firebaseKey !== e.target.id,
    );
    this.setState({
      boards: removedBoard,
    });
    boardData.deleteBoard(e.target.id).then(() => {
      this.getBoards();
    });
  };

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => boards.map((board) => (
        <BoardsCard
          key={board.firebaseKey}
          board={board}
          removeBoard={this.removeBoard}
        />
    ));
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
              <BoardForm onUpdate={this.getBoards} />
            </AppModal>
            <h2>All Boards</h2>
            <div className='d-flex flex-wrap justify-content-center'>
              {showBoards()}
            </div>
          </>
        )}
      </>
    );
  }
}
