import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
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
            swimmerData: null
        }
    }

    render() {
        if (this.props.swimmerData === null || this.props.swimmerData.length === 0) {
            return (
                <div name="InvalidYearNoData">  </div>
            )
        } else {
            return (
                <div>
                    {/* Dashboard with all the logic for the graph **/}
                    < Container fluid >
                        <Row className='mb-3'>
                            <Col className='pr-0 mt-2' lg={8}>
                                <Linegraph swimmerData={this.props.swimmerData} swimEvent={this.props.swimEvent} clubName={this.props.clubName} />
                            </Col>
                            <Col className='pl-0 mt-2' lg={4}>

                                <div className='colBorder ml-2'>
                                    <TimeAnalytics swimmerData={this.props.swimmerData} swimEvent={this.props.swimEvent} />
                                </div>

                                <div className='colBorder ml-2 mt-2'>
                                    <FastestMeets className="" swimmerData={this.props.swimmerData} swimEvent={this.props.swimEvent} />
                                </div>

                            </Col>
                        </Row>
                    </Container >

                    <Container fluid>
                        <Row>
                            <Col>
                                <SwimmerTable tableData={this.props.tableData}></SwimmerTable>
                            </Col>
                        </Row>

                    </Container>
                </div>
            )
        }
    }
}
export default SwimDashboard;