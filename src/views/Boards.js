import React, { Component } from 'react';
import boardData from '../helpers/data/boardData';
import BoardsCard from '../components/Cards/BoardsCard';
import getUid from '../helpers/data/authData';
import Loader from './Loader';
import BoardForm from '../components/Forms/BoardForm';

export default class Boards extends Component {
  state = {
    boards: [],
    loading: true,
  }

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
  }

  // setLoading = () => {
  //   this.timer = setInterval(() => {
  //     this.setState({ loading: false });
  //   }, 1000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.timer);
  // }

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
        <BoardForm onUpdate={this.getBoards}/>
        <h2>All Boards</h2>
        <div className='d-flex flex-wrap justify-content-center'>{showBoards()}</div>
        </>
      )}
    </>
    );
  }
}
