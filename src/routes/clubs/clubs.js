import React, { Component } from 'react';
import './clubs.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AGES, SEASONS, COURSES, GENDERS } from '../../constants/swimming/swimming';
import PeakMonth from '../../components/peakMonth/peakMonth';
import Analytics from '../../components/analytics/analytics';
const XLSX = require('xlsx')

class Clubs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ddl_season: '2019-2020',
            ddl_course: 'SCM',
            ddl_club: '72542',
            ddl_event: '',
            swimmerData: null,
            swimEvent: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(onEvent) {
        this.setState({ [onEvent.target.name]: onEvent.target.value });
    }

    handleSubmit(onEvent) {
        // * Prevent page from rerouting (need to see if we want it to use a different url for page handling)
        onEvent.preventDefault();

        // * Get the Form Data 
        const formdata = new FormData(onEvent.target);
        let clubID = formdata.get('ddl_club');
        let season = formdata.get('ddl_season');
        let course = formdata.get('ddl_course');
        let gender = formdata.get('ddl_gender');
        let agegroup = formdata.get('ddl_age');
        let event = formdata.get('ddl_event');
        let stroke = event.split(' ')[1];

        // * Required for getting correct Season, They store it as a single date, 2020 opposed to 2019-2020.
        season = season.split('-')[1];

        // * Urls will contain all the URLS to fetch from swimmingrankings.net to get all the excel files
        // * File names will contain all the file names when we go to write files back they will keep corresponding name
        let urls = [];
        let fileNames = [];
        let alldata = [];

        // *  Creates an array of all possible links to the data that you are want to fetch data from
        // TODO will need to make it so you can fetch over years span so an update to the form and logic will be needed
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
                        fileNames.push(url.split('?')[1] + '.xlsx');
                    }
                }
            }
        }

        // * Will use filtering to allow them to find which are allowed
        urls = urls.filter(url => url.includes('clubID=' + clubID)
            && (url.includes('season=' + season) /* || url.includes('season=' + 2017) */)
            && url.includes('course=' + course)
            && url.includes('gender=' + gender)
            && url.includes('agegroup=' + agegroup)
        );

        // * Will fetch all files then return at once preserving order with Promise.all() 
        let jsonFiles = Promise.all(urls.map(url =>
            // * Need Heroku for 'ORS header “Access-Control-Allow-Origin” missing'
            fetch('https://cors-anywhere.herokuapp.com/' + url, {
                method: "GET"
            })
                .then(response => {
                    if (!response.ok) {
                        console.log('Error: Could not display file ' + response.url)
                    }
                    return response.arrayBuffer();
                })
                .then(buffer => {
                    // * Converts The Array Buffer into a Workbook then saves the file
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
                })
                .catch((error) => {
                    console.log(error);
                    throw new Error("Unable to fetch file");
                })

        ))
            .then((allData) => {
                if (allData.length === 0) {
                    console.log('Error: No Swimmer Data was returned');
                } else if (allData.length === 1) {
                    // * Need to standardize data structure, ([Workbook (Year / Agegroup)] -> [Sheets (aka Event)] -> [Swimmers in event])
                    allData = [allData];
                }
                this.setState({ swimmerData: allData, ddl_event: event, swimEvent: 'all' });
            })

        // * Need to check and see if form attributes changed or just event (if event reparse data otherwise reload)
    }

    render() {
        return (
            <div>
                <div>
                    <h1 className='formTitle'>Club Analytics</h1>
                </div>

                <Form className='rankingsForm' onSubmit={this.handleSubmit} >
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
                <PeakMonth swimmerData={this.state.swimmerData} event={this.state.ddl_event} swimEvent={this.state.swimEvent} />

                <Analytics swimmerData={this.state.swimmerData} swimEvent={this.state.swimEvent} />

                <div id="footer">
                    <p>All Data on this site has been provided by Christian Kaufmann, the owner of <a href="https://www.swimrankings.net" target="_blank" rel="noopener noreferrer"> swimrankings.net </a> </p>
                </div>
            </div>
        )
    }
}
export default Clubs;