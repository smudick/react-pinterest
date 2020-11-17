import React, { Component } from 'react';

export default class PinsCard extends Component {
  render() {
    const { pin } = this.props;
    return (
      <div className='card m-3'>
        <img className='card-img-top' src={pin.imageUrl} alt='Card cap'></img>
        <div className='card-body'>
          <h5 className='card-title'>{pin.name}</h5>
          <p className='card-text'>{pin.description}</p>
        </div>
      </div>
    );
  }
}
