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
        // * If no data has been passed down from the form or invalid display empty form
        if (this.props.swimmerData == null) {
            return (
                <div name="DashboardforChart"> </div>
            )
        } else {

            // * Converting the JSON To working usable data to graph (Shifts and pop are for removing the default row)
            let athletes = this.props.swimmerData.map(athlete => athlete.__EMPTY_3);
            let rank = this.props.swimmerData.map(rank => rank.__EMPTY_9).reverse();

            // * Since Swim Times can Range from under a minute up to 20 mins we will standardize the times to all have the same length 
            // * In the following format MM:SS:ss
            const standardize_times = (time) => {
                // * Ensures that all time strings given are in an appropriate ISO String format
                if (time.length === 5) time = '00:' + time;
                if (time.length === 7) time = '0' + time;
                let milli = ((parseInt(time.split(':')[0] * 60000)) + (parseInt(time.split(':')[1].split('.')[0] * 1000)) + (parseInt(time.split('.')[1]) * 10));
                return milli;
            }

            let time = this.props.swimmerData.map(time => standardize_times(time.__EMPTY_7)).reverse();

            // * Data that will be passed to the Linegraph Component
            data = {
                labels: rank,
                datasets: [{
                    label: this.props.swimEvent,
                    backgroundColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: ['rgb(255, 99, 132)'],
                    borderColor: 'rgb(255, 99, 132)',
                    fill: false,
                    data: time,
                }]
            }

            options = {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 0 // general animation time
                },
                onClick: function (event, item) {
                    // * Error handling is needed for if a point is not clicked but within the canvas
                    if (!(item.length === 0)) {
                        let index = item[0]._index;
                        // * Resets the point that was clicked prior back to original colour
                        for (let i = 0; i < item[0]._chart.config.data.datasets[0].data.length; i++) {
                            item[0]._chart.config.data.datasets[0]['pointBackgroundColor'][i] = 'rgb(255, 99, 132)';
                        }
                        // * Sets the point clicked colour to highlighted color
                        item[0]._chart.config.data.datasets[0]['pointBackgroundColor'][index] = 'white';


                        /*                     
                                              TODO Need to go back and get the functionality and logic more polished for scrolling to and highlight the correct points        
                                               // * 49 - Index is needed since the datasets index's are reversed to graph, + 1 is for correct place (1st, 2nd, ...)
                                              document.getElementsByTagName('table')[0].style.backgroundColor = 'none';
                                              document.getElementsByTagName('tr').namedItem((49 - index) + 1).style.backgroundColor = 'yellow';
                       */
                        this.update();
                    }
                },
                tooltips: {
                    callbacks: {
                        // * Updates the Tooltips (Graph Points) with the Name,Time 
                        label: (tooltipItem, data) => {
                            // * Label Array is used to create multiple labels inside of data element in graph. 
                            let labelArr = [];
                            labelArr.push(athletes[tooltipItem.label - 1] + ' ' + new Date(tooltipItem.yLabel).toISOString().substr(14, 8));
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
                <div className="App">Canadian Swimming Rankings</div>
                <div name="DashboardforChart">
                    <Line data={data} options={options} height={400}> </Line>
                </div>
            </div >
        )
    }
}
export default Linegraph;