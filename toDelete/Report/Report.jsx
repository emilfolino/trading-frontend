import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";



class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            kmom: {},
      };
    }

    componentDidMount() {
     fetch('https://me-api.holmersson.se/reports/' + this.props.parameters)
     .then(results => {
         return results.json();
     }).then(data => {
         this.setState({kmom:data.data})
     })
    }


  render() {
      console.log(this.state.kmom.content);
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                content={
                  <div>
                    <div dangerouslySetInnerHTML={{ __html: String(this.state.kmom.content) }} />
                      {/*<MDReactComponent text={String(this.state.kmom.content)} />*/}
                </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Report;
