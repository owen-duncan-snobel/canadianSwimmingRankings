import React from 'react';
import Dashboard from './components/dashboard/dashboard'
//import Datasets from "./components/datasets/datasets";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import chartData from './swimmerData/2019-2020/Short_Course/2020-01-27/Male_0_Events/Male_50_Free_0.json'

function App() {
  var eventName = './swimmerData/2019-2020/Short_Course/2020-01-27/Male_0_Events/Male_50_Free_0.json'
  eventName = eventName.split('/')[6].split('.')[0].split('_').join(' ');
  return (
    <div>
      <div className="App">Canadian Swimmings Power Rankings</div>
      <Col className="d-xs-none">
        <Dashboard
          // ! LOGIC TO PASS THE FORMATTED DATA DOWN TO THE DASHBOARD THEN FROM THE DASH BOARD TO THE CHART
          data={chartData} event={eventName}
        />
        {/*  <Datasets></Datasets> */}

        {/*  TODO: Most likely will replace with an env variable will need to come back and look  */}
        <a href="./src/components/swimmerData.zip" download>Click to download</a>
      </Col>

    </div>
  );
}

export default App;