import React, { Component } from 'react';
import Chart from "chart.js";
import * as d3 from 'd3';
import data from '../../2020-01-08/Female_0_Events/Female_50_Back_0.csv';
import classes from "./scatterGraph.module.css";


class ScatterGraph extends Component {
    // Load the data from csv into d3 to parse it
    chartRef = React.createRef();
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        const newData = d3.dsv('|', data).then(function (text) {
            var swimmersTimes = text.map(x => x.TIME);
            new Chart(myChartRef, {
                type: "scatter",
                data: {
                    //Bring in data
                    labels: [],
                    datasets: [{
                        data: swimmersTimes
                    }]
                },
            })
        });
    };


    render() {
        return (
            <div className={classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}
export default ScatterGraph;