
/**
 * !!! CURRENTLY NOT NEEDED WILL HAVE TO GO BACK OVER LOGIC AND SEE HOW I WANT TO PROCEED WITH SPLITTING CHART APART FROM THE FETCH
 */

import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            options: this.props.options
        }

    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
    }
    render() {
        return (
            <Line
                data={this.state.data}
                options={this.state.options}
            >
                {console.log(this.state)}
                {/*console.log(this.state) */}
            </Line>
        )
    }
}
export default Chart;