import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';

const App = ({ isAuth }) => {
  return (
    <div className="wrapper">
      <Switch>
        <Route
          exact
          path={["/signin", "/signup", "/signup/verify"]}
          component={Auth}
        />
        <Route
          path="/"
          render={() => (isAuth ? <Home /> : <Redirect to="/signin" />)}
        />
      </Switch>
    </div>
  )
}

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);