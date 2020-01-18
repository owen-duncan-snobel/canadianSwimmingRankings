import React, { Component } from 'react';
import Chart from "chart.js";
import * as d3 from 'd3';
import data from '../../2020-01-08/Female_0_Events/Female_50_Back_0.csv';
import classes from "./scatterGraph.module.css";
import colorConstants from './colorConstants';


console.log(colorConstants);
{/* MOST LIKELY WILL GO BACK AND USE ALL REACT CHART.JS FOR THIS
THAT WAY I AM ABLE TO SWAP THE DATA AND RERENDER WHEN THE DROP DOWN CHANGES ETC */ }
class ScatterGraph extends Component {
    // Load the data from csv into d3 to parse it
    chartRef = React.createRef();
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        var gradientStroke = myChartRef.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#80b6f4"); gradientStroke.addColorStop(1, "#f49080");
        const newData = d3.dsv('|', data).then(function (text) {
            {/* Create an array of x,y objects from the csv data to graph */ }
            text = text.reverse();
            const swimmerTimes = text.map(x => x.TIME);
            const swimmerNames = text.map(x => x.ATHLETES);
            console.log(swimmerTimes);
            new Chart(myChartRef, {
                type: "line",
                data: {
                    //Bring in data
                    labels: swimmerNames,
                    datasets: [
                        {
                            label: "Swimming times",
                            data: swimmerTimes,
                            borderColor: gradientStroke,
                            pointBorderColor: gradientStroke,
                            pointBackgroundColor: gradientStroke,
                            pointHoverBackgroundColor: gradientStroke,
                            pointHoverBorderColor: gradientStroke
                            // pointBackgroundColor: colorConstants
                        }
                    ]
                },
                options: {
                    //Customize chart options

                }
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