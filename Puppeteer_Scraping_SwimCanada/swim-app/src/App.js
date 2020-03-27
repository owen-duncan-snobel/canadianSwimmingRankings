import React from 'react';
import SwimForm from './components/swimForm/swimForm'
//import Datasets from "./components/datasets/datasets";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div>
      <Col className="d-xs-none">
        <SwimForm></SwimForm>
        { /*  <a href="./src/components/swimmerData.zip" download>Click to download</a> */}
      </Col>
    </div>
  );
}
export default App;