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
                labels: this.props.data.data.reverse().map(x => x.RANK),
                datasets: [{
                    // Gets the event name passed from the app (top layer)
                    label: this.props.data.data[0].AGE + ' ' + this.props.event
                }]
            }
        }
    }

    render() {
        return (
            <div className="Dashboard for Chart">
                <Chart data={this.state.data} />
                {console.log(this.props)}
            </div>
        )
    }
}
export default Dashboard;