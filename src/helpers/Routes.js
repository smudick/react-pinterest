import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../views/Home';
import Pins from '../views/Pins';
import Boards from '../views/Boards';
import PinDetails from '../views/PinDetails';
import NotFound from '../views/NotFound';
import SingleBoard from '../views/SingleBoard';
import SearchResults from '../views/SearchResults';

export default function Routes({ user }) {
  return (
    <div className='App'>
        <Switch>
          <Route exact path='/' component={() => <Home user={user} />} />
          <Route exact path='/boards' component={() => <Boards user={user} />} />
          <Route exact path='/pins' component={() => <Pins user={user} />} />
          <Route exact path='/pin-details' component={() => <PinDetails user={user} />} />
          <Route exact path='/boards/:id' component={(props) => <SingleBoard user={user} {...props} />} />
          <Route extact path='/search/:term/:type' component={(props) => <SearchResults {...props} /> } />
          <Route component={NotFound} />
        </Switch>
    </div>
  );
}
