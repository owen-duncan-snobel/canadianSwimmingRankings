import React from 'react'
import Form from 'react-bootstrap/Form'
import { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Dashboard from '../dashboard/dashboard'
import * as firebase from "firebase/app";
import "firebase/storage";


// * General Firebase config, does not matter if the api key is leaked(needed to fetch files), as long as it is not the ADMIN SDK FOR FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyBuZ2fXe-NLt8N7e8Dq3HVMGOvvAjWSj6w",
    authDomain: "canadian-swimming-ranks.firebaseapp.com",
    databaseURL: "https://canadian-swimming-ranks.firebaseio.com",
    projectId: "canadian-swimming-ranks",
    storageBucket: "canadian-swimming-ranks.appspot.com",
    messagingSenderId: "772356223119",
    appId: "1:772356223119:web:40ef7c35bc78f6f3b340fa",
    measurementId: "G-8LF3N3CFPZ"
};
const app = firebase.initializeApp(firebaseConfig);

class SwimForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ddl_season: '2019-2020',
            ddl_course: 'Short_Course',
            swimmerData: null,
            eventName: '',
            dataArray: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // * Handles the state selection for when you select a new dropdown from the Form 
    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    // * Handles the logic for when you click submit on the form 
    handleSubmit(event) {
        // * Prevent page from rerouting (need to see if we want it to use a different url for page handling)
        event.preventDefault();

        // * Formed data is used for getting the contents of the submitted form 
        const formdata = new FormData(event.target);
        let season = formdata.get('ddl_season');
        let course = formdata.get('ddl_course').split(' ').join('_');
        let gender = formdata.get('ddl_gender');
        let age = formdata.get('ddl_age');
        let race = formdata.get('ddl_event').split(' ').join('_');
        let file = course + '/' + season + '_' + gender + '_' + age + '_' + race + '.json';


        // * API CALL WILL BE DONE HERE THEN SETS THE DATA (MAY CHANGE IN THE FUTURE)
        app.storage().ref(file).getDownloadURL().then(
            (url) => {
                fetch(url, {
                    method: "GET",
                })
                    .then(response => {
                        return response.json()
                    })
                    .then(dataset => {
                        const standardize_times = (time) => {
                            // * Ensures that all time strings given are in an appropriate ISO String format
                            if (time.length === 5) time = '00:' + time;
                            if (time.length === 7) time = '0' + time;
                            let milli = ((parseInt(time.split(':')[0] * 60000)) + (parseInt(time.split(':')[1].split('.')[0] * 1000)) + (parseInt(time.split('.')[1]) * 10));
                            return milli;
                        }
                        // * FILTER BY CLUB MEMEBERS
                        let club = dataset.data.filter(x => x.CLUB === 'OAK')
                        // * Work with JSON data here
                        let time = dataset.data.map(x => standardize_times(x.TIME));
                        let athletes = dataset.data.map(x => x.ATHLETES.split(',').reverse().join(' '));
                        let rank = dataset.data.map(x => x.RANK).reverse();
                        time = time.reverse();
                        this.setState({ swimmerData: { time, athletes, rank }, dataArray: dataset })
                    })
                // * CATCH NEEDED FOR RETURNING AN EMPTY OBJECT (aka. FILE DOESN'T exist or failed fetches to firebase)
            }).catch(err => (err))

        // * Set the event name to be passed down as a label for the graph
        this.setState({ eventName: season + ' ' + gender + ' ' + age + ' |' + race.split('_').join(' ') })
    }

    render() {
        let chart;
        // * Don't display chart if no data has been provided yet
        if (this.state.swimmerData == null) {
            //  chart = <Dashboard swimmerData={this.state.swimmerData} eventName={this.state.eventName} event />;
        } else {
            chart = <Dashboard swimmerData={this.state.swimmerData} eventName={this.state.eventName} event />
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
               `}
                </style>
                <div>
                    <hr></hr>
                    <h1 className="formTitle">Swimming Canada Power Rankings</h1>
                </div>
                <Form className='rankingsForm' onSubmit={this.handleSubmit}>
                    <Form.Row>
                        {/**  Swimming Season */}
                        <Form.Group >
                            <Form.Control name="ddl_season" id="ddl_season" value={this.state.ddl_season} onChange={this.handleInputChange} className="dropdownBox custom-select" as="select">
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

                        {/**  Course */}
                        <Form.Group >
                            <Form.Control name="ddl_course" id="ddl_course" value={this.state.ddl_course} onChange={this.handleInputChange} className="dropdownBox custom-select" as="select">
                                <option disabled>Course</option>
                                <option value="Long_Course">Long Course</option>
                                <option value="Short_Course">Short Course</option>
                            </Form.Control>
                        </Form.Group>


                        {/**  Gender */}
                        <Form.Group >
                            <Form.Control name="ddl_gender" id="ddl_gender" className="dropdownBox custom-select" as="select">
                                <option disabled>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Control>
                        </Form.Group>

                        {/**  Age */}
                        <Form.Group >
                            <Form.Control name="ddl_age" id="ddl_age" className="dropdownBox custom-select" as="select">
                                <option disabled>Age</option>
                                <option value="0">Under 10</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                            </Form.Control>
                        </Form.Group>

                        {/**  Event */}
                        <Form.Group >
                            <Form.Control name="ddl_event" id="ddl_event" className="dropdownBox custom-select" as="select">
                                <option disabled>Event</option>
                                <option value="50 Free">50 Free</option>
                                <option value="100 Free">100 Free</option>
                                <option value="200 Free">200 Free</option>
                                <option value="400 Free">400 Free</option>
                                <option value="800 Free">800 Free</option>
                                <option value="1500 Free">1500 Free</option>
                                <option value="50 Back">50 Back</option>
                                <option value="100 Back">100 Back</option>
                                <option value="200 Back">200 Back</option>
                                <option value="50 Breast">50 Breast</option>
                                <option value="100 Breast">100 Breast</option>
                                <option value="200 Breast">200 Breast</option>
                                <option value="50 Fly">50 Fly</option>
                                <option value="100 Fly">100 Fly</option>
                                <option value="200 Fly">200 Fly</option>
                                <option value="100 I.Medley">100 I.Medley</option>
                                <option value="200 I.Medley">200 I.Medley</option>
                                <option value="400 I.Medley">400 I.Medley</option>
                                <option value="200 Free Relay">200 Free Relay</option>
                                <option value="400 Free Relay">400 Free Relay</option>
                                <option value="800 Free Relay">800 Free Relay</option>
                                <option value="200 Medley Relay">200 Medley Relay</option>
                                <option value="400 Medley Relay">400 Medley Relay</option>
                            </Form.Control>
                        </Form.Group>

                        <Button className="formButton" type="submit">
                            SHOW
                        </Button>
                    </Form.Row>
                </Form>
                {/* Dashboard with all the logic for the graph **/}
                {chart}
            </>)
    }
}
export default SwimForm;