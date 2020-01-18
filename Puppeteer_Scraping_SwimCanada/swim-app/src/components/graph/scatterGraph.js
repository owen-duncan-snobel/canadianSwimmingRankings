import React, { Component } from 'react';
import Chart from "chart.js";
import * as d3 from 'd3';
import data from '../../2020-01-08/Female_0_Events/Female_50_Back_0.csv';
import classes from "./scatterGraph.module.css";

{/* MOST LIKELY WILL GO BACK AND USE ALL REACT CHART.JS FOR THIS
THAT WAY I AM ABLE TO SWAP THE DATA AND RERENDER WHEN THE DROP DOWN CHANGES ETC */ }
class ScatterGraph extends Component {
    // Load the data from csv into d3 to parse it
    chartRef = React.createRef();
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        const newData = d3.dsv('|', data).then(function (text) {
            {/* Create an array of x,y objects from the csv data to graph */ }
            var swimmersObject = [];
            for (let el of text) {
                swimmersObject.push({ x: el.RANK, y: el.TIME });
            }
            swimmersObject = swimmersObject.reverse();
            console.log(swimmersObject)

            //   console.log(swimmersObject);
            new Chart(myChartRef, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Female 50 Back fastest times',
                        data: swimmersObject
                    }],
                    option: {
                        legend: {
                            reverse: true,
                        }
                    }
                },
            }).render();
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