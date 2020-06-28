import React from 'react';
import { Component } from 'react';
import { Pie } from 'react-chartjs-2';
import * as SwimFormulas from '../../../constants/graphFunctions/graphFunctions';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class FastestMeets extends Component {

    render() {
        let allData = this.props.swimmerData;
        let meetData = [];
        let data;
        let options;
        let meets;
        let meetName;
        let meetNumber;
        let colorArray;

        if (allData === null) {
            return (
                <div> </div>
            )
        } else {
            try {
                allData.forEach(swimmer => {
                    meetData.push(swimmer);
                })

                meets = meetData.map(meet => meet.__EMPTY_12);
                // * Converts the Meet Data Map into useable 'key' and 'value' arrays for graphing
                meets = Array.from(SwimFormulas.mostOccurences(meets)).sort((a, b) => b[1] - a[1]);
                meetName = meets.map(name => name[0]);
                meetNumber = meets.map(number => number[1]);

                // * Creates The Colors for the PieChart depending on how many distinct meets there are
                colorArray = SwimFormulas.colorArray(meets.length);

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
            } catch {
                console.log('Error: Unable to convert data for fastest meets')
            }
        }
        return (
            <div>
                <Container>
                    <Row>
                        <Col lg={12} md={5} xs={12}>
                            <h4 className='formTitle'>Fastest Meets</h4> Based On Meet Where Best Times Were Swam.
                < div >
                                <Pie data={data} options={options} height={200} />
                            </div >
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default FastestMeets;