import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
/**
 *   The dashboard is responsible for housing the Chart and styling for the chart
 *   it also will pass the chart back to the main app.
 */


// TODO NEED TO RECREATE THE TABLE THAT IS USED ON THE MAIN PAGE FOR THE SELECTION OF DATA TO GRAB THE LINK FROM

class Linegraph extends Component {
    render() {
        let data;
        let options;
        let times;
        let athletes;
        let rank;

        // * Since Swim Times can Range from under a minute up to 20 mins we will standardize the times to all have the same length 
        // * In the following format MM:SS:ss
        const standardize_times = (time) => {
            // * Ensures that all time strings given are in an appropriate ISO String format
            if (time.length === 5) time = '00:' + time;
            if (time.length === 7) time = '0' + time;
            let milli = ((parseInt(time.split(':')[0] * 60000)) + (parseInt(time.split(':')[1].split('.')[0] * 1000)) + (parseInt(time.split('.')[1]) * 10));
            return milli;
        }

        // * If no data has been passed down from the form or invalid display empty form
        if (this.props.swimmerData == null) {
            return (
                <div name="DashboardforChart"> </div>
            )
        } else {

            // * Converting the JSON To working usable data to graph (Shifts and pop are for removing the default row)
            athletes = this.props.swimmerData.map(athlete => athlete.__EMPTY_3);
            rank = this.props.swimmerData.map(rank => rank.__EMPTY_9).reverse();
            times = this.props.swimmerData.map(time => standardize_times(time.__EMPTY_7)).reverse();

            // * Data that will be passed to the Linegraph Component
            data = {
                labels: rank,
                datasets: [{
                    label: this.props.swimEvent,
                    backgroundColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: ['rgb(255, 99, 132)'],
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: times,
                }]
            }

            options = {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 0 // general animation time
                },
                tooltips: {
                    callbacks: {
                        // * Updates the Tooltips (Graph Points) with the Name,Time 
                        label: (tooltipItem, data) => {
                            // * Label Array is used to create multiple labels inside of data element in graph. 
                            let labelArr = [];
                            labelArr.push(athletes[tooltipItem.label - 1] + ' ' + new Date(tooltipItem.yLabel).toISOString().substr(14, 8));
                            // TODO Might add average and median times to the onhighlight / might be when you click on swimmer in graph
                            return labelArr;
                        }
                    }
                },
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: "Times (Seconds)",
                        },
                        ticks: {
                            callback: function (v) {
                                //* Responsible for the time graphing for the y-axis (converts ms to a readable format)
                                return new Date(v).toISOString().substr(14, 8)
                            }
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
                <div className="App">{this.props.clubName} Rankings</div>
                <div name="DashboardforChart">
                    <Line data={data} options={options} height={400} onElementsClick={(elems) => {

                        // * Updates The Selected Swimmer Time and Swimmer Name
                        try {
                            this.props.updateSwimmer({
                                time: new Date(times[elems[0]._index]).toISOString().substr(14, 8),
                                name: athletes[(athletes.length - 1) - elems[0]._index]
                            });
                        } catch {
                            // * If graph is clicked, but not a point on the graph it returns an empty array
                        }

                    }} />
                </div>
            </div >
        )
    }
}
export default Linegraph;