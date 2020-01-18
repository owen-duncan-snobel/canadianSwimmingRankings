import React from 'react';
import ScatterGraph from './components/graph/scatterGraph';
import Datasets from './components/datasets/datasets';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div>
      <div className="App">Canadian Swimmings Power Rankings</div>
      <Col className="d-xs-none">
        <ScatterGraph></ScatterGraph>
      </Col>
      <Datasets></Datasets>
    </div>
  );
}

export default App;