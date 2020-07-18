import React, { Component } from 'react';
import '../analytics.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as SwimFormulas from '../../../constants/graphFunctions/graphFunctions';

/**
 * Returns a Component with the average,mode,median,standard deviation listed based on data based to it.
 * @component
 * @example
 * const allData = [
 * [
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "*********",
    "__EMPTY_4": 37370,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "23.54",
    "__EMPTY_8": 23.54,
    "FINA 2019": 637,
    "__EMPTY_9": 1,
    "__EMPTY_10": 43813,
    "__EMPTY_11": "Toronto",
    "__EMPTY_12": "Ontario Junior International",
    "__EMPTY_13": "Oakville Aquatic Club"
  },
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "*********",
    "__EMPTY_4": 37277,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "24.31",
    "__EMPTY_8": 24.31,
    "FINA 2019": 578,
    "__EMPTY_9": 2,
    "__EMPTY_10": 43792,
    "__EMPTY_11": "London",
    "__EMPTY_12": "LAC - Nothers Fall Invitational",
    "__EMPTY_13": "Oakville Aquatic Club"
  }
],[
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "*********",
    "__EMPTY_4": 37370,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "23.54",
    "__EMPTY_8": 23.54,
    "FINA 2019": 637,
    "__EMPTY_9": 1,
    "__EMPTY_10": 43813,
    "__EMPTY_11": "Toronto",
    "__EMPTY_12": "Ontario Junior International",
    "__EMPTY_13": "Oakville Aquatic Club"
  },
  {
    "Oakville Aquatic Club, Season 2020, Open": "SCM",
    "__EMPTY": "M",
    "__EMPTY_1": 50,
    "__EMPTY_2": "Fr",
    "__EMPTY_3": "*********",
    "__EMPTY_4": 37277,
    "__EMPTY_5": "CAN",
    "__EMPTY_6": "OAK",
    "__EMPTY_7": "24.31",
    "__EMPTY_8": 24.31,
    "FINA 2019": 578,
    "__EMPTY_9": 2,
    "__EMPTY_10": 43792,
    "__EMPTY_11": "London",
    "__EMPTY_12": "LAC - Nothers Fall Invitational",
    "__EMPTY_13": "Oakville Aquatic Club"
  }
]
]
 * const event = '50m Free';
 * return (
 *  <TimeAnalytics swimmerData={allData} swimEvent={event} />
 * )
 * 
 */

class TimeAnalytics extends Component {
    // * Props can be deconstructed from meetData: {meetData (Meet Names), meetNumber (Array of number of occ. of each meet)}
    render() {
        let allData = this.props.swimmerData;
        let meetData = [];
        let average;
        let median;
        let mode;
        let times;
        let standardDeviation;
        let mostCommonTimeRange;

        // * If no data has been passed down from the form or invalid display empty form
        if (allData === null) {
            return (
                <div> </div>
            )
        } else {
            try {
                allData.forEach(event => {
                    event.forEach(swimmer => {
                        meetData.push(swimmer);
                    })
                })

                function commonTimeRange(meetData, mode) {
                    try {
                        return meetData.length === 0 ? '' : new Date(mode.mostCommonNumber * 1000).toISOString().substr(14, 8) + '-' + new Date((mode.mostCommonNumber + 1) * 1000).toISOString().substr(14, 8)
                    } catch (e) {
                        console.log(e);
                        return (<div></div>)
                    }
                }

                // * Converts The Time & Meet Data To an Array that can be easily used
                times = meetData.map(time => time.__EMPTY_8);
                // * Variables for the respective 'average' , 'median' and 'mode' from the data
                average = SwimFormulas.averageTime(times);
                median = SwimFormulas.medianTime(times);
                mode = SwimFormulas.modeTime(times);
                standardDeviation = SwimFormulas.standardDeviation(times);
                mostCommonTimeRange = commonTimeRange(meetData, mode);

            } catch (e) {
                console.log(e)
            }
            return (
                <div>
                    {/* Time Analytics */}
                    <Container>
                        <Row>
                            <Col lg={12} md={5} xs={12}>
                                {/* Hides The Average,Median,Mode if all events are selected. Aka data length is larger then 50 */}

                                <div>
                                    <h4 className='formTitle'>Swimming Analytics</h4>

                                    <p name='averageTime'> <b>Average Time </b> <br></br>
                                        {average}
                                    </p>

                                    <p name='medianTime'><b>Median Time</b> <br></br>
                                        {median}
                                    </p>

                                    <p name='modeTime'> <b>Most Common Time Range </b> <br></br>
                                        {mostCommonTimeRange} <br></br>
                                        <b className='modeCount'>  With {mode.maxCount} Swimmers  </b>
                                    </p>
                                    <p name='standardDeviation'> <b>Standard Deviation</b> <br></br>
                                        {standardDeviation}
                                    </p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div >
            )
        }
    }
}
export default TimeAnalytics;