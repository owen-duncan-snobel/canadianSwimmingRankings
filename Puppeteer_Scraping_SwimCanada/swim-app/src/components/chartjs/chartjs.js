import React, { Component } from 'react';
import { Scatter, Line } from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            options: props.options
        }
        //  console.log(props.options)
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
    }
    render() {
        return (
            <div className="Chart">
                <Line
                    data={this.state.data}
                    options={this.state.options}
                >
                </Line>
            </div>
        )
    }
}
export default Chart;