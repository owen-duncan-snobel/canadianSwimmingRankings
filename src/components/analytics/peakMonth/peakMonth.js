import React, { Component } from 'react'
import { EVENTS } from '../../../constants/swimmingConstants/swimmingConstants';
import * as SwimFormulas from '../../../constants/graphFunctions/graphFunctions';
import { Bar, Pie } from 'react-chartjs-2';
import { defaults } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

defaults.global.legend.display = false;

class PeakMonth extends Component {

    render() {
        let swimmerData = this.props.swimmerData;
        let allSwimmerData = this.props.allSwimmerData;
        let allSwimmerDataSubComponents = this.props.allSwimmerDataSubComponents;
        let event = [];
        let allEvents = [];
        let eventOptions = [];
        let colorArray;
        let meetCity;
        let meetCityKey;
        let meetCityNum;


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

            let months = SwimFormulas.peakDistribution(swimmerData);

            // * Data that will be passed to the Linegraph Component
            event = {
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
            colorArray = SwimFormulas.colorArray(18)
            allEvents = {
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

        // * Options for the selected events graph
        eventOptions = {
            tooltips: {
                callbacks: {
                    // * Updates the Tooltips (Graph Points) with the Name,Time
                    label: (tooltipItem, d) => {
                        let labelArr = [];
                        labelArr.push('PLACE   SWIMMER   TIME')
                        // * Label Array is used to create multiple labels inside of data element in graph.
                        // * Index needs to be shifted to match the correct data. TODO Need to see if I can standardize data and index
                        let index = tooltipItem.index + 8;
                        if (index > 11) {
                            index -= 12;
                        }
                        // * Converts Excel data to usable date then filters if it matches the correct month
                        let swimmers = swimmerData.filter(el => new Date(Math.floor(el.__EMPTY_10 - (25567 + 2)) * 86400 * 1000).getMonth() === index);
                        swimmers.forEach(el => labelArr.push(el.__EMPTY_9 + ' ' + el.__EMPTY_3 + ' ' + el.__EMPTY_7))
                        return labelArr;
                    }
                }
            },
        }
        // * Options for the all events graph 
        const allEventsOptions = {
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
        }

        // * Converts all the events data into the labels and data for the piechart of meet city
        meetCity = Array.from(SwimFormulas.mostOccurences(SwimFormulas.meetCity(allSwimmerData))).sort((a, b) => a[1] - b[1]);
        meetCityKey = meetCity.map(city => city[0]);
        meetCityNum = meetCity.map(number => number[1]);

        let cityColors = SwimFormulas.colorArray(meetCityKey.length);
        let cityData = {
            labels: meetCityKey,
            datasets: [{
                data: meetCityNum,
                backgroundColor: cityColors
            }],
        }

        return (
            <div>
                <Container fluid className="mt-1">

                    <Row>
                        <Col className="text-center"> <b><h4 className="formTitle">Distribution Of Best Times Over the Year  </h4></b> </Col>
                    </Row>
                    <Row>

                        <Col className="mt-1" md={6} xs={12}>
                            <div>
                                <h6 className="text-center">{this.props.event + ': Month of Best Time'} </h6>
                            </div>
                            <Bar name="Selected Events Best time over months chart" data={event} options={eventOptions} height={200} />
                        </Col>

                        <Col className="mt-1" md={6} xs={12}>
                            <div>
                                <h6 className="text-center">{'All Events: (For selected age group and gender)'} </h6>
                            </div>
                            <Bar name="All Events Best time over months chart" data={allEvents} option={allEventsOptions} height={200} />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default PeakMonth;