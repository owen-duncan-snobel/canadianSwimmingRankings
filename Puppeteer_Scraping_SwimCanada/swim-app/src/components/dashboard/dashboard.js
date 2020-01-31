import React, { Component } from 'react';
import Chart from '../chartjs/chartjs';


/**
 *  ! The dashboard is responsible for housing the Chart and styling for the chart
 *  ! it also will pass the chart back to the main app.
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
                        // CONVERT RACE TIMES INTO MS TO BE ABLE TO GRAPH IT CORRECTLY
                        let milli = ((parseInt(x.TIME.split(':')[0] * 60000)) + (parseInt(x.TIME.split(':')[1].split('.')[0] * 1000)) + (parseInt(x.TIME.split('.')[1])));
                        // console.log(milli)
                        return milli
                    })
                }]
            },
            options: {
                title: {
                    display: true,
                    text: "Swimming Power Rankings"
                }
            }
        }
    }

    render() {
        return (
            <div className="Dashboard for Chart">
                <Chart options={this.state.options} data={this.state.data} />
                {console.log(this.props)}
                {console.log(this.state)}
            </div>
        )
    }
}
export default Dashboard;