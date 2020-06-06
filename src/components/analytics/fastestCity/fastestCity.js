import React from 'react';
import { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import * as SwimFormulas from '../../../constants/graphFunctions/graphFunctions';


class FastestCity extends Component {

    render() {
        let allSwimmerData = this.props.swimmerData;
        let colorArray;
        let meetCity;
        let meetCityKey;
        let meetCityNum;
        let data = {};
        let options = {};
        if (allSwimmerData === null) {
            return (
                <div> </div>
            )
        } else {

            try {
                meetCity = Array.from(SwimFormulas.mostOccurences(SwimFormulas.meetCity(allSwimmerData))).sort((a, b) => a[1] - b[1]);
                meetCityKey = meetCity.map(city => city[0]);
                meetCityNum = meetCity.map(number => number[1]);

                console.log(meetCity)
                // * Creates The Colors for the PieChart depending on how many distinct meets there are
                colorArray = SwimFormulas.colorArray(meetCity.length);

                data = {
                    labels: meetCityKey,
                    datasets: [{
                        data: meetCityNum,
                        backgroundColor: colorArray
                    }]
                }
                options = {
                    legend: {
                        display: false
                    }
                }
            }
            catch {
                console.log('Error: Unable to convert data for fastest meets')
            }
            return (
                <div>
                    <b><h4 className="formTitle">Location of Meet City  </h4></b> Based on Meet City of best time.
                    < Pie name="Meet City Piechart" data={data} />
                </div >
            )
        }
    }
} export default FastestCity;