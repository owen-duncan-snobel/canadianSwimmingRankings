import React from 'react';
import SwimForm from './components/swimForm/swimForm'
//import Datasets from "./components/datasets/datasets";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';

//import chartData from './components/swimmerData/2007-2008/Short_Course/2020-01-31/Female_0_Events/Female_0_50_Back.json'

function App() {
  return (
    <div>
      <Col className="d-xs-none">

        <SwimForm></SwimForm>
        {/*  <Datasets></Datasets> */}

        {/*  TODO: Most likely will replace with an env variable will need to come back and look  */}
        <a href="./src/components/swimmerData.zip" download>Click to download</a>

      </Col>

    </div>
  );
}

export default App;