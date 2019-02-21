import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import {reactLocalStorage} from 'reactjs-localstorage';



class ReportAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
          route: '',
          title: '',
          content:'',
          token: ''
        };
        this.state.token = reactLocalStorage.get("token");
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
          const { route, title, content } = this.state;
          fetch('https://me-api.holmersson.se/reports', {
              method: 'POST',
              headers: new Headers({
                    "Content-Type": "application/json",
                    "x-access-token": this.state.token
                }),
              body: JSON.stringify({"route":route,"title":title,"content":content}),
          }).then(results => {
              return results.json();

          }).then(data => {
              if (data.result) {
                  reactLocalStorage.set('message', "Rapport upplagd");
              } else {
                  console.log(data.err);
                  reactLocalStorage.set('message', "Du måste vara inloggad för att kunna ladda upp en rapport");
              }
              this.props.history.push(`/message`);
          })
        }

  render() {
    return (
      <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Lägg till ny rapport"
              content={
                  <form onSubmit={this.onSubmit}>
                  <Col md={6}>
                  <label>Route</label>
                    <input
                      class="form-control"
                      type="text"
                      name="route"
                      placeholder="kmom01"
                      onChange={this.onChange}
                    />
                    </Col>
                    <Col md={6}>
                    <label>Title</label>
                    <input
                      class="form-control"
                      type="text"
                      name="title"
                      placeholder="KMOM01"
                      onChange={this.onChange}
                    />
                    </Col>
                    <Col md={12}>
                    <label>Content</label>
                    <input
                      class="form-control"
                      type="text"
                      name="content"
                      placeholder="innehåll"
                      onChange={this.onChange}
                    />
                    </Col>
                    <button class="btn-fill btn-info btn" type="submit">Skicka in</button>
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

export default ReportAdd;
