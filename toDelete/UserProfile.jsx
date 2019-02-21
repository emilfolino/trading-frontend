import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
} from "react-bootstrap";

import { UserCard } from "components/UserCard/UserCard.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

var md5 = require("crypto-js/md5");

class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            meinfo: {},
      };
    }

    componentDidMount() {
     fetch('https://me-api.holmersson.se/')
     .then(results => {
         return results.json();
     }).then(data => {
         this.setState({meinfo:data})
     })
    }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>

            <Col md={7}>
              <UserCard
                bgImage="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400"
                avatar={"https://www.gravatar.com/avatar/" + md5(this.state.meinfo.email) + "?d=robohash"}
                name={this.state.meinfo.name}
                userName={this.state.meinfo.akronym}
                description={this.state.meinfo.description}
                socials={
                  <div>
                    <Button simple>
                    <a href="https://www.facebook.com/marcus.holmersson">
                      <i className="fa fa-facebook-square" />
                     </a>
                    </Button>
                    <Button simple>
                    <a href="https://github.com/mahw17">
                      <i className="fa fa-github" />
                    </a>
                    </Button>
                    <Button simple>
                        <a href="https://www.instagram.com/holmersson/?hl=sv">
                            <i className="fa fa-instagram" />
                        </a>
                    </Button>
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

export default UserProfile;
