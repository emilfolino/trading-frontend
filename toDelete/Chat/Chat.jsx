import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";


class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
          url: document.getElementById("connect_url"),
          outputLog:[],
          messageText: '',
          nick: 'Enter_nickname'
        };
    }

    /**
     * Log output to web browser.
     *
     * @param  {string} message to output in the browser window.
     *
     * @return {void}
     */
    outputLogSet = (message) => {
        let now = new Date();
        let timestamp = now.toLocaleTimeString();
        let temp = this.state.outputLog;

        temp.push(timestamp + " " + message);

        this.setState({
            outputLog: temp
        });
    }


    /**
     * What to do when user clicks Connect
     */
    connect = (e) => {
        let url = "wss://chat.holmersson.se/";
        // let url = "ws://localhost:1338/";
        this.wss = new WebSocket(url+this.state.nick, "json");
        console.log("Connecting to: wss://chat.holmersson.se/", "json");

        this.wss.onopen = () => {
            console.log("The websocket is now open");
            console.log(this.wss);
            this.outputLogSet("The websocket is now open using '" + this.wss.protocol + "'.");
            console.log(this.state.outputLog);
        };


        this.wss.onmessage = (event) => {
            console.log("Receiving message: " + event.data);
            console.log(event);
            console.log(this.wss);
            let testar = JSON.parse(event.data);
            this.outputLogSet(testar["nick"] + ": " + testar["data"]);
        };

        this.wss.onclose = () => {
            console.log("The websocket is now closed.");
            console.log(this.wss);
            this.outputLogSet("Websocket is now closed.");
        };
    }


    /**
     * What to do when user clicks to send a message.
     */
    sendMessage = () => {
        let messageText = this.state.messageText;

        if (!this.wss || this.wss.readyState === 3) {
            console.log("The websocket is not connected to a server.");
        } else {
            this.wss.send(messageText);
            console.log("Sending message: " + messageText);
                this.outputLogSet("You said: " + messageText);
        }

        this.myInput.value = '';
    }

    /**
     * What to do when user clicks Close connection.
     */
    close = () => {
        console.log("Closing websocket.");
        this.wss.send("Client closing connection by intention.");
        this.wss.close();
        console.log(this.wss);
        this.outputLogSet("Prepare to close websocket.");
    };

    onChange = (e) => {
      /*
        Because we named the inputs to match their
        corresponding values in state, it's
        super easy to update the state
      */
      this.setState({ [e.target.name]: e.target.value });
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
                    <label>Nick name: </label><br />
                    <input
                        className="form-control"
                        onChange={this.onChange}
                        name="nick"
                        id="message"
                        type="text"
                    />
                  </p>
                  <br />
                  <br />

                  <p>
                      <label>Connect: </label><br />
                    <input
                        className="form-control"
                        id="connect_url"
                        type="text"
                        value="wss://chat.holmersson.se/"
                        readOnly
                        disabled="disabled"
                    />
                    <input
                        type="hidden"
                        id="protocol"
                        value="json"
                    />
                      <br />

                      <input className="btn btn-success btn-fill" onClick={(e) => this.connect(e)} id="connect" type="button" value="Connect"/>

                      <input className="btn btn-danger btn-fill" onClick={(e) => this.close(e)} id="close" type="button" value="Close connection"/>
                    </p>
                    <br />
                    <br />
                    <p>
                      <label>Send message: </label><br />
                      <input className="form-control" onChange={this.onChange} name="messageText" id="message" type="text" ref={input => {this.myInput = input;}}/>
                      <br />

                      <input className="btn btn-info btn-fill" onClick={(e) => this.sendMessage(e)} id="send_message" type="button" value="Send message"/>
                    </p>
                    <br />

                    <p>
                      <label>Log: </label><br />
                      <div id="output" class="output">
                            {
                                this.state.outputLog.map(test => <p> {test} </p>)

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

export default Chat;
