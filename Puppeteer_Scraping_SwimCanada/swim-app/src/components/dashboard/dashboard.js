import React, { Component } from 'react';
import Chart from '../chartjs/chartjs';


/**
 *  ! The dashboard is responsible for housing the Chart and styling for the chart
 *  ! it also will pass the chart back to the main app.
 * 
 * 
 *  Used for changing the y-axis to match the correct time format
 *  Is called from within the Dashboard constructor for the chart
 *  Converts Millisecond string/number to a ISOString representation of it in (mm:ss.SS)
 */

const epoch_to_hh_mm_ss = (epoch) => {
    return new Date(epoch).toISOString().substr(14, 8)
}


var dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

/** 
 * Converting back from ISO (mm:ss.SS) into Milliseconds for correct functionaly of tooltips
*/


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                // x-axis label is the swimming ranks from (50-1 for the specified event respectively)
                labels: this.props.data.data.reverse().map(x => x.RANK),
                datasets: [{
                    // Gets the event name passed from the app (top layer)
                    label: this.props.event,
                    data: this.props.data.data.map(function (x) {
                        if (x.TIME.length === 5) x.TIME = '00:' + x.TIME;
                        if (x.TIME.length === 7) x.TIME = '0' + x.TIME;
                        // CONVERTS RACE TIMES INTO Milliseconds TO BE ABLE TO GRAPH IT CORRECTLY
                        let milli = ((parseFloat(x.TIME.split(':')[0] * 60000))
                            + (parseFloat(x.TIME.split(':')[1].split('.')[0] * 1000))
                            + (parseFloat(x.TIME.split('.')[1] * 10)));
                        return milli
                    }),

                },
                {
                    // Gets the event name passed from the app (top layer)
                    label: this.props.event,
                    data: this.props.data.data,

                }
                ],


            },
            options: {
                title: {
                    display: true,
                    text: "Swimming Power Rankings"
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function (x) {
                                return epoch_to_hh_mm_ss(x);
                            }
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        // Logic for tooltips and repeating ties for swimmers
                        label: function (tooltip, data) {
                            let tooltipArr = [];
                            tooltipArr = [swimmerAthletes[tooltip.index] + " " + epoch_to_hh_mm_ss(tooltip.yLabel)];
                            return tooltipArr;
                        }
                    }
                }
            }
        }
        // The names of the swimmers to be passed into the tooltips
        const swimmerAthletes = this.props.data.data.map(x => x.ATHLETES.split(',').reverse().join(' '));

    }

    render() {
        return (
            <div className="Dashboard for Chart">
                <Chart options={this.state.options} data={this.state.data} />
            </div>
        )
    }
}
export default Dashboard;