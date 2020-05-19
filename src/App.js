import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SwimmerRankings from './components/swimmerRankings/swimmerRankings';
import Clubs from './components/clubs/clubs';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';


function App() {
  return (
    <div className='ml-2 overflow-hidden'>
      <Router>
        <Navbar expand='lg'>
          <Link to='/'>  <Navbar.Brand>Canadian Swimming Rankings</Navbar.Brand> </Link>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mr-auto'>
              <Link to='/swimmers' className='nav-link'>Swimmers </Link>
              <Link to='/clubs' className='nav-link'> Clubs </Link>
              <Link to='/about' className='nav-link'>About </Link>
              <Link to='/contact' className='nav-link'>Contact </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <hr></hr>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/swimmers'>
            <SwimmerRankings />
          </Route>
          <Route path='/clubs'>
            <Clubs />
          </Route>
          <Route path='/about'>

          </Route>
          <Route path='/contact'>

          </Route>
          <Route path='/'>
            <SwimmerRankings />
          </Route>
        </Switch>
      </Router>

      <Col className='d-xs-none'>

        { /*  <a href='./src/components/swimmerData.zip' download>Click to download</a> */}
      </Col>
    </div >
  );
}
export default App;