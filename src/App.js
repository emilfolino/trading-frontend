import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from "layouts/Dashboard/Dashboard.jsx";

class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
          <Route path="/" component={Dashboard} />
          </Switch>
      </Router>
    );
  }
}

export default App;
