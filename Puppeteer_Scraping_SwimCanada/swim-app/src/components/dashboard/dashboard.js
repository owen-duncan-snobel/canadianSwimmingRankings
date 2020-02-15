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


    // !!! NEED TO GO BACK AND SEARCH THE REACT FIREBASE / COMPONENT MOUNTING GUIDE FOR UPDATING THE STATE
    componentDidMount() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";

        fetch("https://storage.googleapis.com/canadian-swimming-ranks.appspot.com/Short_Course/2010-2011_Male_13_50_Fly.json?GoogleAccessId=firebase-adminsdk-7x0t5%40canadian-swimming-ranks.iam.gserviceaccount.com&Expires=16447035600&Signature=PqqDfvg9YXcOBi%2F%2BS8jBwekCqGvuh7XxxnvOXWHzpbay2mpyxfedgRfVhKXAAT3I4Zzn4SQ%2B3aNvG5tJpfJYeG5POPv0hAOREtHErYeUDihskonTpkPyQrY02Fk1zZbHE1PW%2BmCpS1rkUVBEVXW4MPCukSLPJ1ugwpMDFIlUO92J5sqOa7rQe3AUS1enIlh%2BdHOMzX12KKtddB46wW3hxPCtL0HJg1otITUxBU2Rx7qh5t31mTi8Dol9GhTAigCZPSIPFWXtV70eAYscfuY2ZlL03IF0cKJCxJljOoBL88%2FxaTB57nqpjymmCAurheeulBf2kxlPBpQ7sFLoTXnPLA%3D%3D", {
            method: "GET",

        }).then(response => {
            return response.json()
        })
            .then(data => {
                // Work with JSON data here
                let time = data.data.map(x => x.TIME);
                let athletes = data.data.map(x => x.ATHLETES.split(',').reverse().join(' '));
                return { time, athletes };
            }).then(data => this.setState({ data: data.time }));

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