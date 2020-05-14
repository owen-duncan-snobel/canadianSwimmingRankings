import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Piechart extends Component {
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
        let timeNumber;
        let timeName;

        // * If no data has been passed down from the form or invalid display empty form
        if (this.props.meetData === null) {
            return (
                <div> </div>
            )
        } else {

            const standardize_times = (time) => {
                // * Ensures that all time strings given are in an appropriate ISO String format
                if (time.length === 5) time = '00:' + time;
                if (time.length === 7) time = '0' + time;
                let milli = ((parseInt(time.split(':')[0] * 60000)) + (parseInt(time.split(':')[1].split('.')[0] * 1000)) + (parseInt(time.split('.')[1]) * 10));
                return milli;
            }

            // * Finds the Swim Meet with the most occurences of best times from the top 50 Swimmers
            const mostOccurences = (list) => {
                let map = new Map();
                while (list.length !== 0) {
                    if (!map.has(list[0])) {
                        map.set(list[0], 1);
                    } else {
                        map.set(list[0], map.get(list[0]) + 1);
                    }
                    list.shift();
                }
                return map;
            }



            // * Average and Median Times
            const averageTime = (time) => {
                try {
                    let average = time.reduce((a, b) => a + b);
                    return new Date(average / time.length).toISOString().substr(14, 8);
                }
                catch {
                    console.log('Error: Empty Data Array')
                }
            }

            const medianTime = (time) => {
                try {
                    let index = Math.floor(time.length / 2);
                    let median;
                    // * If the length % 2 === 0 (aka even number)
                    if (time.length % 2 === 0 && time.length !== 0) {
                        // * Minus one is needed for correct array index of even number centre points
                        median = (time[index - 1] + time[index]) / 2;
                    } else if (time.length % 2 === 1) {
                        median = time[index];
                    }
                    return new Date(median).toISOString().substr(14, 8)
                } catch {
                    console.log('Error: Empty Data Array')
                }
            }


            const modeTime = (time) => {
                try {
                    // * Times is given in Milliseconds, and from lowest to highest. We will convert to seconds and round down to standardize mode to seconds
                    let toModeSeconds = time.map(el => Math.floor(el / 1000));
                    let modeOccurence = mostOccurences(toModeSeconds);

                    // * Iterates through the map and finds the most occuring time
                    let mostCommonNumber = NaN
                    let maxCount = -1
                    for (let [num, count] of modeOccurence.entries()) {
                        if (count > maxCount) {
                            maxCount = count
                            mostCommonNumber = num
                        }
                    }
                    return { mostCommonNumber, maxCount };
                } catch {
                    console.log('Error: Empty Data Array')
                }
            }

            times = this.props.meetData.map(time => standardize_times(time.__EMPTY_7));
            meets = this.props.meetData.map(meet => meet.__EMPTY_12);

            meetData = mostOccurences(meets);
            meetName = Array.from(meetData.keys());
            meetNumber = Array.from(meetData.values());

            average = averageTime(times);
            median = medianTime(times);
            mode = modeTime(times);



            data = {
                labels: meetName,
                datasets: [{
                    data: meetNumber,
                    backgroundColor: ['red', 'yellow']
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
                <>
                    <style type='text/css'>
                        {`
                    .analytics{
                        height:auto;
                        border-radius: 20px;
                        padding-left: 1rem;
                    }    
                `}
                    </style>
                </>

                {/* Time Analytics */}
                <Container>
                    <Row className='pt-0 analytics justify-content-md-center'>
                        <Col className='colBorder m-1' lg={12} md={5} xs={12}>
                            <h2 className='formTitle'>Swimming Analytics</h2>
                            {/* Average, Median Times, Mode Times */}
                            <h6 name="averageTime"> Average Time</h6> <h2 className="mb-3">{average}</h2>
                            <h6 name="medianTime">Median Time</h6> <h2 className="mb-3">{median}</h2>
                            <h6 name="modeTime">Most Common Time Range</h6>
                            <h3>{this.props.meetData.length === 0 ? '' : new Date(mode.mostCommonNumber * 1000).toISOString().substr(14, 8) + '-' + new Date((mode.mostCommonNumber + 1) * 1000).toISOString().substr(14, 8)} </h3>
                            <h6>With {mode.maxCount} Swimmers</h6>

                        </Col>

                        {/* * Fastest Meets */}
                        <Col className='colBorder m-1' lg={12} md={5} xs={12}>
                            <h2 className=' formTitle'>Fastest Meets</h2>
                            <Pie data={data} options={options} />
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Piechart;