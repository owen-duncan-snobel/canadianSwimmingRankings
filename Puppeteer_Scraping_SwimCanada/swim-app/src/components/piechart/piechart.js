import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'

class Piechart extends Component {
    // * Props can be deconstructed from meetData: {meetData (Meet Names), meetNumber (Array of number of occ. of each meet)}
    render() {

        let data;
        // * If no data has been passed down from the form or invalid display empty form
        if (this.props.meetData == null) {
            data = {
                datasets: [
                    {
                        label: ''
                    }
                ]
            }
        } else {
            data = {
                labels: this.props.meetData.meetName,
                datasets: [{
                    data: this.props.meetData.meetNumber,
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