import React from 'react';
import Loader from './Loader';
import Auth from '../components/Auth';

export default function Home({ user }) {
  const loadComponent = () => {
    let component = '';
    if (user === null) {
      component = <Loader />;
    } else if (user) {
      component = 'load all pins here';
    } else {
      component = <Auth />;
    }
    return component;
  };
  return (
    <div>
      <h1>Home Page</h1>
      {loadComponent()}
    </div>
  );
}
