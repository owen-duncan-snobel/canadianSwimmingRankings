import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Contact extends Component {
    render() {
        return (
            <>
                <style type='text/css'>
                    {`
                    .divHeight {
                        height:700px;
                        color:rgba(0,0,0,.5);
                    }
                    a:link {
                        color: rgba(0,0,0,.5);
                    }
                `}
                </style>
                <div>
                    <Container fluid>
                        <Row className="text-center divHeight mt-5 pt-5" >
                            <Col>
                                <div class="">
                                    <h3 className="navbar-light">Owen Duncan-Snobel</h3>
                                    <h3> <a href="mailto:owenduncansnobel@gmail.com"> owenduncansnobel@gmail.com</a></h3>
                                    <h3> <a href="https://github.com/owen-duncan-snobel" target="_blank">github.com/owen-duncan-snobel</a></h3>
                                </div>
                            </Col>
                        </Row >
                    </Container>

                </div>
            </>)
    }
}
export default Contact;