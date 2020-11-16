import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class BoardsCards extends Component {
  render() {
    const { board } = this.props;
    return (
      <div className='card'>
        <img className='card-img-top' src={board.imageUrl} alt='Card cap'></img>
        <div className='card-body'>
          <h5 className='card-title'>{board.name}</h5>
          <p className='card-text'>{board.description}</p>
          <Link className='btn btn-primary' to={`/boards/${board.firebaseKey}`}>
            View Pins
          </Link>
        </div>
      </div>
    );
  }
}
