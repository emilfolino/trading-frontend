import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import {reactLocalStorage} from 'reactjs-localstorage';



class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          password: ''
        };
        reactLocalStorage.set('user', '');
        reactLocalStorage.set('token', false);

      }

      onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
      }

      onSubmit = (e) => {
          e.preventDefault();
          // get form data out of state
          const { email, password } = this.state;

          fetch('https://trading-api.holmersson.se/login', {
              method: 'POST',
              headers: {
                    "Content-Type": "application/json"
                },
              body: JSON.stringify({"email":email,"pwd":password}),
          }).then(results => {
              return results.json();
          }).then(data => {

              if (data.result) {
                  reactLocalStorage.set('token', data.token);
                  reactLocalStorage.set('message', "User logged in");
                  reactLocalStorage.set('user', email);
              } else {
                  reactLocalStorage.set('message', data.err);
              }
              this.props.history.push(`/message`);
          })
        }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={10}>
              <Card
                title="Login"
                content={
                    <form onSubmit={this.onSubmit}>
                    <Col md={6}>
                      <input
                        class="form-control"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.onChange}
                      />
                      </Col>
                      <Col md={6}>
                      <input
                        class="form-control"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onChange}
                      />
                      </Col>

                      <button class="btn-fill btn-info btn pull-right" type="submit">Login</button>
                      <div className="clearfix" />
                    </form>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
