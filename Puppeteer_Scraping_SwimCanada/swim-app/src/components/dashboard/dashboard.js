import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

/**
 *   The dashboard is responsible for housing the Chart and styling for the chart
 *   it also will pass the chart back to the main app.
 */


// TODO NEED TO RECREATE THE TABLE THAT IS USED ON THE MAIN PAGE FOR THE SELECTION OF DATA TO GRAB THE LINK FROM

class Dashboard extends Component {

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
                    //  TODO POTENTIALLY STYLE 1st,2nd,3rd Place to be coloured gold silver bronze to make finding the 
                    label: this.props.swimEvent,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: this.props.swimmerData.time,
                }]
            }

            options = {
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    duration: 0 // general animation time
                },
                tooltips: {
                    callbacks: {
                        // * Updates the Tooltips (Graph Points) with the Name,Time 
                        label: (tooltipItem, data) => {
                            // * Label Array is used to create multiple labels inside of data element in graph. 
                            let labelArr = [];
                            labelArr.push(this.props.swimmerData.athletes[tooltipItem.label - 1] + ' ' + tooltipItem.yLabel);
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
                                return v;
                                // Responsible for the time graphing for the y-axis (converts ms to a readable format)
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
                <div className="App">Canadian Swimmings Power Rankings</div>
                <div className="Dashboard for Chart">
                    <Line data={data} options={options}> </Line>
                </div>
            </div >
        )
    }
}
export default Dashboard;