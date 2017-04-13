import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route} from 'react-router-dom';

import './App.css';
import SelectVehicle from './modules/SelectVehicle';
import VehicleDashboard from './modules/VehicleDashboard';
import Header from './modules/Header';
import MaintenanceContainer from './modules/MaintenanceContainer';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/" component={SelectVehicle}/>
          <Route path="/vehicle/:make/:model/:year/:id" component={VehicleDashboard}/>
          <Route path="/vehicle/maintenance/:id" component = {MaintenanceContainer}/>
        </div>
      </Router>
    );
  }
}

export default App;
