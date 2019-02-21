import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import {reactLocalStorage} from 'reactjs-localstorage';



class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email: '',
          balance: 0,
          stock: 0,
          price: 0,
          token: ''
        };
        this.state.email = reactLocalStorage.get("user");
        this.state.token = reactLocalStorage.get("token");
      }

      componentDidMount() {

          // token
          const token = this.state.token;

          // email
          const email = this.state.email;

          fetch('https://trading-api.holmersson.se/user', {
              method: 'POST',
              headers: new Headers({
                    "Content-Type": "application/json",
                    "x-access-token": token
                }),
              body: JSON.stringify({"email":email}),
          }).then(results => {
              return results.json();
          }).then(data => {
              this.setState({
                  email: data.user.email,
                  stock: data.user.stock,
                  price: data.user.price,
                  balance: data.user.balance
              });
          })
      }

      onChange = (e) => {
        /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
        this.setState({ [e.target.name]: e.target.value });
    }

      onSubmitBalance = (e) => {
          e.preventDefault();
          // get form data out of state
          const email = this.state.email;
          const amount = e.target[0].value;


          fetch('https://trading-api.holmersson.se/deposit', {
              method: 'POST',
              headers: new Headers({
                    "Content-Type": "application/json",
                    "x-access-token": this.state.token
                }),
              body: JSON.stringify({"email":email,"amount":amount}),
          }).then(results => {
              return results.json();
          }).then(data => {
              if (data.result) {
                  reactLocalStorage.set('message', "Deposit completed.");
              } else {
                  reactLocalStorage.set('message', data.err);
              }
              this.props.history.push(`/message`);
          })
        }

        onSubmitPrice = (e) => {
            e.preventDefault();
            // get form data out of state
            const email = this.state.email;
            const price = e.target[0].value;

            fetch('https://trading-api.holmersson.se/price', {
                method: 'POST',
                headers: new Headers({
                      "Content-Type": "application/json",
                      "x-access-token": this.state.token
                  }),
                body: JSON.stringify({"email":email,"price":price}),
            }).then(results => {
                return results.json();
            }).then(data => {
                if (data.result) {
                    reactLocalStorage.set('message', "Price updated.");
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
                title={"Trader information - " + this.state.email}
                content={
                    <Col md={12}>
                    <br></br>
                    <br></br>
                    <Row>
                        <Col md={4}>
                        <form>
                        <label>Current Account Balance (SEK)</label>
                        <input
                            class="form-control"
                            type="text"
                            name="amount"
                            value={this.state.balance}
                            readOnly
                        />
                        <div className="clearfix" />
                        </form>
                        </Col>

                    <Col md={4}>
                    <form onSubmit={this.onSubmitBalance}>
                    <label>Make deposit (SEK)</label>
                    <input
                        class="form-control"
                        type="number"
                        min="0"
                        name="balance"
                        placeholder="100"
                    />
                    <label>(Your credit card will be charged)</label>
                    <button class="btn-fill btn-test btn-danger btn pull-right" type="submit">Deposit</button>
                    <div className="clearfix" />
                </form>
                </Col>
                </Row>
                <Row>
                      <Col md={4}>
                      <label>Current Stock (POUNDS)</label>
                       <input
                         class="form-control"
                         type="text"
                         name="stock"
                         value={this.state.stock}
                         readOnly
                       />
                       </Col>
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                       <Col md={4}>
                       <form>
                       <label>Current Selling Price (SEK/POUND)</label>
                        <input
                          class="form-control"
                          type="text"
                          name="price"
                          value={this.state.price}
                          readOnly
                        />
                        <div className="clearfix" />
                        </form>
                        </Col>

                        <Col md={4}>
                        <form onSubmit={this.onSubmitPrice}>
                        <label>Update Selling Price</label>
                         <input
                           class="form-control"
                           type="number"
                           min="0"
                           name="price"
                           placeholder={this.state.price}
                         />
                         <button class="btn-fill btn-warning btn btn-test pull-right" type="submit">Update</button>
                         <div className="clearfix" />
                         </form>
                         </Col>

                        </Row>

                        </Col>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default User;
