import React, { Component } from 'react';
import Chart from "chart.js";
import * as d3 from 'd3';
import data from '../../2020-01-08/Female_0_Events/Female_50_Back_0.csv';
import data2 from '../../2020-01-08/Male_0_Events/Male_50_Back_0.csv';
import classes from "./scatterGraph.module.css";
import { zip } from 'd3';


{/* MOST LIKELY WILL GO BACK AND USE ALL REACT CHART.JS FOR THIS
THAT WAY I AM ABLE TO SWAP THE DATA AND RERENDER WHEN THE DROP DOWN CHANGES ETC */ }
const divStyle = {
    margin: '2%',
};
class ScatterGraph extends Component {

    // Load the data from csv into d3 to parse it
    chartRef = React.createRef();
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");

        // Styling for the  Graph 
        var gradientStroke = myChartRef.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, "#80b6f4"); gradientStroke.addColorStop(1, "#f49080");
        var gradientFill = myChartRef.createLinearGradient(500, 0, 100, 0);

        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0.6)");
        gradientFill.addColorStop(1, "rgba(244, 144, 128, 0.6)");


        const newData = d3.dsv('|', data).then(function (text) {
            {/* Create an array of x,y objects from the csv data to graph */ }
            text = text.reverse();
            const swimmerTimes = text.map(x => x.TIME);
            const swimmerRanks = text.map(x => x.RANK);
            const swimmerAthletes = text.map(x => x.ATHLETES);

            new Chart(myChartRef, {
                type: "line",
                data: {
                    //Bring in data
                    labels: swimmerRanks,
                    datasets: [
                        {
                            /* For gradient graph refer to bookmark for more info 
                            https://blog.vanila.io/chart-js-tutorial-how-to-make-gradient-line-chart-af145e5c92f9
                            */
                            label: " Female Swimming times",
                            data: swimmerTimes,
                            borderColor: gradientStroke,
                            pointBorderColor: gradientStroke,
                            pointBackgroundColor: gradientStroke,
                            pointHoverBackgroundColor: gradientStroke,
                            pointHoverBorderColor: gradientStroke,
                            fill: true,
                            backgroundColor: gradientFill,
                            showLine: true,
                        } /* ,
                        { 
                            label: "Male Swimming times",
                            data: swimmerTimes2,

                        }  */
                    ]
                },
                options: {
                    //Customize chart options
                    responsive: true,
                    maintainAspectRatio: false,
                    title: {
                        display: true,
                        text: 'Female 50m Backstroke'
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Times",
                                lineHeight: 2
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Names and Rank",
                                lineHeight: 2,
                            }
                        }]
                    }, tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {

                                // BY ADDING EXTRA ITEMS INTO THE TOOL TIP I COULD PASS FURTHER PROPERTIES INTO IT
                                // AKA YEAR OF RACE TO COMPARE TO PREVIOUS YEARS OR DIFFERENT THINGS FROM CSV
                                // WILL NEED TO ADD LOGIC TO CHECK IF FEMALE OR MALE
                                // AKA IF DATA == MALE RETURN ONE OTHERWISE RETURN FEMALE
                                var tooltipArr = [swimmerAthletes[text.length - tooltipItem.xLabel] + " " + tooltipItem.value];
                                // tooltipArr.push("Rank: " + tooltipItem.xLabel);
                                return tooltipArr;
                            }
                        }
                    }
                },

            })
        });

    };

    render() {

        return (
            <div style={divStyle} className={classes.graphContainer} >
                <canvas
                    style={{ height: "500px" }}
                    id="myChart"
                    ref={this.chartRef}
                    aria-label={"Graph of Swimmers Times"}
                />
            </div >

        )
    }
}
export default ScatterGraph;