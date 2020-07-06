import React, { Component } from 'react'
import * as SwimFormulas from '../../../constants/graphFunctions/graphFunctions';
import { Bar } from 'react-chartjs-2';
import ReactTable from '../../../components/reactTable/reactTable';
import Container from 'react-bootstrap/Container';
import { defaults } from 'react-chartjs-2';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MONTH_NAMES } from '../../../constants/swimmingConstants/swimmingConstants';

defaults.global.legend.display = true;

class PeakMonth extends Component {

    render() {
        let swimmerData = this.props.swimmerData;
        let allSwimmerDataSubComponents = this.props.allSwimmerDataSubComponents;
        let event = [];
        let months = [];
        let numSwimmers = [];
        let monthsPercent = [];
        let allEvents = [];
        let eventOptions = [];
        let allEventsOptions = [];
        let colorArray;


        if (allSwimmerDataSubComponents === undefined || allSwimmerDataSubComponents.length === 0) {
            try {
                months = SwimFormulas.peakDistribution(swimmerData);
                numSwimmers = months.reduce((a, b) => a + b);
                monthsPercent = [...months].map(el => Math.floor((el / numSwimmers) * 100));

                // * Data that will be passed to the Linegraph Component
                event = {
                    labels: MONTH_NAMES,
                    datasets: [{
                        label: this.props.event,
                        backgroundColor: 'rgb(255, 99, 132)',
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: months,
                        yAxisID: 'left-y-axis'
                    },
                    {
                        data: monthsPercent,
                        label: '% Occurrence',
                        backgroundColor: 'rgb(0,170,216)',
                        yAxisID: 'right-y-axis'
                    }]
                }
            } catch (e) {
                console.log('Error: ' + e);
            }
        } else {
            try {
                // * Hard Coding of the events needed in order to stack the bars and events appropriately and match to a color
                let fiftyFr = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[0]);
                let oneHundredFr = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[1]);
                let twoHundredFr = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[2]);
                let fourHundredFr = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[3]);
                let eightHundredFr = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[4]);
                let fifteenHundredFr = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[5]);
                let fiftyBk = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[6]);
                let oneHundredBk = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[7]);
                let twoHundredBk = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[8]);
                let fiftyBr = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[9]);
                let oneHundredBr = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[10]);
                let twoHundredBr = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[11]);
                let fiftyBu = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[12]);
                let oneHundredBu = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[13]);
                let twoHundredBu = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[14]);
                let oneHundredMe = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[15]);
                let twoHundredMe = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[16]);
                let fourHundredMe = SwimFormulas.peakDistribution(allSwimmerDataSubComponents[17]);

                // * Creates The Colors for the PieChart depending on how many distinct meets there are
                colorArray = SwimFormulas.colorArray(18)
                allEvents = {
                    labels: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',],
                    datasets: [{
                        stack: '2',
                        label: '50 Fr',
                        backgroundColor: colorArray[0],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: fiftyFr,
                    },
                    {
                        stack: '2',
                        label: '100 Fr',
                        backgroundColor: colorArray[1],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: oneHundredFr,
                    }
                        ,
                    {
                        stack: '2',
                        label: '200 Fr',
                        backgroundColor: colorArray[2],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: twoHundredFr,
                    }
                        ,
                    {
                        stack: '2',
                        label: '400 Fr',
                        backgroundColor: colorArray[3],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: fourHundredFr,
                    }
                        ,
                    {
                        stack: '2',
                        label: '800 Fr',
                        backgroundColor: colorArray[4],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: eightHundredFr,
                    }
                        ,
                    {
                        stack: '2',
                        label: '1500 Fr',
                        backgroundColor: colorArray[5],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: fifteenHundredFr,
                    }
                        ,
                    {
                        stack: '2',
                        label: '50 Bk',
                        backgroundColor: colorArray[6],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: fiftyBk,
                    }

                        ,
                    {
                        stack: '2',
                        label: '100 Bk',
                        backgroundColor: colorArray[7],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: oneHundredBk,
                    },
                    {
                        stack: '2',
                        label: '200 Bk',
                        backgroundColor: colorArray[8],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: twoHundredBk,
                    },

                    {
                        stack: '2',
                        label: '50 Br',
                        backgroundColor: colorArray[9],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: fiftyBr,
                    },
                    {
                        stack: '2',
                        label: '100 Br',
                        backgroundColor: colorArray[10],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: oneHundredBr,
                    },
                    {
                        stack: '2',
                        label: '200 Br',
                        backgroundColor: colorArray[11],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: twoHundredBr,
                    },
                    {
                        stack: '2',
                        label: '50 Bu',
                        backgroundColor: colorArray[12],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: fiftyBu,
                    },

                    {
                        stack: '2',
                        label: '100 Bu',
                        backgroundColor: colorArray[13],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: oneHundredBu
                    }

                        ,
                    {
                        stack: '2',
                        label: '200 Bu',
                        backgroundColor: colorArray[16],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: twoHundredBu,
                    },

                    {
                        stack: '2',
                        label: '100 Me',
                        backgroundColor: colorArray[14],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: oneHundredMe,
                    },

                    {
                        stack: '2',
                        label: '200 Me',
                        backgroundColor: colorArray[15],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: twoHundredMe,
                    }

                        ,
                    {
                        stack: '2',
                        label: '400 Me',
                        backgroundColor: colorArray[16],
                        pointBackgroundColor: ['rgb(255, 99, 132)'],
                        borderColor: 'rgb(255, 99, 132)',
                        fill: true,
                        data: fourHundredMe,
                    }
                    ]
                }

            } catch (error) {
                console.log('Error: ' + error + ' unable data graph data')
            }
        }
        // * Options for the selected events graph
        eventOptions = {
            tooltips: {
                callbacks: {
                    // * Updates the Tooltips (Graph Points) with the Name,Time
                    label: (tooltipItem, d) => {
                        let labelArr = [];
                        labelArr.push('PLACE         SWIMMER                  TIME')
                        // * Label Array is used to create multiple labels inside of data element in graph.
                        // * Index needs to be shifted to match the correct data. TODO Need to see if I can standardize data and index
                        let index = tooltipItem.index + 8;
                        if (index > 11) {
                            index -= 12;
                        }
                        // * Converts Excel data to usable date then filters if it matches the correct month
                        let swimmers = swimmerData.filter(el => new Date(Math.floor(el.__EMPTY_10 - (25567 + 2)) * 86400 * 1000).getMonth() === index).sort();

                        swimmers.map(el => {
                            el.__EMPTY_9 = (el.__EMPTY_9).toString().padEnd(15, ' ');
                            el.__EMPTY_3 = (el.__EMPTY_3.split(', ').map(el => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase()).join(', ')).toString().padEnd(25, ' ');
                            el.__EMPTY_7 = (el.__EMPTY_7).toString().padEnd(15, ' ');
                        })
                        swimmers.forEach(el =>
                            labelArr.push(el.__EMPTY_9 + el.__EMPTY_3 + el.__EMPTY_7 + new Date(Math.floor(el.__EMPTY_10 - (25567 + 2)) * 86400 * 1000).toDateString().substring(4))
                        )
                        return labelArr;
                    },
                    bodyFontSize: 10,
                }
            },
            scales: {
                yAxes: [{
                    id: 'left-y-axis',
                    type: 'linear',
                    position: 'left',
                    scaleLabel: {
                        display: true,
                        labelString: 'Number Of Occurences'
                    }
                },
                {
                    ticks: {
                        // Include a dollar sign in the ticks
                        callback: function (value, index, values) {
                            return value + '%';
                        },
                        maxTicksLimit: 100
                    },
                    id: 'right-y-axis',
                    type: 'linear',
                    position: 'right',
                    scaleLabel: {
                        display: true,
                        labelString: 'Percentage Of Occurences'
                    }
                },

                ]
            }
        }
        // * Options for the all events graph 
        allEventsOptions = {
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
            }
        }

        // * If a specific event was selected it will only return the specific month distribution
        // * Otherwise it returns all events on as a bargraph with the subcomponents
        let selectedEvents;

        // * Creates the arrays that allow the React table for the distributions
        let meetKeys = [
            '__EMPTY_10',
            '__EMPTY_14',
            '__EMPTY_16'
        ];
        let monthName = [...MONTH_NAMES];
        let monthNum = [...months];
        let monthPercent = [...monthsPercent];
        let monthTable = [];

        months.forEach((month, index) => monthTable.push(Object({ '__EMPTY_10': monthName[index], '__EMPTY_14': monthNum[index], '__EMPTY_16': monthPercent[index] })))
        monthTable = monthTable.filter(el => el.__EMPTY_14 !== 0);

        if (allSwimmerDataSubComponents === undefined || allSwimmerDataSubComponents.length === 0) {
            selectedEvents = (
                <Row className="justify-content-md-center">
                    <Col className="mt-1" lg={9} xs={12}>
                        <div>
                            <h6 className="text-center">{this.props.event + ': Month of Best Time'} </h6>
                        </div>
                        <Bar name="Selected Events Best time over months chart" data={event} options={eventOptions} height={175} redraw />
                    </Col>
                    <Col lg={3} xs={12}>
                        <ReactTable tableData={monthTable} allowedKeys={meetKeys} />
                    </Col>
                </Row>
            )
        } else {
            selectedEvents = (
                <Row className="justify-content-md-center">
                    <Col className="mt-1" md={10} xs={12}>
                        <div>
                            <h6 className="text-center">{'All Events: (For selected age group and gender)'} </h6>
                        </div>
                        <Bar name="All Events Best time over months chart" data={allEvents} option={allEventsOptions} height={175} redraw />
                    </Col>
                </Row>

            )
        }

        return (
            <div>
                <Container fluid className="mt-1 p-5">
                    <Row>
                        <Col className="text-center"> <b><h4 className="formTitle">Distribution Of Best Times Over the Year  </h4></b> </Col>
                    </Row>
                    {selectedEvents}
                </Container>
            </div>
        )
    }
}

export default PeakMonth;