import React, { Component } from 'react';
import Chart from '../chartjs/chartjs';
import { Line } from 'react-chartjs-2';

/**
 *   The dashboard is responsible for housing the Chart and styling for the chart
 *   it also will pass the chart back to the main app.
 * 
 *  Used for changing the y-axis to match the correct time format
 *  Is called from within the Dashboard constructor for the chart
 *  Converts Millisecond string/number to a ISOString representation of it in (mm:ss.SS)
 */

const standardize_times = (time) => {
    // * Ensures that all time strings given are in an appropriate ISO String format
    if (time.length === 5) time = '00:' + time;
    if (time.length === 7) time = '0' + time;
    let milli = ((parseInt(time.split(':')[0] * 60000)) + (parseInt(time.split(':')[1].split('.')[0] * 1000)) + (parseInt(time.split('.')[1]) * 10));
    return milli;
}
const epoch_to_hh_mm_ss = (epoch) => {
    return new Date(epoch).toISOString().substr(14, 8);
}

function back_to_mm_ss_SS(ms) {
    let mins = ((ms / 60000) + '').split('.')[0];
    let seconds = ((((ms - (mins * 60000)) / 1000) + '').split('.')[0]);
    let milli = ((ms - ((mins * 60000) + (seconds * 1000))) + '')

    // Validates of time subcomponents to keep all string the same format (mm:ss.SS)
    if (mins.length < 2) mins = '0' + mins;
    if (seconds.length < 2) seconds = '0' + seconds;
    if (milli.length < 2) milli = '0' + milli;
    return mins + ':' + seconds + '.' + milli;
}


var dynamicColors = function () {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}



class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
            }
        }
    }

    getData() {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const that = this;
        fetch("https://storage.googleapis.com/canadian-swimming-ranks.appspot.com/Short_Course/2008-2009_Female_15_50_Free.json?GoogleAccessId=firebase-adminsdk-7x0t5%40canadian-swimming-ranks.iam.gserviceaccount.com&Expires=16447035600&Signature=iCQxobYrbt9JYgm1C%2Bcfii2e849erQ%2BkWikCK1Tp8R01KhP4OpVHWOGryvKKvIGdCHlnP7bqkfds94b96hLNN6wPSct81oy%2F0VwQL1LyFMVvdkuohsp4rudZ7xBB1z4IjlXru0YX3AeQcJf6uUqPwbjN%2Bjw9sIGbJut7t3UnB817Oq8mfoE3dfLNN2VreioIr32zl1yChrkhL%2FZF4LMc5SECpxjgD4WopA8o8X1tS9pAR3ClPdlcRkM7uFlUPgdV5xC83WwWiQ5UT9PBuV3i97kW81WMrtAXNKpEaG316A2aIyNNeltHd1zS9LMiWXwFc0ikhKaSoK0fp10Re3NV2Q%3D%3D", {
            method: "GET",
        }).then(response => {
            return response.json()
        })
            .then(data => {
                //  Work with JSON data here
                let time = data.data.map(x => standardize_times(x.TIME));
                console.log(time)
                let athletes = data.data.map(x => x.ATHLETES.split(',').reverse().join(' '));
                let rank = data.data.map(x => x.RANK).reverse();
                return { time, athletes, rank };
            }).then(
                (graphData) => that.setState({
                    // * NEED TO ADD TOOLTIPS AND ALL OTHER CHART.JS GRAPHING LOGIC HERE
                    data: {
                        labels: graphData.rank,
                        datasets: [{
                            label: "My First dataset",
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: graphData.time.reverse(),
                        }]
                    },
                    options: {
                        animation: {
                            duration: 0 // general animation time
                        },
                        tooltips: {
                            callbacks: {
                                label: function (tooltipItem, data) {
                                    // * Label Array is used to create multiple labels inside of data element in graph. 
                                    let labelArr = [];
                                    console.log(tooltipItem)
                                    labelArr.push(epoch_to_hh_mm_ss(tooltipItem.yLabel))
                                    return labelArr;
                                }
                            }
                        },
                        scales: {
                            yAxes: [{
                                scaleLabel: {
                                    display: true,
                                    labelString: "Times",
                                },
                                ticks: {
                                    callback: function (v) {
                                        // Responsible for the time graphing for the y-axis (converts ms to a readable format)
                                        return epoch_to_hh_mm_ss(v);
                                    },
                                    stepSize: 120

                                }
                            }]
                        }

                    }
                }),
            )
    }
    // * NEED TO GO BACK AND SEARCH THE REACT FIREBASE / COMPONENT MOUNTING GUIDE FOR UPDATING THE STATE
    // When Component Finishes loading the Chart, It will then fetch the data, then update the state and pass new props
    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div className="Dashboard for Chart">
                <Line data={this.state.data} options={this.state.options}> </Line>
            </div>
        )
    }
}
export default Dashboard;