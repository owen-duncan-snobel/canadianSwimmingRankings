import React, { Component } from 'react'
import { EVENTS } from '../../constants/swimmingConstants/swimmingConstants';
import * as SwimFormulas from '../../constants/graphFunctions/graphFunctions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactTable from '../../components/reactTable/reactTable';
import FastestMeets from '../../components/analytics/fastestMeets/fastestMeets';
import FastestCity from '../../components/analytics/fastestCity/fastestCity';
import PeakMonth from '../../components/analytics/peakMonth/peakMonth';
import PropTypes from 'prop-types';

/**
 * Club Dashboard converts the data fetched from the route 'club', to a usable format to be used by the components (FastestMeets,FastestCity,PeakMonths).
 * @component 
 */

class ClubDashboard extends Component {

    render() {

        let swimmerData = [];
        let allSwimmerData = [];
        let allSwimmerDataSubComponents = [];
        let event = '';
        let allData;

        // * Checks if the data passed is null OR if data passed in form [Years[Events[Swimmers]]].length == 0 aka. No swimmers for event
        try {
            if (this.props.swimmerData === null || this.props.swimmerData[0][0][0].length === 0) {
                return (
                    <div name="InvalidYearNoData"> </div>
                )
            } else {
                allData = this.props.swimmerData;
                event = this.props.event;
                // * If a specific event is selected, it will get the Sheet with the data for that specific event.
                if (event !== 'All') {

                    allData[0].forEach(workbook => {
                        // * In every Workbook (Age / Year) it holds Sheets with the Events, will select the sheet that contains the events data
                        let index = EVENTS.indexOf(event)
                        let Sheet = workbook[index];
                        // * For the selected event collect all the swimmer data
                        Sheet.forEach(swimmer => {
                            swimmer.__EMPTY_8 = SwimFormulas.standardizeTimes(swimmer.__EMPTY_7);
                            swimmerData.push(swimmer);
                        })
                    })


                    // * Pass it the keys that will be used as the header for the table in React Table
                    let meetCityKeys = [
                        '__EMPTY_11',
                        '__EMPTY_14',
                    ];
                    // * Converts all the events data into the labels and data for the piechart of meet city
                    let meetCity = [...SwimFormulas.mostOccurrences(SwimFormulas.meetCity(swimmerData))].sort((a, b) => b[1] - a[1]);
                    // * Converts it into array that holds objects with properties that can be used by the ReactTable Component
                    let meetCityArr = [];
                    meetCity.forEach((city) => meetCityArr.push(Object({ '__EMPTY_11': city[0], '__EMPTY_14': city[1] })));
                    // * Pass it the keys that will be used as the header for the table in React Table


                    let meetKeys = [
                        '__EMPTY_9',
                        '__EMPTY_12',
                        '__EMPTY_14',
                        '__EMPTY_16',
                        '__EMPTY_17'
                    ];
                    // * Converts all events data into label for Meet data. (Meet Name and occurence of best time)
                    // * Converts the Meet Data Map into useable 'key' and 'value' arrays for graphing
                    let meets = [...SwimFormulas.mostOccurrences(SwimFormulas.meetName(swimmerData))].sort((a, b) => b[1] - a[1]);
                    let timeMap = new Map();
                    meets.forEach(el => timeMap.set(el[0]));
                    // * Going to be used for the groupings to sort by multiple properties. 
                    for (let el of timeMap) {
                        // * Builds a Key for the map that consists of an array of Objects where all the meetNames are the same
                        el[1] = swimmerData.filter(item => item.__EMPTY_12 === el[0])
                        timeMap.set(el[0], el[1]);
                    }

                    for (let el of timeMap) {
                        let length = el[1].length
                        let times = el[1].map(el => el.__EMPTY_8);
                        let average = times.reduce((a, b) => a + b) / length;
                        let stddev = times.map(t => Math.pow((t - average), 2));
                        stddev = Math.sqrt(stddev.reduce((a, b) => a + b) / length);

                        timeMap.set(el[0], { groupMembers: el[1], average: average, stddev: stddev, length: length })
                    }
                    timeMap = [...timeMap].sort((a, b) => (a[1].average > b[1].average) && (a[1].stddev > b[1].stddev));
                    let meetArr = [];
                    timeMap.forEach((city, index) => meetArr.push(Object(
                        {
                            '__EMPTY_9': index + 1,
                            '__EMPTY_12': city[0],
                            '__EMPTY_14': city[1].length,
                            '__EMPTY_16': new Date(city[1].average).toISOString().substr(14, 8),
                            '__EMPTY_17': new Date(city[1].stddev).toISOString().substr(14, 8),
                        })
                    ))


                    return (
                        <div>
                            <Container fluid className="mt-1">
                                <Row>
                                    {/* Displays The Distribution of months with best time, aka. Peak Months */}
                                    <Col className="text-center colBorder"> <PeakMonth swimmerData={swimmerData} allSwimmerData={allSwimmerData} allSwimmerDataSubComponents={allSwimmerDataSubComponents} event={this.props.event} />
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col className="colBorder" md={6} sm={12}>
                                        <FastestCity swimmerData={swimmerData} />
                                        <ReactTable tableData={meetCityArr} allowedKeys={meetCityKeys} />
                                    </Col>
                                    <Col className="colBorder" md={6} sm={12}>
                                        <FastestMeets swimmerData={swimmerData} swimEvent={this.props.swimEvent} />
                                        <ReactTable tableData={meetArr} allowedKeys={meetKeys} />
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    )
                }

                // * Need to process data from Workbook -> Worksheets -> Event -> Swimmers
                try {
                    // * For getting Data of the subcomponents that will add up to all events
                    allData.forEach(Workbook => {
                        let Sheet = Workbook[0];
                        Sheet.forEach(sheet => {
                            allSwimmerDataSubComponents.push(sheet)
                        })
                    })

                    // * For getting the Data of all sheets containing all events (Workbook holds each fetch file)
                    // * Each fetch file contains 18 Sheets (aka arrays of events) in each, it contains 50 swimmers (Objects) (Max)
                    allData.forEach(Workbook => {
                        Workbook.forEach(Sheet => {
                            Sheet.forEach(Event => {
                                Event.forEach(Swimmer => {
                                    Swimmer.__EMPTY_8 = SwimFormulas.standardizeTimes(Swimmer.__EMPTY_7);
                                    allSwimmerData.push(Swimmer);
                                })
                            })
                        })
                    })

                } catch {
                    console.log('Error: Unable to convert workbook data into sheets');
                }

                // * Pass it the keys that will be used as the header for the table in React Table
                let meetCityKeys = [
                    '__EMPTY_11',
                    '__EMPTY_14',
                ];

                // * Converts all the events data into the labels and data for the piechart of meet city
                let meetCity = Array.from(SwimFormulas.mostOccurrences(SwimFormulas.meetCity(allSwimmerData))).sort((a, b) => b[1] - a[1]);
                let meetCityKey = meetCity.map(city => city[0]);
                let meetCityNum = meetCity.map(number => number[1]);
                // * Converts it into array that holds objects with properties that can be used by the ReactTable Component
                let meetCityArr = [];
                meetCity.forEach((city, index) => meetCityArr.push(Object({ '__EMPTY_11': meetCityKey[index], '__EMPTY_14': meetCityNum[index] })));

                // * Pass it the keys that will be used as the header for the table in React Table
                let meetKeys = [
                    '__EMPTY_12',
                    '__EMPTY_14',
                ];

                // * Converts all events data into label for Meet data. (Meet Name and occurence of best time)
                // * Converts the Meet Data Map into useable 'key' and 'value' arrays for graphing
                let meets = Array.from(SwimFormulas.mostOccurrences(SwimFormulas.meetName(allSwimmerData))).sort((a, b) => b[1] - a[1]);
                let meetName = meets.map(name => name[0]);
                let meetNumber = meets.map(number => number[1]);
                let meetArr = [];
                meets.forEach((city, index) => meetArr.push(Object({ '__EMPTY_12': meetName[index], '__EMPTY_14': meetNumber[index] })))

                return (
                    <div>
                        <Container fluid className="mt-1">
                            <Row>
                                {/* Displays The Distribution of months with best time, aka. Peak Months */}
                                <Col className="text-center colBorder"> <PeakMonth swimmerData={swimmerData} allSwimmerData={allSwimmerData} allSwimmerDataSubComponents={allSwimmerDataSubComponents} event={this.props.event} />
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col className="colBorder" sm={6}>
                                    <FastestCity swimmerData={allSwimmerData} />
                                    <ReactTable tableData={meetCityArr} allowedKeys={meetCityKeys} />
                                </Col>
                                <Col className="colBorder" sm={6}>
                                    <FastestMeets swimmerData={allSwimmerData} swimEvent={this.props.swimEvent} />
                                    <ReactTable tableData={meetArr} allowedKeys={meetKeys} />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )
            }
        }
        catch (e) {
            console.log(e);
            return (
                <div></div>
            )
        }
    }
}

ClubDashboard.propTypes = {
    /**
     *  Standardized JSON File structure Converted from Clubs Component. It is an Array[Workbooks[Events[Swimmers[]]]]
     */
    swimmerData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)))),

    /**
     *  The name of the event
     */
    event: PropTypes.string.isRequired,
    /**
     * The name of the swimEvent
     */
    swimEvent: PropTypes.string.isRequired,

}
export default ClubDashboard;