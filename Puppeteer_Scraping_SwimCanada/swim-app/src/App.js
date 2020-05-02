import React from 'react';
import SwimForm from './components/dashboard/dashboard'
//import Datasets from "./components/datasets/datasets";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <div>
      <Col className="d-xs-none">
        <Dashboard></Dashboard>
        { /*  <a href="./src/components/swimmerData.zip" download>Click to download</a> */}
      </Col>
    </div>
  );
}
export default App;