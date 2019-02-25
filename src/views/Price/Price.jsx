import React, { Component } from "react";
import {
  Grid,
  Row
} from "react-bootstrap";

import io from 'socket.io-client';
import Rickshaw from 'rickshaw';
import 'rickshaw/rickshaw.min.css';


class Price extends Component {

    constructor(props) {
        super(props);

        this.state = {
          url: document.getElementById("connect_url"),
          outputLog:[],
          messageText: '',
          nick: 'Enter_nickname'
        };
    }

    componentDidMount() {
        let graphs = {};
        let first = true;
        let graphContainer = document.getElementById("graphs");

        const socket = io('https://trading-prices.holmersson.se');

        socket.on('connect', () => {
            console.log("Connected");
        });

        socket.on('disconnect', () => {
            console.log("Disconnected");
        });

        socket.on('stocks', (message) => {
            if (first) {
                var palette = new Rickshaw.Color.Palette({ scheme: 'colorwheel' });

                message.map((rate) => {
                    let graphTitle = document.createElement("h1");

                    graphTitle.textContent = rate.name;

                    let graphElement = document.createElement("div");

                    graphContainer.appendChild(graphTitle);
                    graphContainer.appendChild(graphElement);

                    let graph = new Rickshaw.Graph({
                        element: graphElement,
                        width: "400",
                        height: "300",
                        renderer: "line",
                        series: new Rickshaw.Series.FixedDuration([{
                            name: rate.name,
                            color: palette.color(),
                        }], undefined, {
                            timeInterval: 5000,
                            maxDataPoints: 1000,
                            timeBase: new Date().getTime() / 1000
                        })
                    });

                    graph.configure({
                        width: graphContainer.clientWidth,
                    });

                    new Rickshaw.Graph.Axis.Time( { graph: graph } );

                    new Rickshaw.Graph.Axis.Y({
                        graph: graph,
                        orientation: 'left',
                        tickFormat: Rickshaw.Fixtures.Number.formatKMBT
                    });

                    new Rickshaw.Graph.HoverDetail({
                        graph: graph
                    });

                    graph.render();

                    let slug = this.slugify(rate.name);

                    graphs[slug] = {
                        name: rate.name,
                        graph: graph,
                    };

                    return rate;
                });
                first = false;
            }

            message.map((rate) => {
                let slug = this.slugify(rate.name);
                let data = {};

                data[rate.name] = rate.current;
                graphs[slug].graph.series.addData(data);
                graphs[slug].graph.render();

                return rate;
            });
        });
    }

    slugify(text) {
        return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w-]+/g, '')       // Remove all non-word chars
        .replace(/--+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }



  render() {
    return (
      <div className="content">
      <Grid fluid>
        <Row>
            <h1>Real-time Banan prices</h1>
            <div class="graphs" id="graphs"></div>
        </Row>
      </Grid>
      </div>
    );
  }
}

export default Price;
