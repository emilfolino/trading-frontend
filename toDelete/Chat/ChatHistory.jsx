import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";


class ChatHistory extends Component {

    constructor(props) {
        super(props);

        this.state = {
            outputLog:[]
        };

    }

    componentDidMount() {
     fetch('https://chat.holmersson.se/')
     .then(results => {
         console.log("utskrift från db");
         console.log(results);
         return results.json();

    }).then(data => {
        console.log(data);
        this.setState({outputLog:data})
    })
    }


  render() {
    return (
      <div className="content">
      <Grid fluid>
        <Row>
          <Col md={8}>
            <Card
              title="Chat"
              content={
                  <form id="form1">

                    <p>
                      <label>History - Log: </label><br />
                      <div id="output" class="output">
                            {
                                this.state.outputLog.map(test => <p> {test.timestamp}: ({test.nickname}) {test.message} </p>)

                            }
                      </div>
                    </p>

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

export default ChatHistory;
