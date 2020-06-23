import React from 'react';
import { Component } from 'react';
import './swimmer.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Linegraph from '../../components/linegraph/linegraph';
import FastestMeets from '../../components/analytics/fastestMeets/fastestMeets';
import TimeAnalytics from '../../components/analytics/timeAnalytics/timeAnalytics';
import XLSX from 'xlsx';
import SwimmerTable from '../../controllers/swimmertable/swimmertable';

class Swimmer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ddl_season: '2019-2020',
            ddl_club: '72542',
            ddl_course: 'SCM',
            clubName: 'Oakville Aquatic Club',
            swimmerData: null,
            event: null,
            swimEvent: '',
            tableData: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // * Handles the state selection for when you select a new dropdown from the Form 
    handleInputChange(onEvent) {
        this.setState({ [onEvent.target.name]: onEvent.target.value });
    }


    // * Handles the logic for when you click submit on the form 
    handleSubmit(onEvent) {
        // * Prevent page from rerouting (need to see if we want it to use a different url for page handling)
        onEvent.preventDefault();


        // * Formed data is used for getting the contents of the submitted form 
        const formdata = new FormData(onEvent.target);
        let clubID = formdata.get('ddl_club');
        let season = formdata.get('ddl_season');
        let course = formdata.get('ddl_course');
        let gender = formdata.get('ddl_gender');
        let agegroup = formdata.get('ddl_age');
        let event = formdata.get('ddl_event');

        // * Required for getting correct Season, They store it as a single date, 2020 opposed to 2019-2020.
        season = season.split('-')[1];

        // TODO Allow for language and point system changes if required
        const language = 'us';
        const points = 'fina_2019';

        // * Creates a new URL adding the appropriate Search Parameters so that you can find the excel file
        let url = new URL('https://www.swimrankings.net/services/RankingXls/ranking.xls?');
        let searchParameter = new URLSearchParams(url);
        searchParameter.append('gender', gender);
        searchParameter.append('agegroup', agegroup);
        searchParameter.append('course', course);
        searchParameter.append('season', season);
        searchParameter.append('clubID', clubID);
        searchParameter.append('Language', language);
        searchParameter.append('Points', points);
        url += searchParameter.toString();

        // * CORS ANYWHERE IS USED, SINCE WE CAN NOT GET CORS FUNCTIONALITY FROM LOCALHOST:3000 and React.
        url = 'https://cors-anywhere.herokuapp.com/' + url;

        // * Fetch the file from swimranking.net, then will convert from .xls (excel) to JSON for graphing and table
        fetch(url, {
            method: "GET"
        })
            .then(response => {
                if (!response.ok) throw new Error("Unable to fetch file");
                return response.arrayBuffer();
            })
            .then(buffer => {
                let bookBuffer = new Uint8Array(buffer);
                let workbook = XLSX.read(bookBuffer, {
                    type: "array"
                })
                // * Finds the correct sheet within the workbook based on the name of the event
                let data = workbook.Sheets[event];

                // * Converts the XLS (Excel File to JSON to allow us to graph data)
                let toJSON = XLSX.utils.sheet_to_json(data);

                // * Error Handling: if the data returned is an empty array
                if (toJSON.length === 0) {
                    console.log("Error: Empty Data Array");
                } else {

                    // * Removes the first row so that the default values aren't used
                    toJSON.shift();
                    this.setState({ swimmerData: toJSON, swimEvent: event, tableData: toJSON })
                }
            }).catch((error) => {
                console.log(error)
            })
    }

    render() {

        return (
            <div>
                <div>
                    <h1 className="formTitle">Swimmer Rankings</h1>
                </div>

                <Form className='rankingsForm' onSubmit={this.handleSubmit}>
                    <Form.Row>
                        {/**  Swimming Season */}
                        <Form.Group >
                            <Form.Control name="ddl_season" id="ddl_season" defaultValue={this.state.ddl_season} className="dropdownBox custom-select" as="select">
                                <option value="" disabled>Season</option>
                                <option value="2007-2008">2007-2008</option>
                                <option value="2008-2009">2008-2009</option>
                                <option value="2009-2010">2009-2010</option>
                                <option value="2010-2011">2010-2011</option>
                                <option value="2011-2012">2011-2012</option>
                                <option value="2012-2013">2012-2013</option>
                                <option value="2013-2014">2013-2014</option>
                                <option value="2014-2015">2014-2015</option>
                                <option value="2015-2016">2015-2016</option>
                                <option value="2016-2017">2016-2017</option>
                                <option value="2017-2018">2017-2018</option>
                                <option value="2018-2019">2018-2019</option>
                                <option value="2019-2020">2019-2020</option>
                                <option value="2020-2021">2020-2021</option>
                                <option value="2021-2022">2021-2022</option>
                            </Form.Control>
                        </Form.Group>

                        {/** Club */}
                        <Form.Group>
                            <Form.Control name="ddl_club" id="ddl_club" defaultValue={this.state.ddl_club} className="dropdownBox custom-select" as="select">
                                <option disabled>Club</option>
                                <option value="72542" name="Oakville Aquatic Club">Oakville Aquatic Club</option>
                            </Form.Control>
                        </Form.Group>

                        {/**  Course */}
                        <Form.Group >
                            <Form.Control name="ddl_course" id="ddl_course" defaultValue={this.state.ddl_course} className="dropdownBox custom-select" as="select">
                                <option disabled>Course</option>
                                <option value="LCM">Long Course (50m)</option>
                                <option value="SCM">Short Course (25m)</option>
                            </Form.Control>
                        </Form.Group>

                        {/**  Gender */}
                        <Form.Group >
                            <Form.Control name="ddl_gender" id="ddl_gender" defaultValue={this.state.ddl_gender} className="dropdownBox custom-select" as="select">
                                <option disabled>Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </Form.Control>
                        </Form.Group>

                        {/**  Age */}
                        <Form.Group >
                            <Form.Control name="ddl_age" id="ddl_age" defaultValue={this.state.ddl_age} className="dropdownBox custom-select" as="select">
                                <option disabled>Age</option>
                                <option value="X_X">Open (All years)</option>
                                <option value="X_10">10 years and younger</option>
                                <option value="11_11">11 years</option>
                                <option value="11_12">11 - 12 years</option>
                                <option value="12_12">12 years</option>
                                <option value="13_13">13 years</option>
                                <option value="13_14">13 - 14 years</option>
                                <option value="14_14">14 years</option>
                                <option value="15_15">15 years</option>
                                <option value="15_16">15 - 16 years</option>
                                <option value="15_17">15 - 17 years</option>
                                <option value="16_16">16 years</option>
                                <option value="17_17">17 years</option>
                                <option value="17_18">17 - 18 years</option>
                                <option value="18_18">18 years</option>
                            </Form.Control>
                        </Form.Group>

                        {/**   Event */}
                        {/* Values for events are named as such inorder to match naming convention of the worksheets from excel workbook */}
                        <Form.Group >
                            <Form.Control name="ddl_event" id="ddl_event" defaultValue={this.state.ddl_event} className="dropdownBox custom-select" as="select">
                                <option disabled>Event</option>
                                <option value="50m Fr">50 Free</option>
                                <option value="100m Fr">100 Free</option>
                                <option value="200m Fr">200 Free</option>
                                <option value="400m Fr">400 Free</option>
                                <option value="800m Fr">800 Free</option>
                                <option value="1500m Fr">1500 Free</option>
                                <option value="50m Bk">50 Back</option>
                                <option value="100m Bk">100 Back</option>
                                <option value="200m Bk">200 Back</option>
                                <option value="50m Br">50 Breast</option>
                                <option value="100m Br">100 Breast</option>
                                <option value="200m Br">200 Breast</option>
                                <option value="50m Bu">50 Fly</option>
                                <option value="100m Bu">100 Fly</option>
                                <option value="200m Bu">200 Fly</option>
                                <option value="100m Me">100 I.Medley</option>
                                <option value="200m Me">200 I.Medley</option>
                                <option value="400m Me">400 I.Medley</option>
                            </Form.Control>
                        </Form.Group>
                        <Button className="formButton" type="submit">
                            SHOW
                        </Button>
                    </Form.Row>
                </Form>

                {/* Dashboard with all the logic for the graph **/}
                < Container fluid >
                    <Row className='mb-3'>
                        <Col className='pr-0 mt-2' lg={8}>
                            <Linegraph swimmerData={this.state.swimmerData} swimEvent={this.state.swimEvent} clubName={this.state.clubName} />
                        </Col>
                        <Col className='pl-0 mt-2' lg={4}>
                            <TimeAnalytics swimmerData={this.state.swimmerData} swimEvent={this.state.swimEvent} />
                            <FastestMeets swimmerData={this.state.swimmerData} swimEvent={this.state.swimEvent} />
                        </Col>
                    </Row>
                </Container >

                <Container fluid>
                    <Row>
                        <Col>
                            <SwimmerTable tableData={this.state.tableData}></SwimmerTable>
                        </Col>
                    </Row>

                </Container>

            </div >
        )
    }
}
export default Swimmer;