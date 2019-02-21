import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import {reactLocalStorage} from 'reactjs-localstorage';


class Message extends Component {

    constructor(props) {
        super(props);
        this.state = {
          message: ''
        };
        this.state.message = reactLocalStorage.get("message");
      }

  render() {
    return (
      <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              content={
                  <h1>{this.state.message}</h1>
              }
            />
          </Col>
        </Row>
      </Grid>
      </div>
    );
  }
}

export default Message;
