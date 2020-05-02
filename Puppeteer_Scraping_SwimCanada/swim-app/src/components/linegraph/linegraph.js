import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
/**
 *   The dashboard is responsible for housing the Chart and styling for the chart
 *   it also will pass the chart back to the main app.
 */


// TODO NEED TO RECREATE THE TABLE THAT IS USED ON THE MAIN PAGE FOR THE SELECTION OF DATA TO GRAB THE LINK FROM

class Linegraph extends Component {
    render() {
        let data;
        let options;
        // * If no data has been passed down from the form or invalid display empty form
        if (this.props.swimmerData == null) {
            data = {
                datasets: [
                    {
                        label: ''
                    }
                ]
            }
        } else {
            data = {
                labels: this.props.swimmerData.rank,
                datasets: [{
                    label: this.props.swimEvent,
                    backgroundColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: ['rgb(255, 99, 132)'],
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: this.props.swimmerData.time,
                }]
            }

            options = {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 0 // general animation time
                },
                onClick: function (event, item) {
                    // * Error handling is needed for if a point is not clicked but within the canvas
                    if (!(item.length === 0)) {
                        let index = item[0]._index;
                        // * Resets the point that was clicked prior back to original colour
                        for (let i = 0; i < item[0]._chart.config.data.datasets[0].data.length; i++) {
                            item[0]._chart.config.data.datasets[0]['pointBackgroundColor'][i] = 'rgb(255, 99, 132)';
                        }
                        // * Sets the point clicked colour to highlighted color
                        item[0]._chart.config.data.datasets[0]['pointBackgroundColor'][index] = 'white';
                        this.update();
                    }
                },
                tooltips: {
                    callbacks: {
                        // * Updates the Tooltips (Graph Points) with the Name,Time 
                        label: (tooltipItem, data) => {
                            // * Label Array is used to create multiple labels inside of data element in graph. 
                            let labelArr = [];
                            labelArr.push(this.props.swimmerData.athletes[tooltipItem.label - 1] + ' ' + new Date(tooltipItem.yLabel).toISOString().substr(14, 8));
                            return labelArr;
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Times (Seconds)",
                        },
                        ticks: {
                            callback: function (v) {
                                //* Responsible for the time graphing for the y-axis (converts ms to a readable format)
                                return new Date(v).toISOString().substr(14, 8)
                            }
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Rank",
                        }
                    }]
                }
            }
        }


        return (
            <div>
                <div className="App">Canadian Swimming Rankings</div>
                <div name="DashboardforChart">
                    <Line data={data} options={options} height={400}> </Line>
                </div>
            </div >
        )
    }
}
export default Linegraph;