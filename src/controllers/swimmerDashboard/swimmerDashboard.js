import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { EVENTS } from '../../constants/swimmingConstants/swimmingConstants';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Linegraph from '../../components/linegraph/linegraph';
import * as SwimFormulas from '../../constants/graphFunctions/graphFunctions';
import FastestMeets from '../../components/analytics/fastestMeets/fastestMeets';
import TimeAnalytics from '../../components/analytics/timeAnalytics/timeAnalytics';
import SwimmerTable from '../../controllers/swimmertable/swimmertable';
import PropTypes from 'prop-types';

/**
 * Swim Dashboard converts the data fetched from the route 'swimmer', to a usable format to be used by the components (Linegraph,Analytics, Swimmertable/React Table).
 * @component
 */
class SwimDashboard extends Component {

    render() {
        let allData = this.props.swimmerData;
        let clubName = this.props.clubName;
        let event = this.props.swimEvent;
        let year = this.props.year;
        let swimmerData = [];
        let meetData = [];

        if (this.props.swimmerData === null || this.props.swimmerData.length === 0) {
            return (
                <div name="InvalidYearNoData">  </div>
            )
        } else {
            try {
                // * Standardizes the data, converts the JSON objects into a complete dataset of the correct event with swimmer objects.
                allData[0].forEach(workbook => {
                    // * In every Workbook (Age / Year) it holds Sheets with the Events, will select the sheet that contains the events data
                    let index = EVENTS.indexOf(event)
                    let Sheet = workbook[index];
                    let dataset = [];
                    // * For the selected event collect all the swimmer data
                    Sheet.forEach(swimmer => {
                        // * Convert time from MM:SS.ss to Milliseconds (Needed for graphing y-axis for time, since it is not a standardized time format)
                        swimmer.__EMPTY_8 = SwimFormulas.standardizeTimes(swimmer.__EMPTY_7);
                        dataset.push(swimmer);
                    })
                    swimmerData.push(dataset);
                })
                // * Flatten data from multiple seasons into one array to be placed in table / meetchart
                meetData = swimmerData.flat(Infinity);
            } catch (e) {
                console.log(e);
            }

            return (
                <div>
                    {/* Dashboard with all the logic for the graph **/}
                    < Container fluid >
                        <Row className='mb-3'>
                            <Col className='pr-0 mt-2' lg={8}>
                                <Linegraph swimmerData={swimmerData} swimEvent={event} clubName={clubName} year={year} />
                            </Col>
                            <Col className='pl-0 mt-2' lg={4}>

                                <div className='colBorder ml-2'>
                                    <TimeAnalytics swimmerData={swimmerData} swimEvent={event} />
                                </div>

                                <div className='colBorder ml-2 mt-2'>
                                    <FastestMeets className="" swimmerData={meetData} swimEvent={event} />
                                </div>

                            </Col>
                        </Row>
                    </Container >

                    <Container fluid>
                        <Row>
                            <Col>
                                <SwimmerTable tableData={swimmerData}></SwimmerTable>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}

SwimDashboard.propTypes = {
    /**
     *  Standardized JSON File structure Converted from Swimmer Component. It is an Array[Workbooks[Events[Swimmers[]]]]
     */
    swimmerData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)))),

    /**
     *  The name of the event
     */
    swimEvent: PropTypes.string.isRequired,

    /**
     *   Standardized JSON File structure Converted from Swimmer Component.
     */
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)))),

    /**
     *  The name of the club that is being graphed 
     */
    clubName: PropTypes.string.isRequired,

    /**
     *  The season that data is being graphed from
     */
    season: PropTypes.string
}
export default SwimDashboard;