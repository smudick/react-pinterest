# Pinterest

## Deployed Site

Check it out <a href="https://sm-react-pinterest.netlify.app/">here!</a>

## Description

This is a copy of the site Pinterest. It allows users to create and save Pins and attach them to Boards which hold similar items. Users can edit and delete pins and boards as well. This app also includes a search bar where users can get specific pins or boards based on a search term. 

## Development

Built with React, and styled with Bootstrap and Reactstrap elements. 

## Code Snippet

Pinterest is using React router to navigate through pages on the site and using a Private Route function to keep unauthenticated users from seeing certain content
```
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
```

