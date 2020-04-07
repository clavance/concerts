import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Main from './Main.js';
import Login from './Login.js';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/">
            <Login />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default App;
