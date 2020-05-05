import React from 'react'
import { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Linegraph from '../linegraph/linegraph'
import Piechart from '../piechart/piechart'
import XLSX from 'xlsx'
import SwimmerTable from '../swimmertable/swimmertable'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ddl_season: '2019-2020',
            ddl_club: '72542',
            ddl_course: 'SCM',
            swimmerData: null,
            swimmerName: '',
            swimmerTime: '',
            swimEventName: '',
            tableBody: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateSwimmer = this.updateSwimmer.bind(this);
    }

    updateSwimmer(swimmer) {
        // TODO NEED TO FIX HOW THESE ARE COLLECTED IT IS VERY UGLY
        this.setState({ swimmerName: swimmer.name, swimmerTime: swimmer.time })
        console.log(swimmer)
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
        let club = formdata.get('ddl_club');
        let season = formdata.get('ddl_season');
        let course = formdata.get('ddl_course');
        let gender = formdata.get('ddl_gender');
        let agegroup = formdata.get('ddl_age');
        let event = formdata.get('ddl_event');
        let stroke = event.split(' ')[1];

        // * Required for getting correct Season, They store it as a single date, 2020 opposed to 2019-2020.
        season = season.split('-')[1];

        // TODO Allow for language and point system changes if required
        //   const language = 'us';
        // const points = 'fina_2019';

        // * Creates a new URL adding the appropriate Search Parameters so that you can find the excel file
        let url = new URL('https://www.swimrankings.net/services/RankingXls/ranking.xls?');
        let searchParameter = new URLSearchParams(url);
        searchParameter.append('gender', gender);
        searchParameter.append('agegroup', agegroup);
        searchParameter.append('course', course);
        searchParameter.append('season', season);
        searchParameter.append('clubID', club);
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
                // * Removes the first row so that the default values aren't used
                toJSON.shift();

                this.setState({ swimmerData: toJSON, swimEventName: event, tableBody: toJSON })
            })
    }

    render() {

        return (
            <>
                <style type="text/css">
                    {`
                    .dropdownBox{
                        border: 1px solid #00aad8;
                        border-radius: 0px;
                        color: #00aad8;
                        margin-left:0.5rem;
                        margin-right:0.5rem;
                        width:auto;
                        font-size:13px;
                    }
                    .custom-select {
                        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%2300aad8' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E") 
                    }
                    .formTitle{
                        margin-top:1.5rem;
                        color: #00aad8;
                        font-weight:bold;
                        text-transform: uppercase;
                    }
                    .formButton{
                        background-color:#00aad8;
                        border: 1px solid #00aad8;
                        border-radius: 0px;
                        height:38px;
                        width:80px;
                        font-size:13px;
                    }
                    .swimTable{
                        font-size:0.8rem !important;
                        width:100%;
                    }    
                    thead{
                        display:inherit;
                        width:inherit;
                    }
                    tbody{
                        height: 400px; 
                        width:100%; 
                        overflow-y: scroll;
                        display:block}    
    
                    .rankingsContainer{
                        margin:0% !important;
                    }
               `}
                </style>
                <div>
                    <hr></hr>
                    <h1 className="formTitle">Canadian Swimming Rankings</h1>
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
                                <option value="72542">Oakville Aquatic Club</option>
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
                                <option value="18_24">18 - 24 years</option>
                            </Form.Control>
                        </Form.Group>

                        {/**  Event */}
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
                                <option value="100m Me">100 Fly</option>
                                <option value="200m Me">200 Fly</option>
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
                <Container className="rankingsContainer">
                    <Row>
                        <Col lg={8}>
                            <Linegraph swimmerData={this.state.swimmerData} swimEvent={this.state.swimEventName} updateSwimmer={this.updateSwimmer} />
                        </Col>

                        <Col lg={4}>
                            <SwimmerTable tableBody={this.state.tableBody}></SwimmerTable>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Piechart meetData={this.state.swimmerData} swimmerName={this.state.swimmerName} swimmerTime={this.state.swimmerTime} />
                        </Col>
                    </Row>
                </Container>
            </>)
    }
}
export default Dashboard;