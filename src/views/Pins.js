import React from 'react';
import { getAllUserPins, deletePin } from '../helpers/data/pinData';
import PinsCard from '../components/Cards/PinsCard';
import getUid from '../helpers/data/authData';
import Loader from './Loader';
import PinForm from '../components/Forms/PinForm';
import AppModal from '../components/AppModal';

class Pins extends React.Component {
  state = {
    pins: [],
    loading: true,
  }

  componentDidMount() {
    this.getPins();
  }

  getPins = () => {
    const uid = getUid();
    getAllUserPins(uid).then((response) => {
      this.setState({
        pins: response,
        loading: false,
      });
    });
  }

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
    const { pins, loading } = this.state;
    const showPins = () => pins.map((pin) => (
      <PinsCard
        key={pin.firebaseKey}
        pin={pin}
        removePin={this.removePin}
      />
    ));
    return (
      <>
      { loading ? (
        <Loader />
      ) : (
        <>
          <AppModal title={'Create Pin'} buttonLabel={'Create Pin'} buttonColor={'primary'}>
            <PinForm onUpdate={this.getPins()} pin={this.state.pin}/>
          </AppModal>
          <h1>All Pins</h1>
          <div className='d-flex flex-wrap justify-content-center'>
            {showPins()}
          </div>
        </>
      )}
      </>
    );
  }
}

export default Pins;
