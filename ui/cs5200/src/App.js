import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import login from './component/page/login/index';
import register from './component/page/register/index';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact render={() => <Redirect to="/login/"/>}/>
          <Route path="/login/" component={login}/>
          <Route path="/register/" component={register}/>
        </div>
      </Router>
    );
  }
}

export default App;
