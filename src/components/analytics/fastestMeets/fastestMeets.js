import React from 'react';
import { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import * as SwimFormulas from '../../../constants/graphFunctions/graphFunctions';
import PropTypes from 'prop-types';


/**
 *  Returns a Piegraph with the number of Meet occurences for each distinct Meetname.
 * @component
  * @example
 * const allData = [
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "*********",
    "__EMPTY_4": 37370,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "23.54",
    "__EMPTY_8": 23.54,
    "FINA 2019": 637,
    "__EMPTY_9": 1,
    "__EMPTY_10": 43813,
    "__EMPTY_11": "Toronto",
    "__EMPTY_12": "Ontario Junior International",
    "__EMPTY_13": "Oakville Aquatic Club"
  },
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "*********",
    "__EMPTY_4": 37277,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "24.31",
    "__EMPTY_8": 24.31,
    "FINA 2019": 578,
    "__EMPTY_9": 2,
    "__EMPTY_10": 43792,
    "__EMPTY_11": "London",
    "__EMPTY_12": "LAC - Nothers Fall Invitational",
    "__EMPTY_13": "Oakville Aquatic Club"
  }
];
 * const event = '50m Free';
 * return (
 *  <FastestMeets swimmerData={allData} swimEvent={event} />
 * )
 * 
 */
class FastestMeets extends Component {

    render() {
        let allData = this.props.swimmerData;
        let meetData = [];
        let data;
        let options;
        let meets;
        let meetName;
        let meetNumber;
        let colorArray;

        if (allData === null) {
            return (
                <div> </div>
            )
        } else {
            try {
                allData.forEach(swimmer => {
                    meetData.push(swimmer);
                })

                meets = meetData.map(meet => meet.__EMPTY_12);
                // * Converts the Meet Data Map into useable 'key' and 'value' arrays for graphing
                meets = Array.from(SwimFormulas.mostOccurrences(meets)).sort((a, b) => b[1] - a[1]);
                meetName = meets.map(name => name[0]);
                meetNumber = meets.map(number => number[1]);

                // * Creates The Colors for the PieChart depending on how many distinct meets there are
                colorArray = SwimFormulas.colorArray(meets.length);

                data = {
                    labels: meetName,
                    datasets: [{
                        data: meetNumber,
                        backgroundColor: colorArray
                    }]
                }
                options = {
                    legend: {
                        display: false
                    }
                }
            } catch {
                console.log('Error: Unable to convert data for fastest meets')
            }
        }
        return (
            <div className='p-1'>
                <h4 className='formTitle'>Fastest Meets</h4> Based On Meet Where Best Times Were Swam.
                <div>
                    <Pie data={data} options={options} height={150} />
                </div>
            </div>
        )
    }
}

FastestMeets.propTypes = {
    /**
     *  Swimmer Data is an Array of Swimmer Objects. *refer to ProcessingData.md for object specifications*
     */
    swimmerData: PropTypes.arrayOf(PropTypes.object),
    /**
     *  Swim Event is a string passed of the event name (ex. 50m Free, 100 Back)
     */
    swimEvent: PropTypes.string
}
FastestMeets.defaultProps = {
    swimmerData: null,
    swimEvent: ''
}
export default FastestMeets;