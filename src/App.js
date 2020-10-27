import React from 'react';
import { Route } from 'react-router-dom';

import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';

const App = () => {
  return (
    <div className="wrapper">
      <Route exact path={["/", "/login", "/register"]} component={Auth} />
      <Route exact path="/im" component={Home} />
    </div>
  )
}

export default App;