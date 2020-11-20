import React from 'react';
import Loader from './Loader';
import Auth from '../components/Auth';
import getUid from '../helpers/data/authData';
import PinsCard from '../components/Cards/PinsCard';
import { getPublicPins } from '../helpers/data/pinData';

export default class Home extends React.Component {
  state = {
    pins: [],
    loading: true,
    user: '',
  }

  componentDidMount() {
    this.getPins();
    const userID = getUid();
    this.setState({
      user: userID,
    });
  }

  getPins = () => {
    getPublicPins().then((response) => {
      this.setState({
        pins: response,
        loading: false,
      });
    });
  }

  render() {
    const { pins, user } = this.state;
    const loadComponent = () => {
      let component = '';
      if (user === null) {
        component = <Loader />;
      } else if (user) {
        component = pins.map((pin) => (
          <PinsCard key={pin.firebaseKey} pin={pin} />
        ));
      } else {
        component = <Auth />;
      }
      return component;
    };
    return (
      <div>
        <h1>Home Page</h1>
        <div className='d-flex flex-wrap justify-content-center'>
        {loadComponent()}
        </div>
      </div>
    );
  }
}
