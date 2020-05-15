import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Dashboard from './components/dashboard/dashboard';

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
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
              <Link to='/swimmers'> <Nav.Link href='/swimmers'>Swimmers</Nav.Link> </Link>
              <Link to='/clubs'> <Nav.Link href='/clubs'>Clubs</Nav.Link> </Link>
              <Link to='/about'> <Nav.Link href='/about'>About</Nav.Link> </Link>
              <Link to='/contact'> <Nav.Link>Contact</Nav.Link> </Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/swimmers'>
            <Dashboard></Dashboard>
          </Route>
          <Route path='/clubs'>

          </Route>
          <Route path='/about'>

          </Route>
          <Route path='/contact'>

          </Route>
          <Route path='/'>
            <Dashboard></Dashboard>
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