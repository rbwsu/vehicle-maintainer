import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route} from 'react-router-dom';

import './App.css';
import SelectVehicle from './modules/SelectVehicle';
import VehicleDashboard from './modules/VehicleDashboard';
import Header from './modules/Header';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={SelectVehicle}/>
          <Route path="/vehicle/:make/:model/:year/:id" component={VehicleDashboard}/>
        </div>
      </Router>
    );
  }
}

export default App;
