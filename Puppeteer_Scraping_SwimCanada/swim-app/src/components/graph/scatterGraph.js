import React, { Component } from 'react';
import Chart from "chart.js";
import * as d3 from 'd3';
import classes from "./scatterGraph.module.css";
import moment from '../../../node_modules/moment/moment'


// Filters all datasets to allow graph to pick from active data
let dirTree = require('../graph/dirTree.json');
let d = [];
dirTree.map(function (years) {
    return (
        // Shows all the years folders in the dirTree
        years.children.map(function (course) {
            return (
                // Shows all the Short/Long Courses for the years in the dirTree
                course.children.map(function (date) {
                    return (
                        // Shows all the dates of scraping for the years in the dirTree
                        date.children.map(function (eventsFolder) {
                            // Shows all the path to the files in the dirTree
                            return (
                                eventsFolder.children.map(e => d.push(e.path))
                            )
                        })
                    )
                })
            )
        })
    )
})


// NEED TO COME BACK AND CHANGE
d = d.filter(d => d.includes("Female_0_Events"))
let data = require('../../swimmerData/' + d[0]);
console.log(d[0])

{/* MOST LIKELY WILL GO BACK AND USE ALL REACT CHART.JS FOR THIS
THAT WAY I AM ABLE TO SWAP THE DATA AND RERENDER WHEN THE DROP DOWN CHANGES ETC */ }
const divStyle = {
    margin: '2%',
};
class ScatterGraph extends Component {

    // Loads the data from csv into d3 to parse it
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
            // console.log(text)
            text = text.reverse();

            const swimmerTimes = text.map(function (x) {
                // Convert to a more managable and standardized time format (mm:ss.SS)
                if (x.TIME.length === 5) x.TIME = '00:' + x.TIME;
                if (x.TIME.length === 7) x.TIME = '0' + x.TIME;
                // CONVERT RACE TIMES INTO MS TO BE ABLE TO GRAPH IT CORRECTLY
                let milli = ((parseInt(x.TIME.split(':')[0] * 60000)) + (parseInt(x.TIME.split(':')[1].split('.')[0] * 1000)) + (parseInt(x.TIME.split('.')[1])));

                return (milli)
            });
            //  console.log(swimmerTimes)

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
                            // WORK ON LOGIC FOR WHEN PROP PASSES FILE NAMES

                            label: d[0].split('/')[3].split('_')[0] + " Swimming times",
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
                        // Will need to change the d0 to be the prop passed to it
                        text: d[0].split('/')[4].split('_').splice(0, 3).join(' ')
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Times",
                            },
                            ticks: {
                                callback: function (v) {
                                    // Responsible for the time graphing for the y-axis (converts ms to a readable format)
                                    return epoch_to_hh_mm_ss(v);
                                },

                            }


                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Names and Rank",
                            }
                        }]
                    }, tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                // BY ADDING EXTRA ITEMS INTO THE TOOL TIP I COULD PASS FURTHER PROPERTIES INTO IT
                                // AKA YEAR OF RACE TO COMPARE TO PREVIOUS YEARS OR DIFFERENT THINGS FROM CSV
                                // WILL NEED TO ADD LOGIC TO CHECK IF FEMALE OR MALE
                                // AKA IF DATA == MALE RETURN ONE OTHERWISE RETURN FEMALE
                                var tooltipArr = [];
                                // Validates if the item directly beside it is a tie
                                if (tooltipItem.index !== text.length - tooltipItem.xLabel) {
                                    tooltipArr = [swimmerAthletes[(text.length - 1) - tooltipItem.xLabel] + " " + back_to_mm_ss_SS(tooltipItem.value)];
                                }
                                else {
                                    tooltipArr = [swimmerAthletes[text.length - tooltipItem.xLabel] + " " + back_to_mm_ss_SS(tooltipItem.value)];
                                }

                                // tooltipArr.push("Rank: " + tooltipItem.xLabel);
                                return tooltipArr;
                            }
                        },
                    }
                },

            })
        });

        function epoch_to_hh_mm_ss(epoch) {
            // console.log(new Date(epoch).toISOString());
            return new Date(epoch).toISOString().substr(14, 8)
        }
        // F
        function back_to_mm_ss_SS(ms) {
            // Function is responsible for converting the tool tips back into the correct time format
            let mins = ((ms / 60000) + '').split('.')[0];
            let seconds = ((((ms - (mins * 60000)) / 1000) + '').split('.')[0]);
            let milli = ((ms - ((mins * 60000) + (seconds * 1000))) + '')
            // remember to validate length to keep all string the same validate min 2 , seconds 2, ms 2
            if (mins.length < 2) mins = '0' + mins;
            if (seconds.length < 2) seconds = '0' + seconds;
            if (milli.length < 2) milli = '0' + milli;
            return mins + ':' + seconds + '.' + milli;
        }
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



