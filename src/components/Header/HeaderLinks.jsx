import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import {reactLocalStorage} from 'reactjs-localstorage';


class HeaderLinks extends Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: false,
        buttonLabel: "Login"
      };
    }

    checkLogin() {
        // if (reactLocalStorage.get("token") !== 'false') {
        //     this.setState({
        //         buttonLabel: "Logout"
        //     });
        //     return true;
        // }
        //
        // this.setState({
        //     buttonLabel: "Login"
        // });
        return false;
    }

    setRedirect = () => {
      this.setState({
        redirect: true
      })
    }

    renderRedirect = () => {
      if (this.state.redirect) {
          this.setState({
              redirect: false
          });
          if (this.checkLogin()) {
              reactLocalStorage.set('token', false);
              reactLocalStorage.set('message', "User logged out.");
              return <Redirect to='/message' />
          }

        return <Redirect to='/user/login' />
      }
    }

  render() {

    return (
      <div>
         {this.renderRedirect()}
         {this.checkLogin()}
         <button className="btn-fill btn-secondary btn pull-right" onClick={this.setRedirect}>{this.state.buttonLabel}</button>
        </div>
    );
  }
}

export default HeaderLinks;
