import React from 'react';
import { getAllUserPins } from '../helpers/data/pinData';
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

  render() {
    const { pins, loading } = this.state;
    const showPins = () => pins.map((pin) => (
      <PinsCard key={pin.firebaseKey} pin={pin} />
    ));
    return (
      <>
      { loading ? (
        <Loader />
      ) : (
        <>
          <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
            <PinForm onUpdate={this.getPins}/>
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
