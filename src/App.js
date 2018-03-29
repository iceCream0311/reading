import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import logo from './logo.svg';
import HomePage from './routes/homPage/homePage.js';
import  './styles/reset.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" component={HomePage} />
        </Router>
      </div>
    );
  }
}

export default App;
