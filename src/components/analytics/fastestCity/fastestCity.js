import React from 'react';
import { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import * as SwimFormulas from '../../../constants/graphFunctions/graphFunctions';

defaults.global.legend.display = false;

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
                    < Pie name="Meet City Piechart" data={data} height={150} />
                </div >
            )
        }
    }
} export default FastestCity;