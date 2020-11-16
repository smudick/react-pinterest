import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../views/Home';
import Pins from '../views/Pins';
import Boards from '../views/Boards';
import PinDetails from '../views/PinDetails';
import NotFound from '../views/NotFound';
import PinForm from '../views/PinForm';
import SingleBoard from '../views/SingleBoard';
import BoardForm from '../views/BoardForm';

export default function Routes({ authed }) {
  return (
    <div className='App'>
        <Switch>
          <Route exact path='/' component={() => <Home authed={authed} />} />
          <Route exact path='/boards' component={() => <Boards authed={authed} />} />
          <Route exact path='/pins' component={() => <Pins authed={authed} />} />
          <Route exact path='/pin-details' component={() => <PinDetails authed={authed} />} />
          <Route exact path='/pin-form' component={() => <PinForm authed={authed} />} />
          <Route exact path='/single-board:id' component={(props) => <SingleBoard authed={authed} {...props} />} />
          <Route exact path='/board-form' component={() => <BoardForm authed={authed} />} />
          <Route component={NotFound} />
        </Switch>
    </div>
  );
}
