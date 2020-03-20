import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Dashboard from '../dashboard/dashboard'

const handleSubmit = event => {
    console.log(event.target)
}

class SwimForm extends Component {

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
                <Form className='form' onSubmit={handleSubmit}>
                    <Form.Row>
                        {/**  Swimming Season */}
                        <Form.Group controlId="formGridState">
                            <Form.Control id="ddl_season" className="dropdownBox custom-select" as="select">
                                <option value="" disabled>Season</option>
                                <option>2007-2008</option>
                                <option>2008-2009</option>
                                <option>2009-2010</option>
                                <option>2010-2011</option>
                                <option>2011-2012</option>
                                <option>2012-2013</option>
                                <option>2013-2014</option>
                                <option>2014-2015</option>
                                <option>2015-2016</option>
                                <option>2016-2017</option>
                                <option>2017-2018</option>
                                <option>2018-2019</option>
                                <option selected>2019-2020</option>
                                <option>2020-2021</option>
                                <option>2021-2022</option>
                            </Form.Control>
                        </Form.Group>

                        {/**  Course */}
                        <Form.Group controlId="formGridState">
                            <Form.Control id="ddl_course" className="dropdownBox custom-select" as="select">
                                <option disabled>Course</option>
                                <option selected>Long Course</option>
                                <option>Short Course</option>
                            </Form.Control>
                        </Form.Group>


                        {/**  Gender */}
                        <Form.Group controlId="formGridState">
                            <Form.Control id="ddl_gender" className="dropdownBox custom-select" as="select">
                                <option disabled>Gender</option>
                                <option>Male</option>
                                <option selected>Female</option>
                            </Form.Control>
                        </Form.Group>


                        {/**  Age */}
                        <Form.Group controlId="formGridState">
                            <Form.Control id="ddl_age" className="dropdownBox custom-select" as="select">
                                <option disabled>Age</option>
                                <option>Under 10</option>
                                <option selected>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                                <option>16</option>
                                <option>17</option>
                                <option>18</option>
                            </Form.Control>
                        </Form.Group>

                        <Button className="formButton" type="submit">
                            SHOW
                        </Button>
                    </Form.Row>
                </Form>


                <Dashboard
                    // ! LOGIC TO PASS THE FORMATTED DATA DOWN TO THE DASHBOARD THEN FROM THE DASH BOARD TO THE CHART
                    event={"TEMP HOLDER"}
                />
            </>)
    }
}
export default SwimForm;