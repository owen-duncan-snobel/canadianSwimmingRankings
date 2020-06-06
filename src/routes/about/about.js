import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class About extends Component {
    render() {
        return (
            <>
                <style type='text/css'>
                    {`
                .divHeight {
                    color:rgba(0,0,0,.5);
                }
                a:link {
                    color: rgba(0,0,0,.5);
                }
            `}
                </style>
                <Container>
                    <Row className="divHeight mt-5 pt-5">
                        <Col md={2}>
                        </Col>
                        <Col md={8}>
                            <p>Canadian Swimming Rankings is a graphing website that allows Swimmers and Coaches to take a closer look at the trends and insights from the results across all age groups, events and genders from Current & Previous Years.</p>
                            <p> <b>  All Data on this site has been provided by Christian Kaufmann, the owner of  <a href="https://www.swimrankings.net" target="_blank" rel="noopener noreferrer"> swimrankings.net </a></b> If you or your club are looking for Team Management software or Meet Management software, refer to <a href="https://www.swimrankings.net" target="_blank" rel="noopener noreferrer"> Splash Software</a>.</p>
                            <br></br>
                            <h2 className="text-center">Request Club / Missing Club</h2>
                            <p>If you do not see your <b>club</b> listed in the dropdown or your club is not within Canada. Email me and I can add your club and country to the list. </p>
                            <h3 className="text-center"> <a href="mailto:owenduncansnobel@gmail.com?subject=Canadian Swim Rankings: Request Club"> owenduncansnobel@gmail.com</a></h3>
                        </Col>
                        <Col md={2}>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
export default About;