import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";
import {reactLocalStorage} from 'reactjs-localstorage';

import dashboardRoutes from "routes/dashboard.jsx";

class Dashboard extends Component {

    constructor(props) {
        super(props);
        reactLocalStorage.set('token', false);
        reactLocalStorage.set('message', 'No message');        
      }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar {...this.props} />
        <div id="main-panel" className="main-panel" ref="mainPanel">
        <Header {...this.props} />
          <Switch>
            {dashboardRoutes.map((prop, key) => {

              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
              return (
                <Route
                    path={prop.path}
                    key={key}
                    render={(props) => <prop.component {...props} parameters={prop.parameters} />}
                />
              );
            })}
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
