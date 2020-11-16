import React from 'react';
import Boards from './Boards';
import Auth from '../components/Auth';

export default function Home({ authed }) {
  const loadComponent = () => {
    let component = '';
    if (authed) {
      component = <Boards />;
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
