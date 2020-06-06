import React, { Component } from 'react';
import './contact.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../images/favicon.ico';

class Contact extends Component {
    render() {
        return (

            <div>
                <Container fluid>
                    <Row className="text-center divHeight mt-5 pt-5" >
                        <Col>
                            <div class="">
                                <h3 className="navbar-light">Owen Duncan-Snobel</h3>
                                <h3> <a href="mailto:owenduncansnobel@gmail.com"> owenduncansnobel@gmail.com</a></h3>
                                <h3> <a href="https://github.com/owen-duncan-snobel" rel="noopener noreferrer" target="_blank">github.com/owen-duncan-snobel</a></h3>
                                <h3> <a href="https://github.com/owen-duncan-snobel/canadianSwimmingRankings" rel="noopener noreferrer" target="_blank">github.com/owen-duncan-snobel/canadianSwimmingRankings</a></h3>
                                <img src={logo} width="50" height="50" alt="Canadian Swimming Rankings Logo" />
                            </div>
                        </Col>
                    </Row >
                </Container>

            </div>
        )
    }
}
export default Contact;