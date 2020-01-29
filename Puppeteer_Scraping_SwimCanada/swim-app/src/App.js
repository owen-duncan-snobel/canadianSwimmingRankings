import React from 'react';
import ScatterGraph from './components/graph/scatterGraph';
//import Datasets from "./components/datasets/datasets";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';

function App() {

  return (
    <div>
      <div className="App">Canadian Swimmings Power Rankings</div>
      <Col className="d-xs-none">
        <ScatterGraph></ScatterGraph>
        {/*   <Datasets></Datasets> */}

        {/* Most likely will replace with an env variable will need to come back and look */}
        <a href="./src/components/swimmerData.zip" download>Click to download</a>
      </Col>

    </div>
  );
}

export default App;