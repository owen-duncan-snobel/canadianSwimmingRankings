import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

class Piechart extends Component {
    // * Props can be deconstructed from meetData: {meetData (Meet Names), meetNumber (Array of number of occ. of each meet)}
    render() {

        let data;
        let options;
        let average;
        let median;

        // * If no data has been passed down from the form or invalid display empty form
        if (this.props.meetData === null) {
            return (
                <div> </div>
            )
        } else {
            // * For Pie Chart Graphing
            let meets = this.props.meetData.map(meet => meet.__EMPTY_12);
            // * Finds the Swim Meet with the most occurences of best times from the top 50 Swimmers
            const mostMeetOccurences = (list) => {
                let map = new Map();
                while (list.length !== 0) {
                    if (!map.has(list[0])) {
                        map.set(list[0], 1);
                    } else {
                        map.set(list[0], map.get(list[0]) + 1);
                    }
                    list.shift();
                }
                let meetName = Array.from(map.keys())
                let meetNumber = Array.from(map.values())
                return { meetName, meetNumber }
            }

            let meetData = mostMeetOccurences(meets);
            let meetName = meetData.meetName;
            let meetNumber = meetData.meetNumber;

            data = {
                labels: meetName,
                datasets: [{
                    data: meetNumber,
                    backgroundColor: ['red', 'yellow']
                }]
            }

            options = {
                legend: {
                    display: false
                }
            }


            // * Average and Median Times
            const averageTime = (time) => {
                let average = time.reduce((a, b) => a + b);
                return new Date(average / time.length).toISOString().substr(14, 8);
            }

            const medianTime = (time) => {
                let index = Math.floor(time.length / 2);
                let median;
                // * If the length % 2 === 0 (aka even number)
                if (time.length % 2 === 0 && time.length !== 0) {
                    // * Minus one is needed for correct array index of even number centre points
                    median = (time[index - 1] + time[index]) / 2;
                } else if (time.length % 2 === 1) {
                    median = time[index];
                }
                return new Date(median).toISOString().substr(14, 8)
            }

            const standardize_times = (time) => {
                // * Ensures that all time strings given are in an appropriate ISO String format
                if (time.length === 5) time = '00:' + time;
                if (time.length === 7) time = '0' + time;
                let milli = ((parseInt(time.split(':')[0] * 60000)) + (parseInt(time.split(':')[1].split('.')[0] * 1000)) + (parseInt(time.split('.')[1]) * 10));
                return milli;
            }
            let times = this.props.meetData.map(time => standardize_times(time.__EMPTY_7));
            average = averageTime(times);
            median = medianTime(times);
        }

        return (
            <div>
                <h2>Data Insights</h2>

                {/* Average, Median Times */}
                <h4 name="averageTime">The Average time is: {average}</h4>
                <h4 name="medianTime">The Median time is: {median}</h4>
                <h4 name="selectedTime">{this.props.swimmerName.split(',').reverse().join(' ').concat(':')} {this.props.swimmerTime}</h4>
                {console.log(this.props.swimmerName)}

                {/* * Fastest Meets */}
                {/**
                 *  TODO NEED to go back and add a table listing the fastest meets might be easier to view
                 */}
                <h4>Fastest Swim Meets:</h4>
                <Pie data={data} options={options} height={100} />
            </div>
        )
    }
}
export default Piechart;