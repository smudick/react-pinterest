import React, { Component } from 'react';
import getUserBoards from '../helpers/data/boardData';
import BoardsCard from '../components/Cards/BoardsCard';
import getUid from '../helpers/data/authData';
import Loader from './Loader';

export default class Boards extends Component {
  state = {
    boards: [],
    loading: true,
  }

  componentDidMount() {
    const uid = getUid();
    getUserBoards(uid).then((response) => {
      this.setState({
        boards: response,
      }, this.setLoading);
    });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => boards.map((board) => (
        <BoardsCard key={board.firebaseKey} board={board} />));
    return (
      <>
      { loading ? (
        <Loader />
      ) : (
        <>
        <h2>All Boards</h2>
        <div className='d-flex flex-wrap container'>{showBoards()}</div>
        </>
      )}
    </>
    );
  }
}
