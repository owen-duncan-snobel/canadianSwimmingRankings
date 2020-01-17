import React from 'react';
import ScatterGraph from './components/graph/scatterGraph';
import Datasets from './components/datasets/datasets';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <div className="App">Yes</div>
      <ScatterGraph></ScatterGraph>
      <Datasets></Datasets>

    </div>
  );
}

export default App;