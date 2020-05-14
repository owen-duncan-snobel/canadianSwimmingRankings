import React from 'react';
import Dashboard from './components/dashboard/dashboard';
import Teams from './components/teams/teams';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';

function App() {
  return (
    <div>
      <Col className="d-xs-none">
        <Dashboard></Dashboard>
        <Teams></Teams>
        { /*  <a href="./src/components/swimmerData.zip" download>Click to download</a> */}
      </Col>
    </div>
  );
}
export default App;