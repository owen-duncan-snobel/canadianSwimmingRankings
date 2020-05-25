import React, { Component } from 'react';
import './analytics.css';
import { Pie } from 'react-chartjs-2';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as SwimFormulas from '../../constants/graphFunctions/graphFunctions';

class Analytics extends Component {
    // * Props can be deconstructed from meetData: {meetData (Meet Names), meetNumber (Array of number of occ. of each meet)}
    render() {
        let data;
        let options;
        let average;
        let median;
        let mode;
        let times;
        let meets;
        let meetData;
        let meetName;
        let meetNumber;
        let meetMonth;
        let colorArray;
        let standardDeviaton;

        // * If no data has been passed down from the form or invalid display empty form
        if (this.props.meetData === null) {
            return (
                <div> </div>
            )
        } else {

            // * Ensures that all time strings given are in an appropriate ISO String format
            const standardize_times = (time) => {

                if (time.length === 5) time = '00:' + time;
                if (time.length === 7) time = '0' + time;
                let milli = ((parseInt(time.split(':')[0] * 60000)) + (parseInt(time.split(':')[1].split('.')[0] * 1000)) + (parseInt(time.split('.')[1]) * 10));
                return milli;
            }

            // * Converts The Time & Meet Data To an Array that can be easily used
            times = this.props.meetData.map(time => standardize_times(time.__EMPTY_7));
            meets = this.props.meetData.map(meet => meet.__EMPTY_12);

            // * Converts the Meet Data Map into useable 'key' and 'value' arrays for graphing
            meetData = Array.from(SwimFormulas.mostOccurences(meets)).sort((a, b) => a[1] - b[1]);
            meetName = meetData.map(name => name[0]);
            meetNumber = meetData.map(number => number[1]);

            // * Variables for the respective 'average' , 'median' and 'mode' from the data
            average = SwimFormulas.averageTime(times);
            median = SwimFormulas.medianTime(times);
            mode = SwimFormulas.modeTime(times);

            /*      
                  * Need to only standardize the times once the sd has been calculated
             standardDeviaton = this.props.meetDat.map(time => Math.sqrt((time.__EMPTY_7 - ); */
            //     standardDeviaton = Math.sqrt(SwimFormulas.averageTime(standardDeviaton));
            // * Converts Excel Date Value into a JS date inorder to be graphed
            meetMonth = SwimFormulas.meetMonth(this.props.meetData);

            // * Creates The Colors for the PieChart depending on how many distinct meets there are
            colorArray = SwimFormulas.colorArray(meetData.length);

            data = {
                labels: meetName,
                datasets: [{
                    data: meetNumber,
                    backgroundColor: colorArray
                }]
            }
            options = {
                legend: {
                    display: false
                }
            }
        }

        return (
            <div>
                {/* Time Analytics */}
                <Container>
                    <Row className='pt-0 analytics justify-content-md-center'>
                        <Col className='colBorder m-1' lg={12} md={5} xs={12}>

                            <h4 className='formTitle'>Swimming Analytics</h4>
                            {/* Average, Median Times, Mode Times */}
                            <p name='averageTime'> <b>Average Time </b> <br></br>
                                {average}
                            </p>

                            <p name='medianTime'><b>Median Time</b> <br></br>
                                {median}
                            </p>

                            <p name='modeTime'> <b>Most Common Time Range </b> <br></br>
                                {this.props.meetData.length === 0 ? '' : new Date(mode.mostCommonNumber * 1000).toISOString().substr(14, 8) + '-' + new Date((mode.mostCommonNumber + 1) * 1000).toISOString().substr(14, 8)} <br></br>
                                <b className='modeCount'>  With {mode.maxCount} Swimmers  </b>
                            </p>

                            <p name='standardDeviation'> <b> Standard Deviation of Times </b>
                                <br></br>
                                {standardDeviaton}
                            </p>

                        </Col>

                        {/* * Fastest Meets */}
                        <Col className='colBorder m-1' lg={12} md={5} xs={12}>
                            <h4 className=' formTitle'>Fastest Meets</h4> Based on location of best time.
                            <Pie data={data} options={options} />
                        </Col>
                    </Row>
                </Container>
            </div >
        )
    }
}
export default Analytics;