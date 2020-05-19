import React, { Component } from 'react'
import { EVENTS } from '../../constants/swimming/swimming';
import * as SwimAnalytics from '../../constants/swimAnalytics/swimAnalytics';
import { Bar } from 'react-chartjs-2';
import Rainbow from 'rainbowvis.js';
import { defaults } from 'react-chartjs-2'
defaults.global.legend.display = false;

class PeakMonth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allSwimmerDataSubComponents: null
        }
    }
    render() {
        let swimmerData = [];
        let allSwimmerData = [];
        let allSwimmerDataSubComponents = [];
        let data = [];
        let data2 = [];
        let allData = [];
        let options = [];
        let options2 = [];

        if (this.props.swimmerData == null) {
            return (
                <div name="PeakMonth"> </div>
            )
        } else {

            let allData = this.props.swimmerData;

            // * Need to process data from Workbook -> Worksheets -> Event -> Swimmers
            try {
                allData.forEach(Workbook => {
                    // * In every Workbook (Age / Year) it holds Sheets with the Events, will select the sheet that contains the events data
                    let index = EVENTS.indexOf(this.props.event)
                    let Sheet = Workbook[0][index];
                    // * For the selected event collect all the swimmer data
                    Sheet.forEach(swimmer => {
                        swimmerData.push(swimmer);
                    })
                })
            } catch {
                console.log('Error: Unable to convert workboot data into sheets');
            }
            // * For gettign Data of the subcomponents that will add up to all events
            allData.forEach(Workbook => {
                let Sheet = Workbook[0];
                Sheet.forEach(sheet => {
                    allSwimmerDataSubComponents.push(sheet)
                })
            })

            // * For getting the Data of all sheets containing all events
            allData.forEach(Workbook => {
                let Sheet = Workbook[0];
                Sheet.forEach(sheet => {
                    sheet.forEach(swimmer => {
                        allSwimmerData.push(swimmer)
                    })
                })
            })

            try {
                console.log(SwimAnalytics.peakDistribution(allSwimmerDataSubComponents.entries()));
                let fiftyFr = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[0]);
                let oneHundredFr = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[1]);
                let twoHundredFr = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[2]);
                let fourHundredFr = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[3]);
                let eightHundredFr = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[4]);
                let fifteenHundredFr = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[5]);
                let fiftyBk = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[6]);
                let oneHundredBk = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[7]);
                let twoHundredBk = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[8]);
                let fiftyBr = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[9]);
                let oneHundredBr = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[10]);
                let twoHundredBr = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[11]);
                let fiftyBu = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[12]);
                let oneHundredBu = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[13]);
                let twoHundredBu = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[14]);
                let oneHundredMe = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[15]);
                let twoHundredMe = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[16]);
                let fourHundredMe = SwimAnalytics.peakDistribution(allSwimmerDataSubComponents[17]);

                let months = SwimAnalytics.peakDistribution(swimmerData);

                // * Data that will be passed to the Linegraph Component
                data = {
                    labels: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',],
                    datasets: [{
                        label: this.props.event,
                        backgroundColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: months,
                    }]
                }

                // * Creates The Colors for the PieChart depending on how many distinct meets there are
                let myRainbow = new Rainbow();
                myRainbow.setSpectrum('#00aad8', '#ff6384')
                myRainbow.setNumberRange(1, 18);
                let colorArray = [];

                for (let i = 0; i < 18; i++) {
                    colorArray.push('#' + myRainbow.colorAt(i));
                }

                data2 = {
                    labels: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',],
                    datasets: [{
                        stack: '2',
                        label: '50 Fr',
                        backgroundColor: colorArray[0],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: fiftyFr,
                    },
                    {
                        stack: '2',
                        label: '100 Fr',
                        backgroundColor: colorArray[1],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: oneHundredFr,
                    }
                        ,
                    {
                        stack: '2',
                        label: '200 Fr',
                        backgroundColor: colorArray[2],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: twoHundredFr,
                    }
                        ,
                    {
                        stack: '2',
                        label: '400 Fr',
                        backgroundColor: colorArray[3],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: fourHundredFr,
                    }
                        ,
                    {
                        stack: '2',
                        label: '800 Fr',
                        backgroundColor: colorArray[4],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: eightHundredFr,
                    }
                        ,
                    {
                        stack: '2',
                        label: '1500 Fr',
                        backgroundColor: colorArray[5],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: fifteenHundredFr,
                    }
                        ,
                    {
                        stack: '2',
                        label: '50 Bk',
                        backgroundColor: colorArray[6],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: fiftyBk,
                    }

                        ,
                    {
                        stack: '2',
                        label: '100 Bk',
                        backgroundColor: colorArray[7],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: oneHundredBk,
                    },
                    {
                        stack: '2',
                        label: '200 Bk',
                        backgroundColor: colorArray[8],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: twoHundredBk,
                    },

                    {
                        stack: '2',
                        label: '50 Br',
                        backgroundColor: colorArray[9],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: fiftyBr,
                    },
                    {
                        stack: '2',
                        label: '100 Br',
                        backgroundColor: colorArray[10],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: oneHundredBr,
                    },
                    {
                        stack: '2',
                        label: '200 Br',
                        backgroundColor: colorArray[11],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: twoHundredBr,
                    },
                    {
                        stack: '2',
                        label: '50 Bu',
                        backgroundColor: colorArray[12],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: fiftyBu,
                    },

                    {
                        stack: '2',
                        label: '100 Bu',
                        backgroundColor: colorArray[13],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: oneHundredBu
                    }

                        ,
                    {
                        stack: '2',
                        label: '200 Bu',
                        backgroundColor: colorArray[16],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: twoHundredBu,
                    },

                    {
                        stack: '2',
                        label: '100 Me',
                        backgroundColor: colorArray[14],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: oneHundredMe,
                    },

                    {
                        stack: '2',
                        label: '200 Me',
                        backgroundColor: colorArray[15],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: twoHundredMe,
                    }

                        ,
                    {
                        stack: '2',
                        label: '400 Me',
                        backgroundColor: colorArray[16],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: false,
                        data: fourHundredMe,
                    }
                    ]
                }
            } catch (error) {
                console.log('Error: ' + error + ' unable data graph data')
            }

            const options2 = {
                scales: {
                    xAxes: [
                        {
                            stacked: true,
                        },
                    ],
                    yAxes: [
                        {
                            stacked: true,
                        },
                    ],
                },
            };

            options = {
                tooltips: {
                    callbacks: {
                        // * Updates the Tooltips (Graph Points) with the Name,Time
                        label: (tooltipItem, d) => {
                            let labelArr = [];
                            labelArr.push('PLACE   SWIMMER   TIME')
                            // * Label Array is used to create multiple labels inside of data element in graph.
                            let index = tooltipItem.index + 8;
                            if (index > 11) {
                                index -= 12;
                            }
                            let swimmers = swimmerData.filter(el => new Date(Math.floor(el.__EMPTY_10 - (25567 + 2)) * 86400 * 1000).getMonth() == index);
                            swimmers.forEach(el => labelArr.push(el.__EMPTY_9 + ' ' + el.__EMPTY_3 + ' ' + el.__EMPTY_7))
                            return labelArr;
                        }
                    }
                },
            }


            //console.log(SwimAnalytics.mostOccurences(data));
            return (
                <div>
                    <div>
                        <h4 className="text-center">{this.props.event + ': Best Times Meetdates'} </h4>
                    </div>
                    <Bar data={data} options={options} height={75} />
                    <div>
                        <h4 className="text-center">{'All Events: Meetdates'} </h4>
                    </div>
                    <Bar data={data2} option={options2} height={75} />
                </div >
            )
        }
    }
}
export default PeakMonth;