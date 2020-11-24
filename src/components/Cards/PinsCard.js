import React, { Component } from 'react';
import PinForm from '../Forms/PinForm';
import AppModal from '../AppModal';

export default class PinsCard extends Component {
  render() {
    const { pin, removePin } = this.props;
    return (
      <div className='card m-3'>
        <img className='card-img-top board-img' src={pin.imageUrl} alt='Card cap'></img>
        <div className='card-body'>
          <h5 className='card-title'>{pin.name}</h5>
          <p className='card-text'>{pin.description}</p>
          {(this.props.isOnHome !== true) ? (
          <div className='d-flex justify-content-center'>
          <button className='btn btn-danger mr-1' id={pin.firebaseKey} onClick={(e) => removePin(e)}>Delete Pin</button>
          <AppModal title={'Edit Pin'} buttonLabel={'Edit Pin'} buttonColor={'success'}>
            <PinForm onUpdate={this.getPins} pin={this.props.pin}/>
          </AppModal>
          </div>
          ) : (
             <div></div>
          )
          }
        </div>
      </div>
    );
  }
}
