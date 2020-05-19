import React, { Component } from 'react'
import { EVENTS } from '../../constants/constants';
class PeakMonth extends Component {
    render() {
        if (this.props.swimmerData == null) {
            return (
                <div name="PeakMonth"> </div>
            )
        } else {

            let allData = this.props.swimmerData;
            let data = [];

            // * Need to process data from Workbook -> Worksheets -> Event -> Swimmers
            allData.forEach(Workbook => {

                // * In every Workbook (Age / Year) it holds Sheets with the Events, will select the sheet that contains the events data
                let Sheet = Workbook[EVENTS.indexOf(this.props.event)];

                // * For the selected event collect all the swimmer data
                Sheet.forEach(swimmer => {
                    data.push(swimmer);
                })
            })
            console.log(data);
            return (
                <div>workings</div>
            )
        }
    }
}
export default PeakMonth;