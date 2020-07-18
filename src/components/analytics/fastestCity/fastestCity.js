import React from 'react';
import { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import * as SwimFormulas from '../../../constants/graphFunctions/graphFunctions';
import PropTypes from 'prop-types';

defaults.global.legend.display = false;

/**
 * @component
 * @example
 * const allData = [
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "***********",
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
    "__EMPTY_3": "***********",
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
]
 * return (
 *  <FastestCity swimmerData={allData} />
 * )
 */
class FastestCity extends Component {

    render() {
        let allSwimmerData = this.props.swimmerData;
        let colorArray;
        let meetCity;
        let meetCityKey;
        let meetCityNum;
        let data = {};
        if (allSwimmerData === null) {
            return (
                <div> </div>
            )
        } else {

            try {
                meetCity = Array.from(SwimFormulas.mostOccurrences(SwimFormulas.meetCity(allSwimmerData))).sort((a, b) => a[1] - b[1]);
                meetCityKey = meetCity.map(city => city[0]);
                meetCityNum = meetCity.map(number => number[1]);

                // * Creates The Colors for the PieChart depending on how many distinct meets there are
                colorArray = SwimFormulas.colorArray(meetCity.length);

                data = {
                    labels: meetCityKey,
                    datasets: [{
                        data: meetCityNum,
                        backgroundColor: colorArray
                    }]
                }
            }
            catch {
                console.log('Error: Unable to convert data for fastest meets')
            }
            return (
                <div>
                    <b><h4 className="formTitle">Location of Meet City  </h4></b> Based On Meet City: (Of selected age group and gender).
                    < Pie name="Meet City Piechart" data={data} height={175} />
                </div >
            )
        }
    }
}

FastestCity.propTypes = {
    /**
     *  Swimmer Data is an Array of Swimmer Objects. *refer to ProcessingData.md for object specifications*
     */
    swimmerData: PropTypes.arrayOf(PropTypes.object).isRequired
}

FastestCity.defaultProps = {
    swimmerData: null
}
export default FastestCity;