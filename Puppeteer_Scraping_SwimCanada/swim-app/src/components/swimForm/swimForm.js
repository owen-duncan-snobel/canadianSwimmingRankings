import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Dashboard from '../dashboard/dashboard'


class SwimForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ddl_season: '2019-2020',
            ddl_course: 'Short_Course',
            swimEvent: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({ swimEvent: 'Short_Course/2019-2020_Male_11_100_Back.json' }, () => {
        })
    }
    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit(event) {
        //  event.preventDefault();
        console.log(this.state)
        // console.log(this.state);
        // console.log('SUBMITTING');
    }

    /**
     * TODO |CONSIDER COMPLETELY REMOVING THE REACT-BOOTSTRAP FORM (Potentially all of react-bootstrap), MIGHT JUST STEAL 
     * TODO | THE STYLE AND REMOVE IT FORM ISN'T EASY TO FOLLOW FROM THE DOCUMENTATION
    */
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
                                <option value="Under_10">Under 10</option>
                                <option value="10" selected>10</option>
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

                        <Button className="formButton" type="submit">
                            SHOW
                        </Button>
                    </Form.Row>
                </Form>

                <Dashboard
                    // ! LOGIC TO PASS THE FORMATTED DATA DOWN TO THE DASHBOARD THEN FROM THE DASH BOARD TO THE CHART
                    swimEvent={this.state.swimEvent}
                />
            </>)
    }
}
export default SwimForm;