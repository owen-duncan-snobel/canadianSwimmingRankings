import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { EVENTS } from '../../constants/swimmingConstants/swimmingConstants';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Linegraph from '../../components/linegraph/linegraph';
import FastestMeets from '../../components/analytics/fastestMeets/fastestMeets';
import TimeAnalytics from '../../components/analytics/timeAnalytics/timeAnalytics';
import SwimmerTable from '../../controllers/swimmertable/swimmertable';

class SwimDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        let allData = this.props.swimmerData;
        let clubName = this.props.clubName;
        let event = this.props.swimEvent;
        let swimmerData = [];
        let meetData = [];
        let tableData = [];

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
                        dataset.push(swimmer);
                    })
                    swimmerData.push(dataset);
                })
                // * Flatten data from multiple seasons into one array to be placed in table / meetchart
                meetData = swimmerData.flat();
            } catch (e) {
                console.log(e);
            }

            return (
                <div>
                    {/* Dashboard with all the logic for the graph **/}
                    < Container fluid >
                        <Row className='mb-3'>
                            <Col className='pr-0 mt-2' lg={8}>
                                <Linegraph swimmerData={swimmerData} swimEvent={event} clubName={clubName} />
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
export default SwimDashboard;