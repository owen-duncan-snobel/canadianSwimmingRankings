import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

{/*
const divStyle = {
    textAlign: 'center',
    backgroundColor: 'lightblue',
};
*/ }

{/* NEED TO GO BACK AND MAKE AN ARRAY OF ALL FOLDERS AND PUSH THE FOLDERS INTO A ROW */ }
{/* ALSO NEED TO SEE HOW WHEN DATA IS UPDATED IT IS ADDED TO SITE IDEALLY DYNAMICALLY BOOTSTRAP CHECKS SERVER AND JUST UPDATE*/ }

function Dataset(count) {
    return (
        <Col xs={4}>
            {count}
        </Col>
    );
}

function Datasets() {
    const arr = [];
    for (var i = 0; i < 22; i++) {
        arr.push(Dataset(i));
    }
    return (
        <Container>
            <Row>
                {arr}
            </Row>
        </Container>

    );
}
export default Datasets;