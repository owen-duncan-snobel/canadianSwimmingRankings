import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import SwimForm from '../swimForm/swimForm';

/**
 *   The dashboard is responsible for housing the Chart and styling for the chart
 *   it also will pass the chart back to the main app.
 * 
 *  Used for changing the y-axis to match the correct time format
 *  Is called from within the Dashboard constructor for the chart
 *  Converts Millisecond string/number to a ISOString representation of it in (mm:ss.SS)
 */


// TODO NEED TO RECREATE THE TABLE THAT IS USED ON THE MAIN PAGE FOR THE SELECTION OF DATA TO GRAB THE LINK FROM



class Dashboard extends Component {
    constructor(props) {
        super(props);
        // this.chartReference = React.createRef();
    }

    componentDidMount() {

    }
    componentDidUpdate() {
        //this.getData();
        //    this.setState({ data: this.props.swimmerData.time })
    }

    getData() {
        if (this.props.link === '') {
            // * If the link passed from dashboard is empty or default, no starting graph to display
        } else {
            /*
            app.storage().ref(this.props.link).getDownloadURL().then(

                (url) => {
                    fetch(url, {
                        method: "GET",
                    })
                        .then(response => {
                            return response.json()
                        })

                        .then(dataset => {
                            const standardize_times = (time) => {
                                // * Ensures that all time strings given are in an appropriate ISO String format
                                if (time.length === 5) time = '00:' + time;
                                if (time.length === 7) time = '0' + time;
                                let milli = ((parseInt(time.split(':')[0] * 60000)) + (parseInt(time.split(':')[1].split('.')[0] * 1000)) + (parseInt(time.split('.')[1]) * 10));
                                return milli;
                            }
                            // * Work with JSON data here
                            let time = dataset.data.map(x => standardize_times(x.TIME));
                            let athletes = dataset.data.map(x => x.ATHLETES.split(',').reverse().join(' '));
                            let rank = dataset.data.map(x => x.RANK).reverse();
                            this.setState({ swimmerInfo: time, athletes, rank })
                            return { time, athletes, rank };
                        }).then(
                            (graphData) => this.setState({
                                // TODO NEED TO ADD TOOLTIPS AND ALL OTHER CHART.JS GRAPHING LOGIC HERE
                                data: {
                                    labels: graphData.rank,
                                    datasets: [{
                                        //  * TODO POTENTIALLY STYLE 1st,2nd,3rd Place to be coloured gold silver bronze to make finding the 
                                        //  * fastest time easier

                                        label: "Replace label with a variable that is the year and gender",
                                        backgroundColor: 'rgb(255, 99, 132)',
                                        borderColor: 'rgb(255, 99, 132)',
                                        fill: false,
                                        data: graphData.time.reverse(),
                                    }]
                                }
                            })
                        ) 
                })
            // * NEEDED FOR THE CONVERSIONS

            const epoch_to_hh_mm_ss = (epoch) => {
                return new Date(epoch).toISOString().substr(14, 8);
            }
        */ }
    }
    /*
        dynamicColors = function () {
            var r = Math.floor(Math.random() * 255);
            var g = Math.floor(Math.random() * 255);
            var b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
        }
        */
    // * NEED TO GO BACK AND SEARCH THE REACT FIREBASE / COMPONENT MOUNTING GUIDE FOR UPDATING THE STATE
    // When Component Finishes loading the Chart, It will then fetch the data, then update the state and pass new props

    // TODO NEED TO MAKE THE CALLBACKS WORK CORRECTLY WITH REACT
    render() {
        let data;
        let options;
        // * If no data has been passed down from the form or invalid display empty form
        if (this.props.swimmerData == null) {
            data = {
                datasets: [
                    {
                        label: ''
                    }
                ]
            }
            options = {}
            // * Else will begin the place the data
        } else {
            data = {
                labels: this.props.swimmerData.rank,
                datasets: [{
                    //  * TODO POTENTIALLY STYLE 1st,2nd,3rd Place to be coloured gold silver bronze to make finding the 
                    //  * fastest time easier

                    label: "Replace label with a variable that is the year and gender",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: this.props.swimmerData.time.reverse(),
                }]
            }

            options = {
                title: {
                    display: true,
                    text: 'Needs to be replaced with variable'
                },
                legend: {
                    text: 'Replace with Dataset Year and Gender'
                },
                animation: {
                    duration: 0 // general animation time
                },
                tooltips: {
                    callbacks: {
                        // * Updates the Tooltips (Graph Points) with the Name,Time 
                        label: (tooltipItem, data) => {
                            // * Label Array is used to create multiple labels inside of data element in graph. 
                            let labelArr = [];
                            console.log(this.props.swimmerData)
                            labelArr.push(this.props.swimmerData.athletes[tooltipItem.label - 1] + ' ' + new Date(tooltipItem.yLabel).toISOString().substr(14, 8));
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
                                return new Date(v).toISOString().substr(14, 8)
                            },

                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Rank",
                        }
                    }]
                }
            }


        }

        return (
            <div>
                <div className="App">Canadian Swimmings Power Rankings</div>
                <div className="Dashboard for Chart">
                    {console.log(this.props.swimmerData)}
                    <Line data={data} options={options}> </Line>
                </div>
            </div >
        )
    }
}
export default Dashboard;