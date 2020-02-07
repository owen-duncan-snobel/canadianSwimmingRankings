import React, { Component } from 'react';
import Chart from '../chartjs/chartjs';


/**
 *  ! The dashboard is responsible for housing the Chart and styling for the chart
 *  ! it also will pass the chart back to the main app.
 * 
 * 
 *  Used for changing the y-axis to match the correct time format
 *  Is called from within the Dashboard constructor for the chart
 *  Converts Millisecond string/number to a ISOString representation of it in (mm:ss.SS)
 */

const epoch_to_hh_mm_ss = (epoch) => {
    return new Date(epoch).toISOString().substr(14, 8)
}


var dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

/** 
 * Converting back from ISO (mm:ss.SS) into Milliseconds for correct functionaly of tooltips
*/


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
        // The names of the swimmers to be passed into the tooltips
        //    const swimmerAthletes = this.props.data.data.map(x => x.ATHLETES.split(',').reverse().join(' '));

    }

    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        fetch("https://storage.googleapis.com/canadian-swimming-ranks.appspot.com/Short_Course/2011-2012_Male_18_200_Medley_Relay.json?GoogleAccessId=firebase-adminsdk-7x0t5%40canadian-swimming-ranks.iam.gserviceaccount.com&Expires=16447035600&Signature=GQWWh5zSHYvwHlo2XClrd%2B6%2BYizsoCaZyqoG2piowbnuX0XbrHrC9t%2ByQtNCCulq7tD9ZWeDBmbGgl%2FIL%2B5%2F5F7uOSPNJdRizsSQNFdSdeS9U11Wm4vbKczU%2BucI6BKjnW%2FRYfnx1QmbFdPMtUgBG%2FO6VSLmVkYeCqDFGKLVvPEnAJWHGshJ%2BkS1E3mJ3W7NWyt1x6Z9aDcjHfEszOKajcnF2C217EbdDhFQOPPynXUgyo9NCdK%2F1vgK3YbUC9u1NgR12MEhWWa0fQbN0iVmW1ZSaHj2TimT3SfZVys%2FbjN2jSyeb3j2nDV7%2FWRHQew2Ga5si2zzYz22xSNF9SDe9Q%3D%3D", {
            method: "GET",
            mode: 'cors'
        })
            .then(results => console.log(results));
    }

    render() {
        return (
            <div className="Dashboard for Chart">
                <Chart options={this.state.options} />
            </div>
        )
    }
}
export default Dashboard;