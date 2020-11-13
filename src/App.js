import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';

const App = ({ isAuth }) => {
  return (
    <div className="wrapper">
      <Route exact path={["/login", "/register"]} component={Auth} />
      <Route exact path="/" render={() => isAuth ? <Home /> : <Redirect to='/login' />} />
    </div>
  )
}

export default connect(({ user }) => ({ isAuth: user.isAuth }))(App);