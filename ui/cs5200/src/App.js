import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import login from './component/page/login/index';
import register from './component/page/register/index';
import school from './component/page/school-home/index';
import './App.css';
import { Layout, Menu } from 'antd';

class App extends Component {
  render() {
    return (
      <Layout>
        <Layout.Header>
          
        </Layout.Header>
        <Router>
          <div>
            <Route path="/" exact render={() => "Home"}/>
            <Route path="/school/" component={school}/>
            <Route path="/login/" component={login}/>
            <Route path="/register/" component={register}/>
          </div>
        </Router>
      </Layout>
      
    );
  }
}

export default App;
