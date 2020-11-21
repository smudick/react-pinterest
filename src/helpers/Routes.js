import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../views/Home';
import Pins from '../views/Pins';
import Boards from '../views/Boards';
import NotFound from '../views/NotFound';
import SingleBoard from '../views/SingleBoard';
import SearchResults from '../views/SearchResults';

export default function Routes({ user }) {
  return (
    <div className='App'>
      <Switch>
        <Route
          exact
          path='/'
          component={() => <Home user={user} />}
        />
        <PrivateRoute
          exact
          path='/boards'
          component={Boards}
          user={user}
        />
        <PrivateRoute
          exact
          path='/pins'
          component={Pins}
          user={user}
        />
        <PrivateRoute
          exact
          path='/boards/:id'
          component={SingleBoard}
          user={user}
        />
        <PrivateRoute
          extact
          path='/search/:term/:type'
          component={SearchResults}
          user={user}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  const routeChecker = (taco) => (user ? (
      <Component {...taco} user={user} />
  ) : (
      <Redirect to={{ pathname: '/', state: { from: taco.location } }} />
  ));

  return <Route {...rest} render={(props) => routeChecker(props)} />;
};
