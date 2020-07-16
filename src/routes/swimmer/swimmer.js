import React from 'react';
import { Component } from 'react';
import './swimmer.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { CLUBS } from '../../constants/swimmingConstants/swimmingConstants';
import SwimDashboard from '../../controllers/swimmerDashboard/swimmerDashboard';
import { AGES, SEASONS, COURSES, GENDERS } from '../../constants/swimmingConstants/swimmingConstants';
import XLSX from 'xlsx';

class Swimmer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            ddl_season: '2019-2020',
            compare: '',
            year: '',
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

        this.setState({ loading: true })

        // * Formed data is used for getting the contents of the submitted form 
        const formdata = new FormData(onEvent.target);
        let clubID = formdata.get('ddl_club');
        let season = formdata.get('ddl_season');
        let course = formdata.get('ddl_course');
        let gender = formdata.get('ddl_gender');
        let agegroup = formdata.get('ddl_age');
        let event = formdata.get('ddl_event');
        let compare = formdata.get('compare');
        let clubName = CLUBS.get(clubID);

        // * Required for getting correct Season, They store it as a single date, 2020 opposed to 2019-2020.
        let year = season;
        season = season.split('-')[1];

        // TODO Allow for language and point system changes if required
        const language = 'us';
        const points = 'fina_2019';

        // * Creates a new URL adding the appropriate Search Parameters so that you can find the excel file
        let urls = [];

        // *  Creates an array of all possible links to the data that you are want to fetch data from
        for (let age of AGES) {
            for (let season of SEASONS) {
                for (let course of COURSES) {
                    for (let gender of GENDERS) {
                        let url = 'https://www.swimrankings.net/services/RankingXls/ranking.xls?';
                        let param = new URLSearchParams();
                        param.append('gender', gender);
                        param.append('agegroup', age);
                        param.append('course', course);
                        param.append('season', season.split('-')[1]);
                        param.append('clubID', clubID);
                        url += param.toString();
                        urls.push(url);
                    }
                }
            }
        }

        if (compare === 'Last1') {
            urls = urls.filter(url => url.includes('clubID=' + clubID)
                && (url.includes('season=' + season) || url.includes('season=' + (parseInt(season) - 1)))
                && url.includes('course=' + course)
                && url.includes('gender=' + gender)
                && url.includes('agegroup=' + agegroup)
            );
        } else if (compare === 'Last2') {
            urls = urls.filter(url => url.includes('clubID=' + clubID)
                && (url.includes('season=' + season) || url.includes('season=' + (parseInt(season) - 1)) || url.includes('season=' + (parseInt(season) - 2)))
                && url.includes('course=' + course)
                && url.includes('gender=' + gender)
                && url.includes('agegroup=' + agegroup)
            );
        } else if (compare === 'Last5') {
            urls = urls.filter(url => url.includes('clubID=' + clubID)
                && (url.includes('season=' + season) || url.includes('season=' + (parseInt(season) - 1)) || url.includes('season=' + (parseInt(season) - 2)) || url.includes('season=' + (parseInt(season) - 3)) || url.includes('season=' + (parseInt(season) - 4)) || url.includes('season=' + (parseInt(season) - 5)))
                && url.includes('course=' + course)
                && url.includes('gender=' + gender)
                && url.includes('agegroup=' + agegroup)
            );
        } else {
            urls = urls.filter(url => url.includes('clubID=' + clubID)
                && url.includes('season=' + season)
                && url.includes('course=' + course)
                && url.includes('gender=' + gender)
                && url.includes('agegroup=' + agegroup)
            );
        }



        // * Fetch the file from swimranking.net, then will convert from .xls (excel) to JSON for graphing and table
        Promise.all(urls.map(url => fetch('https://cors-anywhere.herokuapp.com/' + url, {
            method: "GET",
            mode: 'cors',
            headers: {
                'Host': 'www.swimrankings.net',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,',
            },
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
                let data = [];
                for (let sheet in workbook.Sheets) {
                    // * Might return it as csv and remove tops of each for database adding to allow faster queries of swimmers
                    let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
                    // * removes place holder for top of file
                    sheetData.shift();
                    data.push(sheetData);
                }
                return data;
            }).catch((error) => {
                console.log(error)
            })
        ))
            .then((data) => {

                if (data[0] === undefined) {
                    console.log('Error: No Swimmer Data was returned');
                } else {
                    // * Need to standardize data structure, ([Workbook (Year / Agegroup)] -> [Sheets (aka Event)] -> [Swimmers in event])
                    data = [data];
                }
                this.setState({ swimmerData: /* test.default */  data, swimEvent: event, tableData: /* test.default */  data, year: year, clubName: clubName, loading: false })
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

                        <Form.Group>
                            <Form.Control name="compare" id="compare" defaultValue={this.state.compare} className="dropdownBox custom-select" as="select">
                                <option value="" disabled>Compare With</option>
                                <option value="">None</option>
                                <option value="Last1">Last Season</option>
                                <option value="Last2">Last 2 Seasons</option>
                                <option value="Last5">Last 5 Seasons</option>
                            </Form.Control>
                        </Form.Group>

                        {/** Club */}
                        <Form.Group>
                            <Form.Control name="ddl_club" id="ddl_club" defaultValue={this.state.ddl_club} className="dropdownBox custom-select" as="select">
                                <option disabled>Club</option>
                                <option value="73893" name="Cobra Swim Club">Cobra Swim Club</option>
                                <option value="72359" name="London Aquatic Club">London Aquatic Club</option>
                                <option value="72365" name="Newmarket Stringrays Swim Club">Newmarket Stringrays Swim Club</option>
                                <option value="74026" name="Markham Aquatic Club">Markham Aquatic Club</option>
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
                            {!this.state.loading && "SHOW"}
                            {this.state.loading && <Spinner animation="border" size="sm" role="status" />}
                        </Button>
                    </Form.Row>
                </Form>
                <SwimDashboard swimmerData={this.state.swimmerData} swimEvent={this.state.swimEvent} tableData={this.state.tableData} clubName={this.state.clubName} year={this.state.year}></SwimDashboard>
            </div >
        )
    }
}
export default Swimmer;