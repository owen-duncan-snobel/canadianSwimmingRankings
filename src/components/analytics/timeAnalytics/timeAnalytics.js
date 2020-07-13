import React, { Component } from 'react';
import '../analytics.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as SwimFormulas from '../../../constants/graphFunctions/graphFunctions';

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

                // * Ensures that all time strings given are in an appropriate ISO String format
                const standardize_times = (time) => {
                    if (time.length === 5) time = '00:' + time;
                    if (time.length === 7) time = '0' + time;
                    let milli = ((parseInt(time.split(':')[0] * 60000)) + (parseInt(time.split(':')[1].split('.')[0] * 1000)) + (parseInt(time.split('.')[1]) * 10));
                    return milli;
                }

                function commonTimeRange(meetData, mode) {
                    return meetData.length === 0 ? '' : new Date(mode.mostCommonNumber * 1000).toISOString().substr(14, 8) + '-' + new Date((mode.mostCommonNumber + 1) * 1000).toISOString().substr(14, 8)
                }

                // * Converts The Time & Meet Data To an Array that can be easily used
                times = meetData.map(time => standardize_times(time.__EMPTY_7));
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