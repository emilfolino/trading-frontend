import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Table
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import {reactLocalStorage} from 'reactjs-localstorage';

const thArray = ["Seller", "Stock (POUNDS)", "Price (SEK/POUNDS)", "Buy (POUNDS)"];

class Trade extends Component {

    constructor(props) {
        super(props);
        this.state = {
          email_buyer: '',
          trade:[],
          token: ''
        };
        this.state.email_buyer = reactLocalStorage.get("user");
        this.state.token = reactLocalStorage.get("token");
      }


      componentDidMount() {
       fetch('https://trading-api.holmersson.se/trade')
       .then(results => {
           return results.json();
       }).then(data => {
           this.setState({trade:data})
       })
      }


      onSubmit = (e) => {
          e.preventDefault();

          // token
          const token = this.state.token;

          // email_buyer
          const email_buyer = this.state.email_buyer;

          // email_seller
          console.log(e.target[0].value);
          const email_seller = e.target[0].value;

          // amount
          console.log(e.target[1].value);
          const amount = e.target[1].value;


          fetch('https:/trading-api.holmersson.se/trade', {
              method: 'POST',
              headers: new Headers({
                    "Content-Type": "application/json",
                    "x-access-token": token
                }),
              body: JSON.stringify({"email_buyer":email_buyer,"email_seller":email_seller,"amount":amount}),
          }).then(results => {
              return results.json();

          }).then(data => {
              if (data.result) {
                  console.log(data);
                  reactLocalStorage.set('message', "Transaction completed.");
              } else {
                  console.log(data.err);
                  reactLocalStorage.set('message', "Trade error");
              }
              this.props.history.push(`/message`);
          })
        }

        test(email) {
            if (email !== this.state.email_buyer) {
                return (
                    <form onSubmit={this.onSubmit}>
                    <Col md={3}>
                    <input
                    type="hidden"
                    name="email_seller"
                    value={email}
                    />
                    <input
                    class="form-control"
                    type="number"
                    name="amount"
                    />
                    </Col>
                    <Col md={2}>
                    <button class="btn-fill btn-info btn pull-right" type="submit">Buy</button>
                    <div className="clearfix" />
                    </Col>
                    </form>
                );
            } else {
                return ('');
            }
        }

  render() {
    return (
        <div className="content">
     <Grid fluid>
       <Row>
         <Col md={12}>
           <Card
             title={"Trading platform - " + this.state.email_buyer}
             ctTableFullWidth
             ctTableResponsive
             content={
               <Table striped hover>
                 <thead>
                   <tr>
                     {thArray.map((prop, key) => {
                       return <th key={key}>{prop}</th>;
                     })}
                   </tr>
                 </thead>
                 <tbody>
                   {this.state.trade.map((prop, key) => {
                     return (
                       <tr>
                           <td>{prop.email}</td>
                           <td>{prop.stock}</td>
                           <td>{prop.price}</td>
                           <td>
                                {this.test(prop.email)}
                           </td>
                     </tr>
                     );
                   })}
                 </tbody>
               </Table>
             }
           />
         </Col>
       </Row>
     </Grid>
   </div>
    );
  }
}

export default Trade;
