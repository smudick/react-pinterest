# Pinterest

![screencapture-localhost-3000-boards-2020-11-23-21_19_49](https://user-images.githubusercontent.com/65687019/100043962-198e3980-2dd4-11eb-88a0-14c2ef080434.png)

## Deployed Site

Check it out <a href="https://sm-react-pinterest.netlify.app/">here!</a>

[![Netlify Status](https://api.netlify.com/api/v1/badges/ac41a525-bc87-4fe8-94b6-fb39aed7bff7/deploy-status)](https://app.netlify.com/sites/sm-react-pinterest/deploys)

## Description

This is a copy of the site Pinterest. It allows users to create and save Pins and attach them to Boards which hold similar items. Users can edit and delete pins and boards as well. This app also includes a search bar where users can get specific pins or boards based on a search term. 

## Development

Built with React, and styled with Bootstrap and Reactstrap elements. Firebase used for authentication and database. Version Control through Github. Deployed with Netlify

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

