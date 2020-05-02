import React from 'react'
import Form from 'react-bootstrap/Form'
import { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Linegraph from '../linegraph/linegraph'
import XLSX from 'xlsx'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ddl_season: '2019-2020',
            ddl_club: '72542',
            ddl_course: 'SCM',
            swimmerData: null,
            occurenceData: null,
            swimEventName: '',
            currentPoint: -1,
            tableBody: []
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

                // * Remove the first row so that the default values aren't used
                toJSON.shift();

                // * Converting the JSON To working usable data to graph (Shifts and pop are for removing the default row)
                let athletes = toJSON.map(athlete => athlete.__EMPTY_3);
                let rank = toJSON.map(rank => rank.__EMPTY_9).reverse();

                // * Since Swim Times can Range from under a minute up to 20 mins we will standardize the times to all have the same length 
                // * In the following format MM:SS:ss
                const standardize_times = (time) => {
                    // * Ensures that all time strings given are in an appropriate ISO String format
                    if (time.length === 5) time = '00:' + time;
                    if (time.length === 7) time = '0' + time;
                    let milli = ((parseInt(time.split(':')[0] * 60000)) + (parseInt(time.split(':')[1].split('.')[0] * 1000)) + (parseInt(time.split('.')[1]) * 10));
                    return milli;
                }

                let time = toJSON.map(time => standardize_times(time.__EMPTY_7)).reverse();

                let meets = toJSON.map(meet => meet.__EMPTY_12);

                // * Finds the Swim Meet with the most occurences of best times from the top 50 Swimmers
                const mostMeetOccurences = (list) => {
                    let map = new Map();
                    while (list.length !== 0) {
                        if (!map.has(list[0])) {
                            map.set(list[0], 0);
                        } else {
                            map.set(list[0], map.get(list[0]) + 1);
                        }
                        list.shift();
                    }
                    return map;
                }
                let meetOccurences = mostMeetOccurences(meets);
                let meetName = meetOccurences.keys();
                let numberOfOccurences = meetOccurences.values();

                this.setState({ swimmerData: { time, athletes, rank }, occurenceData: { meetName, numberOfOccurences }, swimEventName: event, tableBody: toJSON })
            })
    }


    // * Updates the table header from graph data
    updateTableHeader() {
        if (this.state.tableBody.length === 0) {
            return;
        }
        else {
            return (
                <thead>
                    <tr>
                        <th>Fullname</th>
                        <th>Nation</th>
                        <th>Clubcode</th>
                        <th>Time</th>
                        <th>Place</th>
                        <th>Meetcity</th>
                        <th>Meet</th>
                        <th>Clubname</th>

                    </tr>
                </thead>)
        }
    }

    // * Updates the table bodys data from graph (aka. Swimmer Name times ... from excel sheet)
    updateTableBody() {
        // * If no data has been given table header remains empty
        if (this.state.tableBody.length === 0) {
            return;
        }
        else {
            let allowedKeys = [
                // '__EMPTY',               GENDER IS REDUNDANT
                // '__EMPTY_1',             DISTANCE IS REDUNDANT   
                // '__EMPTY_2',             STROKE IS REDUNDANT
                '__EMPTY_3',
                //  '__EMPTY_4',            BIRTHDATE NOT IMPORTANT CURRENTLY EITHER
                '__EMPTY_5',
                '__EMPTY_6',
                '__EMPTY_7',
                '__EMPTY_9',
                //                          MEETDATE NOT IMPORTANT CURRENTLY AS DATE IS UNREADABLE  '__EMPTY_10',
                '__EMPTY_11',
                '__EMPTY_12',
                '__EMPTY_13']
            return (
                <tbody>
                    {
                        this.state.tableBody.map(item => {
                            return (<tr name={item.__EMPTY_9} > {
                                Object.entries(item).filter(([key, value]) => allowedKeys.includes(key))
                                    .map(([key, value]) => {
                                        return (<td>{value}</td>)
                                    })
                            }
                            </tr>
                            )
                        })
                    }
                </tbody>
            )
        }
    }


    render() {
        let chart;
        // * Don't display chart if no data has been provided yet
        if (this.state.swimmerData == null) {
        } else {
            chart = <Dashboard swimmerData={this.state.swimmerData} swimEvent={this.state.swimEventName} />
        }



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
                    .table{
                        font-size:0.8rem !important;
                
                    }    
                    thead{display:block;}
                    tbody{height: 400px; width:100%; overflow-y: scroll; display:block}    
    
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
                            <Form.Control name="ddl_season" id="ddl_season" defaultValue={this.state.ddl_season} onEvent={this.handleInputChange} className="dropdownBox custom-select" as="select">
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
                            <Form.Control name="ddl_club" id="ddl_club" defaultValue={this.state.ddl_club} onEvent={this.handleInputChange} className="dropdownBox custom-select" as="select">
                                <option disabled>Club</option>
                                <option value="72542">Oakville Aquatic Club</option>
                            </Form.Control>
                        </Form.Group>

                        {/**  Course */}
                        <Form.Group >
                            <Form.Control name="ddl_course" id="ddl_course" defaultValue={this.state.ddl_course} onEvent={this.handleInputChange} className="dropdownBox custom-select" as="select">
                                <option disabled>Course</option>
                                <option value="LCM">Long Course (50m)</option>
                                <option value="SCM">Short Course (25m)</option>
                            </Form.Control>
                        </Form.Group>

                        {/**  Gender */}
                        <Form.Group >
                            <Form.Control name="ddl_gender" id="ddl_gender" defaultValue={this.state.ddl_gender} onEvent={this.handleInputChange} className="dropdownBox custom-select" as="select">
                                <option disabled>Gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </Form.Control>
                        </Form.Group>

                        {/**  Age */}
                        <Form.Group >
                            <Form.Control name="ddl_age" id="ddl_age" defaultValue={this.state.ddl_age} onEvent={this.handleInputChange} className="dropdownBox custom-select" as="select">
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
                            <Form.Control name="ddl_event" id="ddl_event" defaultValue={this.state.ddl_event} onEvent={this.handleInputChange} className="dropdownBox custom-select" as="select">
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
                            {chart}
                        </Col>
                        <Col lg={4}>
                            <Table className="table" hover size="sm">
                                {this.updateTableHeader()}
                                {this.updateTableBody()}
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </>)
    }
}
export default Dashboard;