import React from 'react';
import Dashboard from './components/dashboard/dashboard'
//import Datasets from "./components/datasets/datasets";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import chartData from './components/swimmerData/2007-2008/Short_Course/2020-01-31/Female_0_Events/Female_0_50_Back.json'

function App() {
  // Will need to switch event name to be found as a variable that is equal to chart data
  var eventName = './components/swimmerData/2007-2008/Short_Course/2020-01-31/Female_0_Events/Female_0_50_Back.json'
  eventName = eventName.split('/')[7].split('.')[0].split('_');
  if (eventName[1] === '0') eventName[1] = 'Under 10';
  eventName = eventName.join(' ');
  console.log(chartData)

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