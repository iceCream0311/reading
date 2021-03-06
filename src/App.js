import React, { Component } from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import HomePage from './routes/homPage/homePage.js';
import CategoryPage from './routes/categoryPage/categoryPage.js';
import Rank from './routes/rank/rank.js';
import Person from './routes/person/person.js';
import Search from './routes/search/search.js';
import Pay from './routes/pay/pay.js';
import History from './routes/history/history.js';
import Test from './routes/test/test.js';
import HongBao from './routes/hongbao/hongbao';
import Detail from './routes/detail/detail';
import DetailBook from './routes/detailBook/detailBook';
import DetailList from './routes/detailList/detailList';
import  './styles/reset.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
           <Route path="/" exact component={HomePage} />
           <Route path="/category" component={CategoryPage} />
           <Route path="/rank" component={Rank} />
           <Route path="/person" component={Person} />
           <Route path="/search" component={Search} />
           <Route path="/pay" component={Pay} />
           <Route path="/search" component={Search} />
           <Route path="/history" component={History} />
           <Route path="/test" component={Test} />
           <Route path="/hongBao" component={HongBao} />
           <Route path="/detail" component={Detail} />
           <Route path="/detail_list" component={DetailList} />
           <Route path="/detail_book" component={DetailBook} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
