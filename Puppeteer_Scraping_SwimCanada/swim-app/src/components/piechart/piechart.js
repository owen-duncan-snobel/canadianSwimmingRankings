import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

class Piechart extends Component {
    // * Props can be deconstructed from meetData: {meetData (Meet Names), meetNumber (Array of number of occ. of each meet)}
    render() {

        let data;
        // * If no data has been passed down from the form or invalid display empty form
        if (this.props.meetData == null) {
            return (
                <div> </div>
            )
        } else {
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
        }

        return (
            <div>
                <h2>Pie Example</h2>
                <Pie data={data} height={100} />
                {console.log(this.props.meetData)}
            </div>
        )
    }
}
export default Piechart;