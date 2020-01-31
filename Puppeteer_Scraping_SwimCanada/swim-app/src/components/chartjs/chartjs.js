import React, { Component } from 'react';
import { Scatter, Line } from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'City'
    }
    render() {
        return (
            <div className="Chart">
                <Line data={this.state.data}
                >
                </Line>
            </div>
        )
    }
}
export default Chart;