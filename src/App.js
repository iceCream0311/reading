import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import logo from './logo.svg';
import HomePage from './routes/homPage/homePage.js';
import CategoryPage from './routes/categoryPage/categoryPage.js';
import Person from './routes/person/person.js';
import Search from './routes/search/search.js';
import Pay from './routes/pay/pay.js';
import History from './routes/history/history.js';
import  './styles/reset.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
           <Route path="/" exact component={HomePage} />
           <Route path="/category" component={CategoryPage} />
           <Route path="/person" component={Person} />
           <Route path="/search" component={Search} />
           <Route path="/pay" component={Pay} />
           <Route path="/search" component={Search} />
           <Route path="/history" component={History} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
