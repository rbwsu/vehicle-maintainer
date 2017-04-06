import React, { Component } from 'react';
import './App.css';
import SelectVehicle from './modules/SelectVehicle';
import Header from './modules/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <SelectVehicle />
      </div>
    );
  }
}

export default App;
